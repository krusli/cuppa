import { Action } from '@ngrx/store';
import { Group } from 'src/app/models/Group';

export enum GroupsActionTypes {
  LoadGroups = '[Groups] Load Groups',
  LoadGroupsSuccess = '[Groups] Load Groups Success',
  LoadGroupsFailure = '[Groups] Load Groups Failure'
}

export class LoadGroups implements Action {
  readonly type = GroupsActionTypes.LoadGroups;
}

export class LoadGroupsSuccess implements Action {
  readonly type = GroupsActionTypes.LoadGroupsSuccess;

  constructor(public payload: Group[]) {}
}

export class LoadGroupsFailure implements Action {
  readonly type = GroupsActionTypes.LoadGroupsFailure;

  constructor(public payload: any) {}
}


export type GroupsActions = LoadGroups
                          | LoadGroupsSuccess | LoadGroupsFailure;
