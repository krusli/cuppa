import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/user.reducer';

export const selectUserFeature = createFeatureSelector('user');
export const selectUser = createSelector(selectUserFeature, (state: State) => state.user);
