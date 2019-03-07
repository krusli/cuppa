import { Action } from '@ngrx/store';
import { GroupsAndUsers } from '../models/Group';

export const ADD_GROUPS = '[GROUP] Add Groups';

export class AddGroupsAndUsers implements Action {
    readonly type = ADD_GROUPS;

    constructor(public payload: GroupsAndUsers) {}
}

export type GroupsActions = AddGroupsAndUsers;