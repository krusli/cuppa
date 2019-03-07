import { Action } from '@ngrx/store';
import { User } from '../models/User';

export const ADD_USER = '[USER] Sign In';
export const CLEAR_USER = '[USER] Sign Out';

export class SignIn implements Action {
    readonly type = ADD_USER;

    constructor(public payload: User) {}
}

export class SignOut implements Action {
    readonly type = CLEAR_USER;

    constructor() {}
}

export type UserActions = SignIn | SignOut;