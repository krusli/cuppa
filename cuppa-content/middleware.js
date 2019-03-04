const interservice = require('../common/interservice'); // inter-service comms
const getGroup = interservice.getGroup;
const getGroups = interservice.getGroups;
const getUsers = interservice.getUsers;
const getMeetupsForGroup = interservice.getMeetupsForGroup;

const hydrateGroup = async (req, res, group, users) => {
  // look for all User entities in the group
  const members = await getUsers(req, res, group.members);
  const ownerUsers = await getUsers(req, res, [group.owner]);
  const owner = ownerUsers ? ownerUsers[0] : null;


  // fill in the map of IDs -> Users
  members.map(x => users[x._id] = x);
  users[owner._id] = owner;

  // get all meetups for the group
  group.meetups = await getMeetupsForGroup(req, res, group._id);

  return group;
};

module.exports = {
  getGroups: async (req, res, next) => {
    try {
      // const user = await getUserMe(req, res);
      const groups = await getGroups(req, res);
      const users = {};
      const finalGroups = await Promise.all(groups.map(group => hydrateGroup(req, res, group, users)));
      
      req.data = {
        groups: finalGroups,
        users
      };
      next();
      // groups.members = 

    } catch (err) {
      next(err);
    }
  },

  getGroup: async (req, res, next) => {
    try {
      const hydrateGroupWithClosure = x => hydrateGroup(x); 

      const group = await getGroup(req, res, req.params.groupId);
      const users = {};
      const groupFinal = await hydrateGroup(req, res, group, users);

      req.data = groupFinal;
      next();
    } catch (err) {
      next(err);
    }
  }
}
