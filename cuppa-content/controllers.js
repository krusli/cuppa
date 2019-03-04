const interservice = require('../common/interservice'); // inter-service comms
const getGroup = interservice.getGroup;
const getGroups = interservice.getGroups;
const getUser = interservice.getUser;
const getUsers = interservice.getUsers;
const getUserMe = interservice.getUserMe;
const getMeetupsForGroup = interservice.getMeetupsForGroup;

module.exports = {
  getHomepage: async (req, res, next) => {
    try {
      // const user = await getUserMe(req, res);
      const groups = await getGroups(req, res);

      
      // const users = getUsers(req, res, groups[0].members);
      const finalGroups = await Promise.all(groups.map(async group => {
        // look for all User entities in the group
        group.members = await getUsers(req, res, group.members);
        const ownerUsers = await getUsers(req, res, [group.owner]);
        group.owner = ownerUsers ? ownerUsers[0] : null;

        // get all meetups for the group
        group.meetups = await getMeetupsForGroup(req, res, group._id);

        return group;
      }));
      
      res.json(finalGroups);
      // groups.members = 

    } catch (err) {
      next(err);
    }
  }
}
