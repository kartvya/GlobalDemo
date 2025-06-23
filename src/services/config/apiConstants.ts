export const BASE_URL: string = 'https://fakestoreapi.com/';

export const apiMethod = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const endpoint = {
  login: '/auth/login',
  getProducts: 'products',
};

export const ACTIONCONSTANTS = {
  SET_IS_AUTHENTICATED: 'auth/SET_IS_AUTHENTICATED',
  SET_IDENTITY: 'auth/SET_IDENTITY',
  SET_USERINFO: 'auth/SET_USERINFO',
  CLEAR_IDENTITY: 'auth/CLEAR_IDENTITY',
  SET_TOGGLE_ATTENDANCE: 'attendance/SET_TOGGLE_ATTENDANCE',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
};
