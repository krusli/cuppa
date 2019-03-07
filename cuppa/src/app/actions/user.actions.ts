import { Action } from '@ngrx/store';
import { User } from '../models/User';

export const ADD_USER = '[USER] Sign In';
export const CLEAR_USER = '[USER] Sign Out';

export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public payload: User) {}
}

export class ClearUser implements Action {
    readonly type = CLEAR_USER;

    constructor() {}
}

export type UserActions = AddUser | ClearUser;