import { Action } from '@ngrx/store';
import { GroupsAndUsers, Group } from '../models/Group';

export const ADD_GROUPS = '[GROUP] Add Groups';

export class AddGroupsAndUsers implements Action {
    readonly type = ADD_GROUPS;

    constructor(public payload: Group[]) {}
}

export type GroupsActions = AddGroupsAndUsers;
