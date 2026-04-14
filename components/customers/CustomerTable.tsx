import type { Customer } from '@/types/customer';
import Card from '../ui/Card';
import { cn } from '../ui/cn';

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
              <th className="py-3 px-4 text-left font-medium">NAME</th>
              <th className="py-3 px-4 text-left font-medium">PHONE</th>
              <th className="py-3 px-4 text-left font-medium">EMAIL</th>
              <th className="py-3 px-4 text-left font-medium">LOYALTY POINTS</th>
              <th className="py-3 px-4 text-left font-medium">CREDIT BALANCE</th>
              <th className="py-3 px-4 text-left font-medium">TOTAL PURCHASES</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-200">
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{c.name}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{c.phone}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{c.email || '-'}</td>
                <td className="py-3 px-4 text-amber-600 font-medium whitespace-nowrap">⭐ {c.loyaltyPoints.toLocaleString()}</td>
                <td className={cn("py-3 px-4 font-medium", c.creditBalance > 0 ? "text-red-600" : "text-slate-600 dark:text-slate-300")}>
                  ₹{c.creditBalance.toLocaleString()}
                </td>
                <td className="py-3 px-4">₹{c.totalPurchases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            No customers found.
          </div>
        )}
      </div>
    </Card>
  );
}
