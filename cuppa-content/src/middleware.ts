import ActivityService from "../common/activity";
import GroupsService from "../common/groups";
import UsersService from "../common/users";

// TODO refactor
import { NextFunction, Request, Response } from "express";
import Group from "./models/Group";
import HydratedGroup from "./models/HydratedGroup";
import User from "./models/User";
import UsersMap from "./models/UsersMap";

const getGroup = GroupsService.getGroup;
const getGroupsMe = GroupsService.getGroupsMe;
const getMeetupsForGroup = GroupsService.getMeetupsForGroup;
const getActivityForGroup = ActivityService.getActivityForGroup;
const getUsers = UsersService.getUsers;

/**
 * Hydrates Group with user data (and other information (later)).
 *
 * Assumes group is a valid Group object
 * @param {*} req
 * @param {*} res
 * @param {*} group
 * @param {*} users
 */
const hydrateGroup = async (req: Request, res: Response, group: Group, users: UsersMap): Promise<HydratedGroup> => {
  // look for all User entities in the group
  const members = await getUsers(req, res, group.members);
  const ownerUsers = await getUsers(req, res, [group.owner]);
  const owner = ownerUsers ? ownerUsers[0] : null;

  /* get group activity */
  // for actions, no need to fetch users anymore
  // ASSUMPTION only users get to do actions inside the group.
  group.activity = await getActivityForGroup(req, res, group._id);

  // fill in the map of IDs -> Users
  members.map((x: User) => users[x._id] = x);
  users[owner._id] = owner;

  // get all meetups for the group
  group.meetups = await getMeetupsForGroup(req, res, group._id);

  return group;
};

export default {
  getGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const user = await getUserMe(req, res);
      const groups = await getGroupsMe(req, res);
      const users = {};

      const promises: Array<Promise<HydratedGroup>> = groups.map((group: Group) =>
          hydrateGroup(req, res, group, users));
      const finalGroups = await Promise.all(promises);

      req.data = {
        groups: finalGroups,
        users
      };
      next();
      // groups.members =

    } catch (err) {
      // console.error(err);
      next(err);
    }
  },

  getGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await getGroup(req, res, req.params.groupId);
      const users = {};

      if (!group) {
        res.status(404).send({
          error: "not_found",
          message: `Group with ID ${req.params.groupId} not found.`
        });
      }
      const groupFinal = await hydrateGroup(req, res, group, users);

      req.data = {
        group: groupFinal,
        users
      };
      next();
    } catch (err) {
      // console.error(err);
      next(err);
    }
  }
};
