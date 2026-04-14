'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './nav';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-100 flex flex-col">
      <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <span className="text-white text-lg">🛒</span>
        </div>
        <div>
          <div className="font-semibold leading-5">GroceryPOS</div>
          <div className="text-[11px] text-slate-400">Point of Sale System</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`h-10 px-3 rounded-lg flex items-center gap-3 text-sm transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="w-5 text-center opacity-90">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-slate-800">
        <Link
          href="/login"
          className="h-10 px-3 rounded-lg flex items-center gap-3 text-sm text-slate-200 hover:bg-slate-800"
        >
          <span className="w-5 text-center">⟵</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
