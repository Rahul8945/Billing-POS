'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Product } from '@/types/product';
import ProductList from './ProductList';
import CartPanel from './CartPanel';
import BillSummary from './BillSummary';
import PaymentMethods from './PaymentMethods';
import ActionBar from './ActionBar';
import type { CartItem, PaymentMethod } from './types';
import { MOCK_PRODUCTS } from './mockProducts';

function addToCart(items: CartItem[], product: Product) {
  const existing = items.find((i) => i.product.id === product.id);
  if (existing) {
    return items.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
  }
  return [...items, { product, qty: 1 }];
}

export default function POSBilling() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>('cash');

  const products = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.barcode.toLowerCase().includes(q) ||
        String(p.price).includes(q)
      );
    });
  }, [search]);

  const onAddProductAction = useCallback((product: Product) => {
    setCart((prev) => addToCart(prev, product));
  }, []);

  const onIncQtyAction = useCallback((productId: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: i.qty + 1 } : i))
    );
  }, []);

  const onDecQtyAction = useCallback((productId: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const onHoldBillAction = useCallback(() => {
    // placeholder for hold bill logic
  }, []);

  const onClearCartAction = useCallback(() => {
    setCart([]);
  }, []);

  const onPrintInvoiceAction = useCallback(() => {
    // placeholder for print invoice logic
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-12 lg:col-span-4 min-h-0">
          <ProductList
            products={products}
            search={search}
            onSearchAction={setSearch}
            onAddAction={onAddProductAction}
          />
        </div>

        <div className="col-span-12 lg:col-span-5 min-h-0">
          <CartPanel items={cart} onIncAction={onIncQtyAction} onDecAction={onDecQtyAction} />
        </div>

        <div className="col-span-12 lg:col-span-3 min-h-0 flex flex-col gap-4">
          <BillSummary items={cart} />
          <PaymentMethods value={payment} onChangeAction={setPayment} />
        </div>
      </div>

      <div className="mt-4 -mx-4 -mb-4">
        <ActionBar
          onHoldBillAction={onHoldBillAction}
          onClearCartAction={onClearCartAction}
          onPrintInvoiceAction={onPrintInvoiceAction}
        />
      </div>
    </div>
  );
}
