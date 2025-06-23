import { ACTIONCONSTANTS } from '../services/config/apiConstants';
import { Product } from './types';

export interface AddProductAction {
  type: typeof ACTIONCONSTANTS.ADD_PRODUCT;
  payload: Product;
}

export interface UpdateProductAction {
  type: typeof ACTIONCONSTANTS.UPDATE_PRODUCT;
  payload: Product;
}

export interface DeleteProductAction {
  type: typeof ACTIONCONSTANTS.DELETE_PRODUCT;
  payload: string; // productId
}

export interface AddToCartAction {
  type: typeof ACTIONCONSTANTS.ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: typeof ACTIONCONSTANTS.REMOVE_FROM_CART;
  payload: string; // productId
}

export type ProductActionTypes =
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction;

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;
