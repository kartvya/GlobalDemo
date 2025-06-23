import { combineReducers, Reducer, UnknownAction } from 'redux';
import { authReducer, AuthState } from './reducers/AuthReducer';
import { cartReducer, CartState } from './reducers/CartReducer';
import { productReducer } from './reducers/ProductReducer';
import { ProductState } from '../types/types';

interface Rootstate {
  authReducer: AuthState;
  cartReducer: CartState;
  productReducer: ProductState;
}

const appReducer: Reducer<any> = combineReducers({
  authReducer,
  cartReducer,
  productReducer,
});

const RootReducer = (state: Rootstate | undefined, action: UnknownAction) => {
  // if (action.type === ACTIONCONSTANTS.LOGOUT) {
  //   return appReducer(undefined, action);
  // }

  return appReducer(state, action);
};

export default RootReducer;
