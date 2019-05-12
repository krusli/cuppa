import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GroupsService } from 'src/app/groups.service';
import { GroupsActionTypes, LoadGroupsSuccess, LoadGroupsFailure } from '../actions/groups.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Group, GroupsAndUsers } from 'src/app/models/Group';
import { of } from 'rxjs';
import { LoadUsers } from '../actions/users.actions';



@Injectable()
export class GroupsEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
    ofType(GroupsActionTypes.LoadGroups),
    switchMap(() => {
      return this.groupsService.getGroups()
    }),
    switchMap((res: GroupsAndUsers) => [
      new LoadGroupsSuccess(res.groups),
      new LoadUsers(res.users)
    ]),
    catchError(err =>
      // return a new Observable containing the Error Action
      of(new LoadGroupsFailure(err))
    )
  )


  constructor(private actions$: Actions, private groupsService: GroupsService) {}

}
