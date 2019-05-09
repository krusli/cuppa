import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Group } from 'src/app/models/Group';
import { GroupsActionTypes, GroupsActions } from '../actions/groups.actions';
import { createFeatureSelector } from '@ngrx/store';

export const groupsAdapter = createEntityAdapter<Group>({
  // MongoDB uses ._id, not .id
  selectId: (x: any) => x._id
});

export interface State extends EntityState<Group> {}

export const initialState = groupsAdapter.getInitialState();

export function reducer(state = initialState, action: GroupsActions): State {
  switch (action.type) {

    case GroupsActionTypes.LoadGroups: {
      return groupsAdapter.addMany(action.payload, state);
    }

    default:
      return state;
  }
}

/* TODO move to Selectors */
export const selectGroupsFeature = createFeatureSelector<State>('groups');

export const {
  selectIds: selectGroupsIds,
  selectEntities: selectGroupsEntities,
  selectAll: selectGroupsAll,
  selectTotal: selectGroupsTotal,
} = groupsAdapter.getSelectors(selectGroupsFeature);
