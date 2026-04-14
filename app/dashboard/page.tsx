import AppShell from '../../components/layout/AppShell';

function StatCard({
  title,
  value,
  delta,
  icon,
}: {
  title: string;
  value: string;
  delta?: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 flex items-start gap-3">
      <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 grid place-items-center">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-gray-500 dark:text-slate-400">{title}</div>
        <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-slate-100 leading-6">{value}</div>
        {delta ? <div className="mt-1 text-[11px] text-green-600">{delta}</div> : null}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 text-sm font-semibold text-gray-800 dark:text-slate-100">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Revenue" value="₹1,24,800" delta="↑ 8.2% vs last week" icon="💲" />
          <StatCard title="Total Products" value="842" icon="📦" />
          <StatCard title="Total Customers" value="156" delta="↑ 13.1% vs last week" icon="👥" />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Panel title="Revenue Overview">
              <div className="h-64 rounded-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-dashed border-gray-200 dark:border-slate-800 grid place-items-center text-sm text-gray-500 dark:text-slate-400">
                Chart Placeholder
              </div>
            </Panel>
          </div>
          <div>
            <Panel title="Top Selling Products">
              <div className="h-64 rounded-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-dashed border-gray-200 dark:border-slate-800 grid place-items-center text-sm text-gray-500 dark:text-slate-400">
                Chart Placeholder
              </div>
            </Panel>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Panel title="Recent Transactions">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
                      <th className="py-2 text-left font-medium">DATE & TIME</th>
                      <th className="py-2 text-left font-medium">CUSTOMER</th>
                      <th className="py-2 text-left font-medium">ITEMS</th>
                      <th className="py-2 text-left font-medium">TOTAL</th>
                      <th className="py-2 text-left font-medium">PAYMENT</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-slate-200">
                    <tr className="border-b border-gray-50 dark:border-slate-800">
                      <td className="py-2">2025-04-10 14:35</td>
                      <td className="py-2">Rajesh Kumar</td>
                      <td className="py-2">5</td>
                      <td className="py-2">₹590.50</td>
                      <td className="py-2">UPI</td>
                    </tr>
                    <tr className="border-b border-gray-50 dark:border-slate-800">
                      <td className="py-2">2025-04-10 13:20</td>
                      <td className="py-2">Walk-in</td>
                      <td className="py-2">3</td>
                      <td className="py-2">₹263.20</td>
                      <td className="py-2">Cash</td>
                    </tr>
                    <tr>
                      <td className="py-2">2025-04-10 12:10</td>
                      <td className="py-2">Priya Sharma</td>
                      <td className="py-2">8</td>
                      <td className="py-2">₹1,282.50</td>
                      <td className="py-2">Card</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          <div className="space-y-4">
            <Panel title="Low Stock Alerts">
              <div className="space-y-2">
                <div className="rounded-lg border border-orange-100 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900/50 px-3 py-2">
                  <div className="text-sm font-medium text-orange-800">Surf Excel Detergent</div>
                  <div className="text-xs text-orange-700">Only 3 units left</div>
                </div>
                <div className="rounded-lg border border-orange-100 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900/50 px-3 py-2">
                  <div className="text-sm font-medium text-orange-800">Red Label Tea</div>
                  <div className="text-xs text-orange-700">Only 5 units left</div>
                </div>
                <div className="rounded-lg border border-orange-100 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900/50 px-3 py-2">
                  <div className="text-sm font-medium text-orange-800">Britannia Bread</div>
                  <div className="text-xs text-orange-700">Expiring on Apr 15</div>
                </div>
              </div>
            </Panel>

            <Panel title="Quick Stats">
              <div className="space-y-2 text-sm text-gray-700 dark:text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Today's Transactions</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Average Bill</span>
                  <span className="font-medium">₹248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Returns</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
