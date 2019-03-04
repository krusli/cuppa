const interservice = require('../common/interservice'); // inter-service comms
const getGroups = interservice.getGroups;
const getUsers = interservice.getUsers;
const getMeetupsForGroup = interservice.getMeetupsForGroup;

module.exports = {
  getGroups: async (req, res, next) => {
    try {
      // const user = await getUserMe(req, res);
      const groups = await getGroups(req, res);

      const users = {};
      
      // const users = getUsers(req, res, groups[0].members);
      const finalGroups = await Promise.all(groups.map(async group => {
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
      }));
      
      req.data = {
        groups: finalGroups,
        users
      };
      next();
      // groups.members = 

    } catch (err) {
      next(err);
    }
  }
}
