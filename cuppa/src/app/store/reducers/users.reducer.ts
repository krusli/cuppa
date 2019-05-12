import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/models/User';
import { UsersActionTypes, UsersActions } from '../actions/users.actions';

export interface State extends EntityState<User> {}

export const usersAdapter = createEntityAdapter<User>(
  {
    selectId: (user: User) => user._id
  }
)

export const initialState = usersAdapter.getInitialState();

export function reducer(state = initialState, action: UsersActions): State {
  switch (action.type) {
    // NOTE: addMany will not remove existing entities.
    // we want this as we will be discovering more and more users as the user loads more groups.
    case UsersActionTypes.LoadUsers:
      return usersAdapter.addMany(action.payload, state);

    default:
      return state;
  }
}
