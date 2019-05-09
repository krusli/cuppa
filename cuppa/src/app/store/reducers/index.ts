import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from './user.reducer';
import * as fromGroups from './groups.reducer';

export interface State {
  user: fromUser.State;
  groups: fromGroups.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  groups: fromGroups.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
