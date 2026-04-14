import type { Product } from '@/types/product';

export type CartItem = {
  product: Product;
  qty: number;
};

export type PaymentMethod = 'cash' | 'upi' | 'card';
