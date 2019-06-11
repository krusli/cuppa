import { Action } from '@ngrx/store';
import { Meetup } from 'src/app/models/Group';

export enum MeetupsActionTypes {
  LoadMeetups = '[Meetups] Load Meetups',
}

export class LoadMeetups implements Action {
  readonly type = MeetupsActionTypes.LoadMeetups;

  constructor(public payload: Meetup[]){ }
}


export type MeetupsActions = LoadMeetups;
