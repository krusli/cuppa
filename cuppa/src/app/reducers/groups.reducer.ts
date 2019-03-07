import { Group, GroupsAndUsers } from "../models/Group";
import { GroupsActions } from '../actions/groups.actions';
import { ADD_GROUPS } from '../actions/groups.actions';

const initialState: GroupsAndUsers = {
    groups: [],
    users: {}
};

export function groupsReducer(state: GroupsAndUsers = initialState, action: GroupsActions) {

    switch (action.type) {
        case ADD_GROUPS:
            return action.payload;  // overwrite all data
        default:
            return state;
    }

}