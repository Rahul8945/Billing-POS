'use client';

import { useMemo, useState, useRef } from 'react';
import type { Product } from '@/types/product';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SummaryCards from './SummaryCards';
import InventoryTable from './InventoryTable';
import { EXPIRING_SOON_DAYS, isExpiringSoon, isLowStock } from './utils';
import { MOCK_INVENTORY } from './mockInventory';

type Filter = 'all' | 'lowStock' | 'expiring';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<Product[]>(MOCK_INVENTORY);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', sku: '', barcode: '', price: 0, stock: 0, category: '', unit: 'pcs', gstPercent: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.barcode) return;
    const added: Product = {
      id: Date.now(),
      name: newProduct.name,
      sku: newProduct.sku || undefined,
      barcode: newProduct.barcode,
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      category: newProduct.category || undefined,
      unit: newProduct.unit || 'pcs',
      gstPercent: Number(newProduct.gstPercent) || 0,
      expiryDate: newProduct.expiryDate
    };
    setInventory(prev => [added, ...prev]);
    setIsAddOpen(false);
    setNewProduct({ name: '', sku: '', barcode: '', price: 0, stock: 0, category: '', unit: 'pcs', gstPercent: 0 });
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let newProducts: Product[] = [];
        
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          newProducts = Array.isArray(parsed) ? parsed : [parsed];
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(line => line.trim());
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            for (let i = 1; i < lines.length; i++) {
              const values = lines[i].split(',').map(v => v.trim());
              const product: any = { id: Date.now() + i };
              headers.forEach((header, index) => {
                const val = values[index];
                if (header === 'price' || header === 'stock' || header === 'gstpercent') {
                  product[header === 'gstpercent' ? 'gstPercent' : header] = Number(val) || 0;
                } else {
                  product[header] = val;
                }
              });
              if (product.name && product.barcode) {
                newProducts.push(product as Product);
              }
            }
          }
        }
        
        if (newProducts.length > 0) {
          const formattedProducts = newProducts.map((p, idx) => ({
            ...p,
            id: p.id || Date.now() + idx,
            name: p.name || 'Unknown Import',
            barcode: p.barcode || `IMP-${Date.now()}-${idx}`,
            price: p.price || 0
          }));
          setInventory(prev => [...formattedProducts, ...prev]);
          alert(`Successfully imported ${formattedProducts.length} products!`);
        } else {
          alert('No valid products found in the file.');
        }
      } catch (err) {
        console.error('Failed to parse file:', err);
        alert('Failed to parse file. Please ensure it is a valid JSON or CSV.');
      } finally {
        setIsBulkOpen(false);
        if(fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const derived = useMemo(() => {
    const all = inventory;
    const low = all.filter(isLowStock);
    const expiring = all.filter(isExpiringSoon);

    const q = query.trim().toLowerCase();
    let base: Product[] = all;

    if (filter === 'lowStock') base = low;
    if (filter === 'expiring') base = expiring;

    if (!q) {
      return { all, low, expiring, rows: base };
    }

    const rows = base.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        (p.sku ?? '').toLowerCase().includes(q) ||
        p.barcode.toLowerCase().includes(q)
      );
    });

    return { all, low, expiring, rows };
  }, [filter, query]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Inventory Management</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4">
        <SummaryCards
          totalProducts={derived.all.length}
          lowStockCount={derived.low.length}
          expiringSoonCount={derived.expiring.length}
        />
      </div>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or SKU..." />
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" className="!bg-white !text-black !border-gray-300 hover:!bg-gray-100" onClick={() => setIsBulkOpen(true)}>
            <span className="font-semibold">⬆ Bulk Upload</span>
          </Button>
          <Button type="button" className="!bg-white !text-black !border-gray-300 hover:!bg-gray-100" onClick={() => setIsAddOpen(true)}>
            <span className="font-semibold">+ Add Product</span>
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button
          type="button"
          variant={filter === 'all' ? 'primary' : 'secondary'}
          className="h-9"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          type="button"
          variant={filter === 'lowStock' ? 'primary' : 'secondary'}
          className="h-9"
          onClick={() => setFilter('lowStock')}
        >
          Low Stock ({derived.low.length})
        </Button>
        <Button
          type="button"
          variant={filter === 'expiring' ? 'primary' : 'secondary'}
          className="h-9"
          onClick={() => setFilter('expiring')}
        >
          Expiring ({derived.expiring.length})
        </Button>
        <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 hidden md:block">
          Expiring soon = within {EXPIRING_SOON_DAYS} days
        </div>
      </div>

      <div className="mt-3">
        <InventoryTable products={derived.rows} />
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Product">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name *</label>
            <Input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Product Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Barcode *</label>
            <Input value={newProduct.barcode} onChange={e => setNewProduct({...newProduct, barcode: e.target.value})} placeholder="Barcode" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Price</label>
              <Input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Stock</label>
              <Input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddProduct}>Save Product</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} title="Bulk Upload">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload a CSV or JSON file containing your product list to bulk import them into inventory.
          </p>
          <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50">
            <input 
              type="file" 
              accept=".csv,.json" 
              ref={fileInputRef}
              onChange={handleBulkUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="primary" 
              onClick={() => fileInputRef.current?.click()}
            >
              Select File to Upload
            </Button>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
              Only .csv and .json files are supported
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4 mt-8">
            <Button variant="secondary" onClick={() => setIsBulkOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
