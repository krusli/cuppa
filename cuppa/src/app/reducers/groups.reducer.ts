import { GroupsAndUsers } from "../models/Group";
import { GroupsActions } from '../actions/groups.actions';
import { ADD_GROUPS } from '../actions/groups.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GroupsState } from '../state/groups.state';

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

export const getGroups = createFeatureSelector<GroupsAndUsers>('groups');

export const getGroupAndUsers = createSelector(
    getGroups,
    (state: GroupsAndUsers, props): GroupsAndUsers => {
        const group = state.groups.find(element => element._id === props.groupId);
        if (!group) {
            return {
                groups: [],
                users: state.users
            }
        }
        return {
            groups: [group],
            users: state.users
        }
    }
)

// NOTE assumes the group has already been 
export const getMeetups = createSelector(
    getGroupAndUsers,
    (state: GroupsAndUsers): any => {
        if (!state.groups.length) {
            return [];
        }
        return state.groups[0].meetups;
    }
)