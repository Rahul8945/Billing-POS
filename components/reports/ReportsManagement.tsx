'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ReportsManagement() {
  const [dateFrom, setDateFrom] = useState('2025-04-01');
  const [dateTo, setDateTo] = useState('2025-04-10');

  const handleExportPDF = (reportType: string) => {
    alert(`${reportType} exported as PDF!`);
  };

  const handleExportExcel = (reportType: string) => {
    alert(`${reportType} exported as Excel!`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Reports</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleString()}</div>
        </div>
      </div>

      <Card className="mb-6">
        <div className="p-4 md:p-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Select Date Range</h3>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">From Date</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">To Date</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <Button type="button" variant="primary" className="!bg-blue-600 !text-white !border-blue-600">
              Apply Filter
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {/* Sales Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Sales Report</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Sales</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹1,24,800</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Transactions</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">328</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Average Bill Value</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹380</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">Discounts Given</span>
              <span className="font-semibold text-red-600">₹3,240</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('Sales Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('Sales Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>

        {/* GST Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">GST Report</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total GST Collected</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹12,480</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">CGST (2.5%)</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹3,120</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">SGST (2.5%)</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹3,120</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">IGST</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹6,240</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('GST Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('GST Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>

        {/* Inventory Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Inventory Report</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Products</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">842</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Stock Value</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹4,56,780</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Low Stock Items</span>
              <span className="font-semibold text-red-600">12</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">Out of Stock</span>
              <span className="font-semibold text-red-600">3</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('Inventory Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('Inventory Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>

        {/* Profit & Loss Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Profit & Loss Report</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Revenue</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹1,24,800</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Cost of Goods Sold</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹89,340</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Operating Expenses</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹12,400</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t-2 border-slate-300 dark:border-slate-600">
              <span className="text-slate-900 dark:text-slate-100 font-semibold">Net Profit</span>
              <span className="text-xl font-bold text-green-600">₹23,060</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('P&L Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('P&L Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Method Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Payment Method</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Cash Payments</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹45,200 (36%)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">UPI Payments</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹58,800 (47%)</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">Card Payments</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">₹20,800 (17%)</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('Payment Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('Payment Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>

        {/* Customer Report */}
        <Card>
          <div className="p-4 md:p-6 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Customer Report</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Customers</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">156</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">New Customers</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">12</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Points Issued</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">2,860</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">Credit Outstanding</span>
              <span className="font-semibold text-amber-600">₹1,700</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                className="w-full !bg-white !text-black !border-gray-300 text-xs"
                onClick={() => handleExportPDF('Customer Report')}
              >
                📄 PDF
              </Button>
              <Button
                variant="success"
                className="w-full text-xs"
                onClick={() => handleExportExcel('Customer Report')}
              >
                📊 Excel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
