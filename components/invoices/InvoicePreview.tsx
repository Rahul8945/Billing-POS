'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

export default function InvoicePreview() {
  const [format, setFormat] = useState<'a4' | 'thermal'>('a4');

  const handlePrint = () => {
    window.print();
    alert('Invoice print dialog opened!');
  };

  const handleDownload = () => {
    alert('Invoice downloaded as PDF!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6 mt-2">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Invoice Preview</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Review and print invoice details</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 no-print gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${format === 'a4' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setFormat('a4')}
          >
            A4 Standard
          </button>
          <button 
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${format === 'thermal' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setFormat('thermal')}
          >
            Thermal (80mm)
          </button>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="secondary"
            className="!bg-white !text-black border-gray-300"
            onClick={handleDownload}
          >
            <span className="font-semibold">📥 Download PDF</span>
          </Button>
          <Button
            variant="primary"
            className="!bg-blue-600 !text-white border-blue-600"
            onClick={handlePrint}
          >
            <span className="font-semibold">🖨️ Print Invoice</span>
          </Button>
        </div>
      </div>

      {/* Invoice */}
      {format === 'a4' ? (
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-8 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b-2 border-gray-800 dark:border-slate-600 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-gray-900 dark:text-slate-100 text-xl font-bold mb-2">GroceryPOS Store</h1>
              <p className="text-sm text-gray-600 dark:text-slate-400">123, Main Street</p>
              <p className="text-sm text-gray-600 dark:text-slate-400">Bangalore - 560001</p>
              <p className="text-sm text-gray-600 dark:text-slate-400">Phone: +91 9876543210</p>
              <p className="text-sm text-gray-600 dark:text-slate-400">Email: store@grocerypos.com</p>
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
                <span className="font-medium text-gray-900 dark:text-slate-200">GSTIN:</span> 29ABCDE1234F1Z5
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-gray-900 dark:text-slate-100 text-xl font-bold mb-2">TAX INVOICE</h2>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Invoice No: <span className="font-medium text-gray-900 dark:text-slate-200">INV-001234</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Date: <span className="font-medium text-gray-900 dark:text-slate-200">10 Apr 2025</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Time: <span className="font-medium text-gray-900 dark:text-slate-200">14:35:20</span>
              </p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-2">Bill To:</h4>
          <p className="text-sm text-gray-600 dark:text-slate-400">Rajesh Kumar</p>
          <p className="text-sm text-gray-600 dark:text-slate-400">Phone: +91 9876543210</p>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full mb-6">
            <thead className="bg-gray-100 dark:bg-slate-800 border-y-2 border-gray-800 dark:border-slate-600">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">SNo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Item Description</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-slate-100">HSN</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-slate-100">Qty</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-slate-100">Rate</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-slate-100">GST%</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-slate-100">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">1</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">Tata Salt (1 kg)</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">2501</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">2</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹20.00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">5%</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹42.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">2</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">Amul Milk (1 ltr)</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">0401</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">3</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹56.00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">5%</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹176.40</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">3</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">Fortune Oil (1 ltr)</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">1507</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-center">2</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹180.00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">12%</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300 text-right">₹403.20</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-80 space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 pb-2">
              <span>Subtotal:</span>
              <span>₹568.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400">
              <span>CGST:</span>
              <span>₹21.25</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 pb-2 border-b border-gray-300 dark:border-slate-700">
              <span>SGST:</span>
              <span>₹21.25</span>
            </div>
            <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-500">
              <span>Discount:</span>
              <span>- ₹20.00</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t-2 border-gray-800 dark:border-slate-600">
              <span className="font-semibold text-gray-900 dark:text-slate-100">Total Amount:</span>
              <span className="text-xl font-bold text-gray-900 dark:text-slate-100">₹590.50</span>
            </div>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
          <h4 className="text-gray-900 dark:text-slate-100 font-semibold mb-3">GST Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-300 dark:border-slate-700">
                <tr>
                  <th className="text-left py-2 text-gray-700 dark:text-slate-300">GST %</th>
                  <th className="text-right py-2 text-gray-700 dark:text-slate-300">Taxable Amount</th>
                  <th className="text-right py-2 text-gray-700 dark:text-slate-300">CGST</th>
                  <th className="text-right py-2 text-gray-700 dark:text-slate-300">SGST</th>
                  <th className="text-right py-2 text-gray-700 dark:text-slate-300">Total Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-slate-800">
                  <td className="py-2 text-gray-900 dark:text-slate-300">5%</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹208.00</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹5.20</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹5.20</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹10.40</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-900 dark:text-slate-300">12%</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹360.00</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹21.60</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹21.60</td>
                  <td className="text-right py-2 text-gray-900 dark:text-slate-300">₹43.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            <span className="font-medium text-gray-900 dark:text-slate-200">Payment Method:</span> UPI
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-400 flex items-center gap-1 mt-1">
            <span className="font-medium text-gray-900 dark:text-slate-200">Payment Status:</span>
            <span className="text-emerald-600 dark:text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Paid</span>
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 dark:border-slate-700 pt-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="w-32 h-32 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-2 border border-gray-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">UPI QR Code</span>
              </div>
              <p className="text-xs text-slate-500">Scan to Pay</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">Authorized Signature</p>
              <div className="border-t border-gray-400 dark:border-slate-500 w-40"></div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="border-t border-gray-300 dark:border-slate-700 mt-6 pt-6">
          <p className="text-xs text-slate-500 text-center">
            Thank you for shopping with us! For any queries, contact us at store@grocerypos.com
          </p>
          <p className="text-xs text-slate-500 text-center mt-1">
            This is a computer-generated invoice and does not require a signature.
          </p>
        </div>
      </div>
      ) : (
      <div className="bg-white text-black p-4 w-[300px] mx-auto font-mono text-xs shadow-md border border-gray-200 print:shadow-none print:border-none print:m-0">
        <div className="text-center mb-4 border-b border-dashed border-gray-400 pb-2">
          <h2 className="font-bold text-base uppercase">GroceryPOS Store</h2>
          <p>123, Main Street, Blr</p>
          <p>Ph: +91 9876543210</p>
          <p>GSTIN: 29ABCDE1234F1Z5</p>
        </div>
        
        <div className="mb-2">
          <p>Date: 10 Apr 2025  14:35</p>
          <p>Bill: INV-001234</p>
          <p>Cust: Rajesh Kumar</p>
        </div>
        
        <div className="border-t border-b border-dashed border-gray-400 py-2 mb-2">
          <div className="flex justify-between font-bold mb-1">
            <span>Item</span>
            <span>Amt</span>
          </div>
          <div className="flex justify-between">
            <span>1. Tata Salt (1 kg) x2</span>
            <span>42.00</span>
          </div>
          <div className="flex justify-between">
            <span>2. Amul Milk (1 l) x3</span>
            <span>176.40</span>
          </div>
          <div className="flex justify-between">
            <span>3. Fortune Oil (1 l) x2</span>
            <span>403.20</span>
          </div>
        </div>
        
        <div className="mb-2 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>568.00</span>
          </div>
          <div className="flex justify-between">
            <span>CGST+SGST (5%-12%):</span>
            <span>42.50</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Discount:</span>
            <span>-20.00</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-400 pt-2 mb-4 font-bold text-sm flex justify-between">
          <span>TOTAL</span>
          <span>₹590.50</span>
        </div>
        
        <div className="text-center border-t border-dashed border-gray-400 pt-2">
          <p className="uppercase">Paid via UPI</p>
          <p className="mt-2">*** Thank You, Visit Again! ***</p>
        </div>
      </div>
      )}
    </div>
  );
}
