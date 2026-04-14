'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function SettingsManagement() {
  const [storeName, setStoreName] = useState('GroceryPOS Store');
  const [storeAddress, setStoreAddress] = useState('123, Main Street, Bangalore - 560001');
  const [storePhone, setStorePhone] = useState('+91 9876543210');
  const [storeEmail, setStoreEmail] = useState('store@grocerypos.com');
  const [gstin, setGstin] = useState('29ABCDE1234F1Z5');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-5 lg:space-y-6 pb-12">
      <div className="flex items-start justify-between gap-4 mt-2">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Settings</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Manage your application configuration</div>
        </div>
      </div>

      {/* Store Details */}
      <Card className="p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Store Details</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your store information</p>
          </div>
          <Button variant="primary" className="!bg-blue-600 !text-white text-sm" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Store Name</label>
            <Input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Store Address
            </label>
            <textarea
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone Number</label>
              <Input
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
              <Input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* GST Configuration */}
      <Card className="p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">GST Configuration</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure GST settings for billing</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">GSTIN</label>
            <Input
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">GST Rate 1 (%)</label>
              <Input value="5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">GST Rate 2 (%)</label>
              <Input value="12" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">GST Rate 3 (%)</label>
              <Input value="18" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <input type="checkbox" id="gst-enabled" className="rounded w-4 h-4 text-blue-600" defaultChecked />
            <label htmlFor="gst-enabled" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
              Enable GST calculations on all invoices
            </label>
          </div>
        </div>
      </Card>

      {/* Printer Settings */}
      <Card className="p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Printer Settings</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure receipt printer</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Printer Type
            </label>
            <select className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              <option>Thermal Printer (58mm)</option>
              <option>Thermal Printer (80mm)</option>
              <option>A4 Printer</option>
            </select>
          </div>
          <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <input type="checkbox" id="auto-print" className="rounded w-4 h-4 text-blue-600" defaultChecked />
            <label htmlFor="auto-print" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
              Auto-print invoices after payment
            </label>
          </div>
          <Button variant="secondary" className="!bg-white !text-black border-slate-300 mt-2">
            🖨️ Test Print
          </Button>
        </div>
      </Card>

      {/* User Management */}
      <Card className="p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">User Roles & Permissions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage user access levels</p>
        </div>
        
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-3 gap-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Permissions</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</span>
              </div>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              <div className="px-4 py-3">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Admin</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Full Access</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">Active</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Cashier</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">POS, Basic Reports</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">Active</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Inventory Manager</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Inventory, Suppliers</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">System Settings</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">General application settings</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Currency
            </label>
            <select className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              <option>INR - Indian Rupee (₹)</option>
              <option>USD - US Dollar ($)</option>
              <option>EUR - Euro (€)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Date Format
            </label>
            <select className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offline-mode" className="rounded w-4 h-4 text-blue-600" />
              <label htmlFor="offline-mode" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                Enable offline mode
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="notifications" className="rounded w-4 h-4 text-blue-600" defaultChecked />
              <label htmlFor="notifications" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                Enable notifications
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-backup" className="rounded w-4 h-4 text-blue-600" defaultChecked />
              <label htmlFor="auto-backup" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                Enable automatic daily backup
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
