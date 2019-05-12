import { Action } from '@ngrx/store';
import { Group } from 'src/app/models/Group';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { GroupsActions, GroupsActionTypes } from '../actions/groups.actions';

export interface State extends EntityState<Group> {}

export const groupsAdapter = createEntityAdapter<Group>(
  {
    // MongoDB uses '_id' as the key for the ID field, not 'id'
    selectId: (group: Group) => group._id
  }
);

export const initialState = groupsAdapter.getInitialState();

export function reducer(state = initialState, action: GroupsActions): State {
  switch (action.type) {
    case GroupsActionTypes.LoadGroupsSuccess:
      return groupsAdapter.addAll(action.payload, state);

    case GroupsActionTypes.LoadGroupsFailure: {
      console.error(action.payload);
      return state;
    }

    default:
      return state;
  }
}

export const GroupsSelectors = groupsAdapter.getSelectors();
