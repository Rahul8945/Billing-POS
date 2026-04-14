import Card from '../ui/Card';
import type { CartItem } from './types';
import { calcGST, calcSubtotal, formatINR } from './utils';

export default function BillSummary({ items }: { items: CartItem[] }) {
  const subtotal = calcSubtotal(items);
  const gst = calcGST(items);
  const total = subtotal + gst;

  return (
    <Card className="p-4">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 text-center">Bill Summary</div>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Items ({items.reduce((s, i) => s + i.qty, 0)})</span>
          <span>{items.reduce((s, i) => s + i.qty, 0)} units</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>GST</span>
          <span>{formatINR(gst)}</span>
        </div>

        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Total Amount</span>
          <span className="text-lg font-semibold text-blue-600">{formatINR(total)}</span>
        </div>
      </div>
    </Card>
  );
}
