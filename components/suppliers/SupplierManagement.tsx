'use client';

import { useMemo, useState, useRef } from 'react';
import type { Supplier } from '@/types/supplier';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SupplierTable from './SupplierTable';
import { MOCK_SUPPLIERS } from './mockSuppliers';

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [query, setQuery] = useState('');
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '', phone: '', email: '', gstin: '', totalOrders: 0, outstandingAmount: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.phone) return;
    const added: Supplier = {
      id: Date.now(),
      name: newSupplier.name,
      phone: newSupplier.phone,
      email: newSupplier.email || undefined,
      gstin: newSupplier.gstin || undefined,
      totalOrders: Number(newSupplier.totalOrders) || 0,
      outstandingAmount: Number(newSupplier.outstandingAmount) || 0,
    };
    setSuppliers(prev => [added, ...prev]);
    setIsAddOpen(false);
    setNewSupplier({ name: '', phone: '', email: '', gstin: '', totalOrders: 0, outstandingAmount: 0 });
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let newItems: Supplier[] = [];
        
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          newItems = Array.isArray(parsed) ? parsed : [parsed];
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(line => line.trim());
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            for (let i = 1; i < lines.length; i++) {
              const values = lines[i].split(',').map(v => v.trim());
              const supplier: any = { id: Date.now() + i };
              headers.forEach((header, index) => {
                const val = values[index];
                if (header === 'totalorders' || header === 'outstandingamount') {
                  const keyMap: any = {
                    totalorders: 'totalOrders',
                    outstandingamount: 'outstandingAmount'
                  };
                  supplier[keyMap[header]] = Number(val) || 0;
                } else {
                  supplier[header] = val;
                }
              });
              if (supplier.name && supplier.phone) {
                newItems.push(supplier as Supplier);
              }
            }
          }
        }
        
        if (newItems.length > 0) {
          const formatted = newItems.map((s, idx) => ({
            ...s,
            id: s.id || Date.now() + idx,
            name: s.name || 'Unknown',
            phone: s.phone || '-',
            totalOrders: s.totalOrders || 0,
            outstandingAmount: s.outstandingAmount || 0,
          }));
          setSuppliers(prev => [...formatted, ...prev]);
          alert(`Successfully imported ${formatted.length} suppliers!`);
        } else {
          alert('No valid suppliers found in the file.');
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

  const filteredSuppliers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suppliers;

    return suppliers.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        (s.gstin || '').toLowerCase().includes(q)
      );
    });
  }, [suppliers, query]);

  const totalOrders = suppliers.reduce((acc, s) => acc + s.totalOrders, 0);
  const totalOutstanding = suppliers.reduce((acc, s) => acc + s.outstandingAmount, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Supplier Management</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</div>
            <span className="text-blue-500">📄</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalOrders.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Outstanding Amount</div>
            <span className="text-orange-500">💰</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            ₹{totalOutstanding.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4 mb-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Supplier List</h3>
      </div>

      <div className="mt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone or GSTIN..." />
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" className="!bg-white !text-black !border-gray-300 hover:!bg-gray-100" onClick={() => setIsBulkOpen(true)}>
            <span className="font-semibold">⬆ Bulk Upload</span>
          </Button>
          <Button type="button" className="!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700" onClick={() => setIsAddOpen(true)}>
            <span className="font-semibold">+ Add Supplier</span>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <SupplierTable suppliers={filteredSuppliers} />
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Supplier">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name *</label>
            <Input value={newSupplier.name} onChange={e => setNewSupplier({...newSupplier, name: e.target.value})} placeholder="Supplier Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone *</label>
            <Input value={newSupplier.phone} onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})} placeholder="Phone Number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
            <Input type="email" value={newSupplier.email} onChange={e => setNewSupplier({...newSupplier, email: e.target.value})} placeholder="example@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">GSTIN</label>
            <Input value={newSupplier.gstin} onChange={e => setNewSupplier({...newSupplier, gstin: e.target.value.toUpperCase()})} placeholder="E.g., 29ABCDE1234F1Z5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Total Orders</label>
              <Input type="number" value={newSupplier.totalOrders} onChange={e => setNewSupplier({...newSupplier, totalOrders: Number(e.target.value)})} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Outstanding Amount</label>
              <Input type="number" value={newSupplier.outstandingAmount} onChange={e => setNewSupplier({...newSupplier, outstandingAmount: Number(e.target.value)})} placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSupplier}>Save Supplier</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} title="Bulk Upload Suppliers">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload a CSV or JSON file containing your supplier list to bulk import them.
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
