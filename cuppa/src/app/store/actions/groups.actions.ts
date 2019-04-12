import { Action } from '@ngrx/store';
import { GroupsAndUsers, Group } from 'src/app/models/Group';

export enum GroupsActionTypes {
  LoadGroups = '[Groups] Load Groups',


}

export class LoadGroups implements Action {
  readonly type = GroupsActionTypes.LoadGroups;

  constructor(public payload: Group[]) {}
}


export type GroupsActions = LoadGroups;
