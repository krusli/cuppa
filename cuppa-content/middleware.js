const getGroup = require('../common/groups').getGroup;
const getGroupsMe = require('../common/groups').getGroupsMe;
const getMeetupsForGroup = require('../common/groups').getMeetupsForGroup;

const getActivityForGroup = require('../common/activity').getActivityForGroup;

const getUsers = require('../common/users').getUsers;

/**
 * Hydrates Group with user data (and other information (later)).
 * 
 * Assumes group is a valid Group object
 * @param {*} req 
 * @param {*} res 
 * @param {*} group 
 * @param {*} users 
 */
const hydrateGroup = async (req, res, group, users) => {
  console.log('hydrateGroup for group ' + group.name)
  // look for all User entities in the group
  const members = await getUsers(req, res, group.members);
  console.log('Got all members data ' + group.name);
  const ownerUsers = await getUsers(req, res, [group.owner]);
  console.log('Got owner data ' + group.name);
  const owner = ownerUsers ? ownerUsers[0] : null;

  /* get group activity */
  // for actions, no need to fetch users anymore
  // ASSUMPTION only users get to do actions inside the group.
  group.activity = await getActivityForGroup(req, res, group._id);

  // fill in the map of IDs -> Users
  members.map(x => users[x._id] = x);
  users[owner._id] = owner;

  // get all meetups for the group
  console.log('Getting meetups for group');
  group.meetups = await getMeetupsForGroup(req, res, group._id);

  return group;
};

module.exports = {
  getGroups: async (req, res, next) => {
    console.log('middleware.getGroups()')
    try {
      // const user = await getUserMe(req, res);
      const groups = await getGroupsMe(req, res);
      const users = {};
      const finalGroups = await Promise.all(
        groups.map(group => hydrateGroup(req, res, group, users))
      );

      console.log('Got final');
      
      req.data = {
        groups: finalGroups,
        users
      };
      next();
      // groups.members = 

    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  getGroup: async (req, res, next) => {
    try {
      const group = await getGroup(req, res, req.params.groupId);
      const users = {};

      if (!group) {
        res.status(404).send({
          error: 'not_found',
          message: `Group with ID ${req.params.groupId} not found.`
        });
      }
      const groupFinal = await hydrateGroup(req, res, group, users);

      req.data = groupFinal;
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
