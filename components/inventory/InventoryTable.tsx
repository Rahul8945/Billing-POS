import type { Product } from '@/types/product';
import Card from '../ui/Card';
import { cn } from '../ui/cn';
import { formatDate, isExpiringSoon, isLowStock } from './utils';

export default function InventoryTable({ products }: { products: Product[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
              <th className="py-3 px-4 text-left font-medium">NAME</th>
              <th className="py-3 px-4 text-left font-medium">SKU</th>
              <th className="py-3 px-4 text-left font-medium">BARCODE</th>
              <th className="py-3 px-4 text-left font-medium">CATEGORY</th>
              <th className="py-3 px-4 text-left font-medium">PRICE</th>
              <th className="py-3 px-4 text-left font-medium">STOCK</th>
              <th className="py-3 px-4 text-left font-medium">UNIT</th>
              <th className="py-3 px-4 text-left font-medium">GST %</th>
              <th className="py-3 px-4 text-left font-medium">EXPIRY DATE</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-200">
            {products.map((p) => {
              const low = isLowStock(p);
              const exp = isExpiringSoon(p);
              return (
                <tr key={p.id} className="border-b border-gray-50 dark:border-slate-800 last:border-0">
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{p.name}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.sku ?? '-'}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.barcode}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.category ?? '-'}</td>
                  <td className="py-3 px-4">₹{p.price}</td>
                  <td
                    className={cn(
                      'py-3 px-4 font-semibold',
                      low ? 'text-red-600' : 'text-slate-800 dark:text-slate-100'
                    )}
                  >
                    {p.stock ?? '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.unit ?? '-'}</td>
                  <td className="py-3 px-4">{p.gstPercent ?? '-'}</td>
                  <td
                    className={cn(
                      'py-3 px-4',
                      exp ? 'text-orange-600 font-medium' : 'text-slate-600 dark:text-slate-300'
                    )}
                  >
                    {formatDate(p.expiryDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
