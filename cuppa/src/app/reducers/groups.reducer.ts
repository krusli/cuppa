import { GroupsAndUsers } from "../models/Group";
import { GroupsActions } from '../actions/groups.actions';
import { ADD_GROUPS } from '../actions/groups.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GroupsState } from '../state/groups.state';
import { UserMap } from '../models/User';

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

// NOTE: is actually efficient thanks to automatic memoization from NgRx
export const getMeetups = createSelector(
    getGroupAndUsers,
    (state: GroupsAndUsers): any => {
        if (!state.groups.length) {
            return [];
        }
        return state.groups[0].meetups;
    }
)

export const getMembers = createSelector(
    getGroupAndUsers,
    (state: GroupsAndUsers): any => {
        if (!state.groups.length) {
            return [];
        }
        return state.groups[0].members;
    }
)

export const getUsers = createSelector(
    getGroups,
    (state: GroupsAndUsers): UserMap => state.users
);