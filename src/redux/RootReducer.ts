import {combineReducers, Reducer, UnknownAction} from 'redux';
import {authReducer, AuthState} from './reducers/AuthReducer';
import {userReducer, UserState} from './reducers/UserReducer';

interface Rootstate {
  authReducer: AuthState;
  userReducer: UserState;
}

const appReducer: Reducer<any> = combineReducers({
  authReducer,
  userReducer,
});

const RootReducer = (state: Rootstate | undefined, action: UnknownAction) => {
  // if (action.type === ACTIONCONSTANTS.LOGOUT) {
  //   return appReducer(undefined, action);
  // }

  return appReducer(state, action);
};

export default RootReducer;
