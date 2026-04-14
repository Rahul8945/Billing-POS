import type { Product } from '@/types/product';

export const MOCK_INVENTORY: Product[] = [
  { id: 1, name: 'Salt', sku: 'SALT001', barcode: '8901234567890', category: 'Grocery', price: 20, stock: 150, unit: '1 kg', gstPercent: 5, expiryDate: '2026-12-31' },
  { id: 2, name: 'Milk', sku: 'MILK001', barcode: '8901234567891', category: 'Dairy', price: 56, stock: 80, unit: '1 ltr', gstPercent: 5, expiryDate: '2026-05-15' },
  { id: 3, name: 'Maggi Noodles', sku: 'NOOD001', barcode: '8901234567892', category: 'Instant Food', price: 12, stock: 200, unit: '70g', gstPercent: 12, expiryDate: '2026-08-20' },
  { id: 4, name: 'Bread', sku: 'BREAD001', barcode: '8901234567893', category: 'Bakery', price: 35, stock: 45, unit: '400g', gstPercent: 5, expiryDate: '2026-04-18' },
  { id: 5, name: 'Cooking Oil', sku: 'OIL001', barcode: '8901234567894', category: 'Cooking Oil', price: 180, stock: 60, unit: '1 ltr', gstPercent: 12, expiryDate: '2026-10-30' },
  { id: 6, name: 'Tea', sku: 'TEA001', barcode: '8901234567895', category: 'Beverages', price: 140, stock: 5, unit: '500g', gstPercent: 5, expiryDate: '2026-06-25' },
  { id: 7, name: 'Toothpaste', sku: 'TOOTH001', barcode: '8901234567896', category: 'Personal Care', price: 85, stock: 100, unit: '200g', gstPercent: 18, expiryDate: '2027-03-15' },
  { id: 8, name: 'Biscuits', sku: 'BISC001', barcode: '8901234567897', category: 'Snacks', price: 10, stock: 250, unit: '100g', gstPercent: 12, expiryDate: '2026-09-10' },
  { id: 9, name: 'Detergent', sku: 'DET001', barcode: '8901234567898', category: 'Household', price: 320, stock: 3, unit: '2 kg', gstPercent: 18, expiryDate: '2026-07-20' },
  { id: 10, name: 'Rice', sku: 'RICE001', barcode: '8901234567899', category: 'Grocery', price: 450, stock: 40, unit: '5 kg', gstPercent: 5, expiryDate: '2026-11-30' },
  { id: 11, name: 'Soft Drink', sku: 'DRINK001', barcode: '8901234567800', category: 'Beverages', price: 40, stock: 120, unit: '750ml', gstPercent: 28, expiryDate: '2026-07-15' },
  { id: 12, name: 'Chips', sku: 'CHIPS001', barcode: '8901234567801', category: 'Snacks', price: 20, stock: 180, unit: '52g', gstPercent: 12, expiryDate: '2026-05-20' },
];
