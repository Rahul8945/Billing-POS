import type { Product } from '@/types/product';

export const LOW_STOCK_THRESHOLD = 10;
export const EXPIRING_SOON_DAYS = 30;

export function isLowStock(p: Product) {
  const s = p.stock ?? 0;
  return s > 0 && s <= LOW_STOCK_THRESHOLD;
}

export function isExpiringSoon(p: Product) {
  if (!p.expiryDate) return false;
  const now = new Date();
  const exp = new Date(p.expiryDate);
  const diffDays = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= EXPIRING_SOON_DAYS;
}

export function formatDate(d?: string) {
  if (!d) return '-';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString('en-GB');
}
