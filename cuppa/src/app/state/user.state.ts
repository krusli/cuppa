import { User } from '../models/User';
import { Nullable } from '../reducers/user.reducer';

export interface UserState {
    readonly user: Nullable<User>;
}