import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { User } from 'src/app/models/User';


export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LoadUser:
      return {
        user: action.payload
      }

    default:
      return state;
  }
}
