import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
  ClearUser = '[User] Clear User'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;

  constructor(public payload: User) {}
}

export class ClearUser implements Action {
  readonly type = UserActionTypes.ClearUser;
}


export type UserActions = LoadUser | ClearUser;
