'use client';

import { useTheme } from '../theme/ThemeProvider';

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-end px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="h-9 px-3 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm text-gray-700 dark:text-slate-200 flex items-center gap-2"
          aria-label="Toggle theme"
        >
          <span className="text-base">{theme === 'dark' ? '🌙' : '☀️'}</span>
          <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
        <button
          type="button"
          className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 grid place-items-center"
          aria-label="Notifications"
        >
          <span className="text-base">🔔</span>
        </button>
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-blue-600 text-white grid place-items-center"
          aria-label="User"
        >
          <span className="text-sm font-semibold">A</span>
        </button>
      </div>
    </header>
  );
}
