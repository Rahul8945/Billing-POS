'use client';

import type { PaymentMethod } from './types';
import Card from '../ui/Card';
import Button from '../ui/Button';

const METHODS: Array<{ id: PaymentMethod; label: string; icon: string; variant: 'success' | 'info' | 'muted' }> = [
  { id: 'cash', label: 'Cash Payment', icon: '💵', variant: 'success' },
  { id: 'upi', label: 'UPI Payment', icon: '📱', variant: 'info' },
  { id: 'card', label: 'Card Payment', icon: '💳', variant: 'muted' },
];

export default function PaymentMethods({
  value,
  onChangeAction,
}: {
  value: PaymentMethod;
  onChangeAction: (method: PaymentMethod) => void;
}) {
  return (
    <Card className="p-4">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Payment Method</div>
      <div className="mt-3 space-y-2">
        {METHODS.map((m) => {
          const active = value === m.id;
          return (
            <Button
              key={m.id}
              type="button"
              variant={m.variant}
              onClick={() => onChangeAction(m.id)}
              className={`w-full justify-center ${active ? 'ring-2 ring-blue-500/40' : ''}`}
            >
              <span className="text-base">{m.icon}</span>
              <span>{m.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
