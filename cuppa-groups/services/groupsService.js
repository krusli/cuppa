class GroupsService {
  
  constructor(usersServiceREST, model) {
    this.getUser = usersServiceREST.getUser;
    this.getUserMe = usersServiceREST.getUserMe;

    this.model = model;
  }

  async newGroup(name, description, req, res) { // TODO don't depend on req, res
    if (!name) {
      throw new Error('missing_param_name');
    }

    // get own profile
    // TODO this should just be done by the -content server
    // validate token, get the user corresp to the token
    const user = await this.getUserMe(req, res);

    // add the user as the owner of the group
    const owner = user._id;

    // create the group
    const group = await this.model.create({
      name,
      description,
      members: [owner],
      owner
    });

    return group;
  }

  async getGroups() {
    return await this.model.find();
  }

  async getGroupById(groupId) {
    return await this.model.findOne({ _id: groupId });
  }

  async getGroupsMe(req, res) {
    const user = await this.getUserMe(req, res);
    return await this.model.find({ members: user._id });    // group.member contains user._id
  }

  async getGroupByIdMe(groupId, req, res) {
    const user = await this.getUserMe(req, res);
    return await this.model.findOne({ members: user._id, _id: groupId });
  }

  /**
   * Adds a user to a group.
   * At this point in time, anyone can invite any valid user into a group)
   */
  async newMember(groupId, username, req, res) {
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      throw new Error('invalid_param_groupId');
    }

    // validate the other user
    const invitedUser = await this.getUser(req, res, username);
    if (!invitedUser) {
      res.status(400).send({
        error: 'bad_request',
        message: 'user to invite does not exist'
      });
    }

    // check if already a member, don't do anything if already a member
    if (!group.members.map(x => x.toString()).includes(invitedUser._id.toString())) {
      group.members.push(invitedUser._id);
    }

    // save the changes
    return await group.save();
  }

}


module.exports = GroupsService;
