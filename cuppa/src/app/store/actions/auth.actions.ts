import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User';

export enum AuthActionTypes {
  LoadUser = '[Auth] Load User',


}

export class LoadUser implements Action {
  readonly type = AuthActionTypes.LoadUser;

  constructor(public payload: User) {}
}


export type AuthActions = LoadUser;
