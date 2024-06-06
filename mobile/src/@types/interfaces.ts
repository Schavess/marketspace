export interface PaymentMethod {
  key: string;
  name: string;
}

export interface ProductImage {
  id: string;
  path: string;
}

export interface User {
  avatar: string;
  name: string;
  tel: string;
}

export interface ItemData {
  accept_trade: boolean;
  created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: PaymentMethod[];
  price: number;
  product_images: ProductImage[];
  updated_at: string;
  user: User;
  user_id: string;
}
