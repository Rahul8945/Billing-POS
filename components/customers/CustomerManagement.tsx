'use client';

import { useMemo, useState, useRef } from 'react';
import type { Customer } from '@/types/customer';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CustomerTable from './CustomerTable';
import { MOCK_CUSTOMERS } from './mockCustomers';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [query, setQuery] = useState('');
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '', phone: '', email: '', loyaltyPoints: 0, creditBalance: 0, totalPurchases: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return;
    const added: Customer = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || undefined,
      loyaltyPoints: Number(newCustomer.loyaltyPoints) || 0,
      creditBalance: Number(newCustomer.creditBalance) || 0,
      totalPurchases: Number(newCustomer.totalPurchases) || 0,
    };
    setCustomers(prev => [added, ...prev]);
    setIsAddOpen(false);
    setNewCustomer({ name: '', phone: '', email: '', loyaltyPoints: 0, creditBalance: 0, totalPurchases: 0 });
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let newItems: Customer[] = [];
        
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          newItems = Array.isArray(parsed) ? parsed : [parsed];
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(line => line.trim());
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            for (let i = 1; i < lines.length; i++) {
              const values = lines[i].split(',').map(v => v.trim());
              const customer: any = { id: Date.now() + i };
              headers.forEach((header, index) => {
                const val = values[index];
                if (header === 'loyaltypoints' || header === 'creditbalance' || header === 'totalpurchases') {
                  const keyMap: any = {
                    loyaltypoints: 'loyaltyPoints',
                    creditbalance: 'creditBalance',
                    totalpurchases: 'totalPurchases'
                  };
                  customer[keyMap[header]] = Number(val) || 0;
                } else {
                  customer[header] = val;
                }
              });
              if (customer.name && customer.phone) {
                newItems.push(customer as Customer);
              }
            }
          }
        }
        
        if (newItems.length > 0) {
          const formatted = newItems.map((c, idx) => ({
            ...c,
            id: c.id || Date.now() + idx,
            name: c.name || 'Unknown',
            phone: c.phone || '-',
            loyaltyPoints: c.loyaltyPoints || 0,
            creditBalance: c.creditBalance || 0,
            totalPurchases: c.totalPurchases || 0,
          }));
          setCustomers(prev => [...formatted, ...prev]);
          alert(`Successfully imported ${formatted.length} customers!`);
        } else {
          alert('No valid customers found in the file.');
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

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email || '').toLowerCase().includes(q)
      );
    });
  }, [customers, query]);

  const totalLoyaltyPoints = customers.reduce((acc, c) => acc + c.loyaltyPoints, 0);
  const totalCreditOutstanding = customers.reduce((acc, c) => acc + c.creditBalance, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Customer Management</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Loyalty Points</div>
            <span className="text-amber-500">⭐</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalLoyaltyPoints.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Credit Outstanding</div>
            <span className="text-red-500">💳</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            ₹{totalCreditOutstanding.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4 mb-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Customer List</h3>
      </div>

      <div className="mt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or phone..." />
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" className="!bg-white !text-black !border-gray-300 hover:!bg-gray-100" onClick={() => setIsBulkOpen(true)}>
            <span className="font-semibold">⬆ Bulk Upload</span>
          </Button>
          <Button type="button" className="!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700" onClick={() => setIsAddOpen(true)}>
            <span className="font-semibold">+ Add Customer</span>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <CustomerTable customers={filteredCustomers} />
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Customer">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name *</label>
            <Input value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} placeholder="Customer Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone *</label>
            <Input value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} placeholder="Phone Number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
            <Input type="email" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} placeholder="example@email.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Loyalty Points</label>
              <Input type="number" value={newCustomer.loyaltyPoints} onChange={e => setNewCustomer({...newCustomer, loyaltyPoints: Number(e.target.value)})} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Credit Balance</label>
              <Input type="number" value={newCustomer.creditBalance} onChange={e => setNewCustomer({...newCustomer, creditBalance: Number(e.target.value)})} placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCustomer}>Save Customer</Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Upload Modal */}
      <Modal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} title="Bulk Upload Customers">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload a CSV or JSON file containing your customer list to bulk import them.
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
