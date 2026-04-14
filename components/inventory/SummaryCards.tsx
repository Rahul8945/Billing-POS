import Card from '../ui/Card';

export default function SummaryCards({
  totalProducts,
  lowStockCount,
  expiringSoonCount,
}: {
  totalProducts: number;
  lowStockCount: number;
  expiringSoonCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 grid place-items-center">📦</div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Total Products</div>
          <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{totalProducts}</div>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 grid place-items-center">⚠️</div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Low Stock Items</div>
          <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{lowStockCount}</div>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 grid place-items-center">⏳</div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Expiring Soon</div>
          <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{expiringSoonCount}</div>
        </div>
      </Card>
    </div>
  );
}
