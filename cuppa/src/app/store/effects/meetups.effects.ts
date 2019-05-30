import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MeetupsActionTypes, MeetupsActions } from '../actions/meetups.actions';


@Injectable()
export class MeetupsEffects {


  @Effect()
  loadMeetups$ = this.actions$.pipe(
    ofType(MeetupsActionTypes.LoadMeetups),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<MeetupsActions>) {}

}
