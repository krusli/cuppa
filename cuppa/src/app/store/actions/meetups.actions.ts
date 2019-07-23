import { Action } from '@ngrx/store';
import { Meetup } from 'src/app/models/Group';

export enum MeetupsActionTypes {
  LoadMeetups = '[Meetups] Load Meetups',
  LoadMeetup = '[Meetups] Load Meetup'
}

export class LoadMeetups implements Action {
  readonly type = MeetupsActionTypes.LoadMeetups;

  constructor(public payload: Meetup[]) {}
}

export class LoadMeetup implements Action {
  readonly type = MeetupsActionTypes.LoadMeetup;

  constructor(public payload: { meetupId: string }) {}
}


export type MeetupsActions = LoadMeetups | LoadMeetup;
