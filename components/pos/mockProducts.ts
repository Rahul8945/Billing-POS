import type { Product } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Milk', price: 56, barcode: '8902345678901', stock: 80, gstPercent: 5 },
  { id: 2, name: 'Maggi Noodles', price: 12, barcode: '8903456789012', stock: 200, gstPercent: 12 },
  { id: 3, name: 'Bread', price: 35, barcode: '8904567890123', stock: 45, gstPercent: 5 },
  { id: 4, name: 'Cooking Oil', price: 180, barcode: '8905678901234', stock: 60, gstPercent: 12 },
  { id: 5, name: 'Tea', price: 140, barcode: '8906789012345', stock: 5, gstPercent: 5 },
  { id: 6, name: 'Toothpaste', price: 85, barcode: '8907890123456', stock: 100, gstPercent: 18 },
  { id: 7, name: 'Biscuits', price: 10, barcode: '8908901234567', stock: 250, gstPercent: 12 },
  { id: 8, name: 'Detergent', price: 320, barcode: '8909012345678', stock: 3, gstPercent: 12 },
];
