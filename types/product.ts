export interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
  stock?: number;
  gstPercent?: number;
  category?: string;
  sku?: string;
  unit?: string;
  expiryDate?: string;
}