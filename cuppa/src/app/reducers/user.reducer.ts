import { User } from "../models/User";
import { UserActions, ADD_USER, CLEAR_USER } from '../actions/user.actions';

export type Nullable<T> = T | null;

const initialState: Nullable<User> = null;

export function userReducer(state: Nullable<User> = initialState, action: UserActions) {

    switch (action.type) {
        case ADD_USER:
            console.log('ADD_USER');
            return action.payload;
        case CLEAR_USER:
            return null;
        default:
            return state;
    }

}