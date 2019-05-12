import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromGroups from './groups.reducer';
import * as fromUsers from './users.reducer';

export interface State {

  auth: fromAuth.State;
  groups: fromGroups.State;
  users: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {

  auth: fromAuth.reducer,
  groups: fromGroups.reducer,
  users: fromUsers.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
