import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Users',


}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;

  constructor(public payload: User[]) {}
}


export type UsersActions = LoadUsers;
