'use client';

import type { CartItem } from './types';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function CartPanel({
  items,
  onIncAction,
  onDecAction,
}: {
  items: CartItem[];
  onIncAction: (productId: number) => void;
  onDecAction: (productId: number) => void;
}) {
  return (
    <Card className="h-full">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl opacity-60">🛒</div>
          <div className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Cart is empty</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Add products to start billing</div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="p-3 border-b border-gray-100 dark:border-slate-800">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cart</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {items.map((it) => (
                <div key={it.product.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {it.product.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      ₹{it.product.price} • GST {(it.product.gstPercent ?? 0).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      className="h-8 w-8 px-0"
                      onClick={() => onDecAction(it.product.id)}
                    >
                      −
                    </Button>
                    <div className="w-8 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                      {it.qty}
                    </div>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 px-0"
                      onClick={() => onIncAction(it.product.id)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="w-20 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ₹{(it.product.price * it.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
