import { ACTIONCONSTANTS } from '../../services/config/apiConstants';
import { CartProduct } from '../../types/types';

export interface CartState {
  items: CartProduct[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const cartReducer = (
  state = initialState,
  action: { type: string; payload?: any },
): CartState => {
  switch (action.type) {
    case ACTIONCONSTANTS.ADD_TO_CART: {
      if (!action.payload) return state;

      const existingProductIndex = state.items.findIndex(
        item => item.id === action.payload!.id,
      );

      let updatedItems;

      if (existingProductIndex !== -1) {
        updatedItems = [...state.items];
        const existingProduct = updatedItems[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + (action.payload.quantity || 1),
        };
        updatedItems[existingProductIndex] = updatedProduct;
      } else {
        updatedItems = [
          ...state.items,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
          },
        ];
      }

      const newTotalAmount = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: newTotalAmount,
      };
    }
    case ACTIONCONSTANTS.REMOVE_FROM_CART: {
      if (!action.payload) return state;
      const updatedItems = state.items.filter(
        item => item.id !== action.payload,
      );

      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return { items: updatedItems, totalAmount };
    }

    case ACTIONCONSTANTS.UPDATE_CART_QUANTITY: {
      const { id, quantity } = action.payload || {};

      if (!id || quantity < 1) return state;

      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item,
      );

      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return { items: updatedItems, totalAmount };
    }
    default:
      return state;
  }
};
