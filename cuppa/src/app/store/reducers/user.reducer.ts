import { User } from 'src/app/models/User';
import { UserActionTypes, UserActions } from '../actions/user.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LoadUser:
      return { ...state, user: action.payload };

    case UserActionTypes.ClearUser:
      return initialState;

    default:
      return state;
  }
}
