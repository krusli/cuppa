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

}


module.exports = GroupsService;
