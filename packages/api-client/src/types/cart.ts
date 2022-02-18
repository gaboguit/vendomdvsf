import { Address } from './checkout';

export type LineItem = {
  id: string;
  _variantId: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  image: string;
  price: {
    original: number;
    current: number;
  };
  displayPrice: string;
  displayTotal: string;
  qty: number;
  options: {
    [key: string]: string
  }
};

export type Cart = {
  _id: string;
  email: string;
  number: string;
  state: string;
  total: string;
  totalAmount: number;
  itemTotal: string;
  itemTotalAmount: number;
  shipTotal: string;
  shipTotalAmount: number;
  taxTotalAmount: number;
  adjustmentTotal: string;
  lineItems: LineItem[];
  itemCount: number;
  completedAt: Date;
  token: string;
  address: {
    shipping: Address;
    billing: Address;
  };
};

export type Order = Cart;

export type AddToCartParams = {
  token: string;
  variantId: string;
  quantity: number;
};

export type ApplyCouponParams = {
  token: string;
  couponCode: string;
};

export type ClearCartParams = {
  token: string;
}

export type GetChangeCartParams = {
  currency: string;
  newCurrency: string;
}
