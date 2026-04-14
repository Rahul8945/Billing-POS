'use client';

import Button from '../ui/Button';

export default function ActionBar({
  onHoldBillAction,
  onClearCartAction,
  onPrintInvoiceAction,
}: {
  onHoldBillAction: () => void;
  onClearCartAction: () => void;
  onPrintInvoiceAction: () => void;
}) {
  return (
    <div className="h-16 px-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary" onClick={onHoldBillAction}>
          ⏸
          Hold Bill
        </Button>
        <Button type="button" variant="danger" onClick={onClearCartAction}>
          ✖
          Clear Cart
        </Button>
      </div>
      <Button type="button" variant="secondary" onClick={onPrintInvoiceAction}>
        🖨
        Print Invoice
      </Button>
    </div>
  );
}
