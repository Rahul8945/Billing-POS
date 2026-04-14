import type { ReactNode } from 'react';
import { cn } from './cn';

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800',
        className
      )}
    >
      {children}
    </div>
  );
}
