import type { Supplier } from '@/types/supplier';
import Card from '../ui/Card';
import { cn } from '../ui/cn';

export default function SupplierTable({ suppliers }: { suppliers: Supplier[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
              <th className="py-3 px-4 text-left font-medium">NAME</th>
              <th className="py-3 px-4 text-left font-medium">PHONE</th>
              <th className="py-3 px-4 text-left font-medium">EMAIL</th>
              <th className="py-3 px-4 text-left font-medium">GSTIN</th>
              <th className="py-3 px-4 text-left font-medium">TOTAL ORDERS</th>
              <th className="py-3 px-4 text-left font-medium">OUTSTANDING</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-200">
            {suppliers.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{s.name}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.phone}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.email || '-'}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.gstin || '-'}</td>
                <td className="py-3 px-4">{s.totalOrders}</td>
                <td className={cn("py-3 px-4 font-medium", s.outstandingAmount > 0 ? "text-red-600" : "text-emerald-600 dark:text-emerald-400")}>
                  ₹{s.outstandingAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {suppliers.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            No suppliers found.
          </div>
        )}
      </div>
    </Card>
  );
}
