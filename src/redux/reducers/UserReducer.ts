import {ACTIONCONSTANTS} from '../../services/config/apiConstants';

export interface UserState {
  isClockedIn: boolean;
}

const initialState: UserState = {
  isClockedIn: false,
};

export const userReducer = (
  state = initialState,
  action: {type: string; payload?: any},
): UserState => {
  switch (action.type) {
    case ACTIONCONSTANTS.SET_TOGGLE_ATTENDANCE:
      return {...state, isClockedIn: !state.isClockedIn};

    default:
      return state;
  }
};
