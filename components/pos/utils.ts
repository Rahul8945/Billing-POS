import type { CartItem } from './types';

export function formatINR(amount: number) {
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  });
}

export function calcSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

export function calcGST(items: CartItem[]) {
  return items.reduce((sum, item) => {
    const pct = item.product.gstPercent ?? 0;
    return sum + item.product.price * item.qty * (pct / 100);
  }, 0);
}
