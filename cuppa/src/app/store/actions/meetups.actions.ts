import { Action } from '@ngrx/store';
import { Meetup } from 'src/app/models/Group';

export enum MeetupsActionTypes {
  LoadMeetups = '[Meetups] Load Meetups',
  LoadMeetup = '[Meetups] Load Meetup',
  NewMeetup = '[Meetups] New Meetup',
  NewMeetupSuccess = '[Meetups] New Meetup Success'
}

export class LoadMeetups implements Action {
  readonly type = MeetupsActionTypes.LoadMeetups;

  constructor(public payload: Meetup[]) {}
}

export class LoadMeetup implements Action {
  readonly type = MeetupsActionTypes.LoadMeetup;

  constructor(public payload: { meetupId: string }) {}
}

export class NewMeetup implements Action {
  readonly type = MeetupsActionTypes.NewMeetup;

  constructor(public payload: { meetup: Meetup }) {}
}

export class NewMeetupSuccess implements Action {
  readonly type = MeetupsActionTypes.NewMeetupSuccess;

  constructor(public payload: { meetup: Meetup }) {}
}


export type MeetupsActions = LoadMeetups | LoadMeetup | NewMeetup | NewMeetupSuccess;
