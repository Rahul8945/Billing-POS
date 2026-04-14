'use client';

import type { Product } from '@/types/product';
import Card from '../ui/Card';
import Input from '../ui/Input';

export default function ProductList({
  products,
  search,
  onSearchAction,
  onAddAction,
}: {
  products: Product[];
  search: string;
  onSearchAction: (value: string) => void;
  onAddAction: (product: Product) => void;
}) {
  return (
    <Card className="h-full overflow-hidden">
      <div className="p-3 border-b border-gray-100 dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Products</div>
        <div className="mt-2">
          <Input
            value={search}
            onChange={(e) => onSearchAction(e.target.value)}
            placeholder="Search or enter manually..."
          />
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onAddAction(p)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.name}</div>
                  <div className="mt-1 text-[11px] text-blue-600">
                    GST {(p.gstPercent ?? 0).toFixed(0)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-700 dark:text-green-300">₹{p.price}</div>
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Stock: {p.stock ?? '-'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
