import { ACTIONCONSTANTS } from '../../services/config/apiConstants';
import { Product } from '../../types/types';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productReducer = (
  state = initialState,
  action: { type: string; payload?: any },
): ProductState => {
  switch (action.type) {
    case ACTIONCONSTANTS.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ACTIONCONSTANTS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case ACTIONCONSTANTS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };
    default:
      return state;
  }
};
