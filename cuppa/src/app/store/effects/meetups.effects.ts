import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MeetupsActionTypes, MeetupsActions, LoadMeetups } from '../actions/meetups.actions';
import { EffectsRootModule } from '@ngrx/effects/src/effects_root_module';
import { MeetupsService } from 'src/app/meetups.service';


@Injectable()
export class MeetupsEffects {

  @Effect()
  loadMeetup$ = this.actions$.pipe(
    ofType(MeetupsActionTypes.LoadMeetup),
    switchMap(action => this.meetupsService.getMeetup(action.payload.meetupId)),
    map(result => new LoadMeetups([result]))
  );

  // TODO pipe change this to LoadMeetupSuccess + LoadMeetup
  @Effect()
  loadMeetups$ = this.actions$.pipe(
    ofType(MeetupsActionTypes.LoadMeetups),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<MeetupsActions>, private meetupsService: MeetupsService) {}

}
