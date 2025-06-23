export interface Product {
  id: string;
  price: number;
  category: string;
  title: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  isLocal?: boolean;
}

export interface CartProduct {
  id: string;
  price: number;
  category: string;
  title: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductState {
  products: Product[];
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}
