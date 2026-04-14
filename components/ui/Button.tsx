import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'info' | 'muted' | 'danger';

export default function Button({
  children,
  className,
  variant = 'secondary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  const base =
    'h-10 px-4 rounded-lg text-sm font-medium transition inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed';

  const styles: Record<Variant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary:
      'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800',
    success: 'bg-green-500/20 text-green-700 dark:text-green-200 hover:bg-green-500/25',
    info: 'bg-blue-500/20 text-blue-700 dark:text-blue-200 hover:bg-blue-500/25',
    muted: 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
