import { Action } from '@ngrx/store';

export enum GroupsActionTypes {
  LoadGroupss = '[Groups] Load Groupss',
  
  
}

export class LoadGroupss implements Action {
  readonly type = GroupsActionTypes.LoadGroupss;
}


export type GroupsActions = LoadGroupss;
