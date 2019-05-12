import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoadUser = '[Auth] Load User',


}

export class LoadUser implements Action {
  readonly type = AuthActionTypes.LoadUser;
}


export type AuthActions = LoadUser;
