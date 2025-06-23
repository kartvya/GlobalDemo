import {ACTIONCONSTANTS} from '../../services/config/apiConstants';

interface UserInfoPayload {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  role_name: string;
}

interface AuthTokensPayload {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role_id: string;
  permissions: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfoPayload | null;
  tokens: AuthTokensPayload | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
  tokens: null,
};

export const authReducer = (
  state = initialState,
  action: {type: string; payload?: any},
): AuthState => {
  switch (action.type) {
    case ACTIONCONSTANTS.SET_IS_AUTHENTICATED:
      return {...state, isAuthenticated: action.payload};
    case ACTIONCONSTANTS.SET_USERINFO:
      return {...state, userInfo: action.payload};
    case ACTIONCONSTANTS.SET_IDENTITY:
      return {...state, tokens: action.payload};
    case ACTIONCONSTANTS.CLEAR_IDENTITY:
      return {...initialState};
    default:
      return state;
  }
};
