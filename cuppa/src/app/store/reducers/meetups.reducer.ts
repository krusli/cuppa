
import { MeetupsActions, MeetupsActionTypes } from '../actions/meetups.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Meetup } from 'src/app/models/Group';
import { groupsAdapter } from './groups.reducer';

export interface State extends EntityState<Meetup> {}

export const meetupsAdapter = createEntityAdapter<Meetup>(
  {
    // TODO: make this generic, define HasID Interface.
    selectId: (meetup: Meetup) => meetup._id
  }
)

export const initialState = meetupsAdapter.getInitialState();

export function reducer(state = initialState, action: MeetupsActions): State {
  switch (action.type) {

    case MeetupsActionTypes.LoadMeetups:
      return meetupsAdapter.addAll(action.payload, state);  // also clears out meetups from other group if already previously loaded.

    case MeetupsActionTypes.NewMeetupSuccess:
      return meetupsAdapter.addOne(action.payload.meetup, state);

    default:
      return state;
  }
}

export const MeetupsSelectors = meetupsAdapter.getSelectors();
