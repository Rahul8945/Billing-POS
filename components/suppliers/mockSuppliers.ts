import { Supplier } from '@/types/supplier';

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: 'HUL Distributors',
    phone: '9123456780',
    email: 'hul@example.com',
    gstin: '29ABCDE1234F1Z5',
    totalOrders: 145,
    outstandingAmount: 45000
  },
  {
    id: 2,
    name: 'Tata Consumer Products',
    phone: '9123456781',
    email: 'tata@example.com',
    gstin: '27ABCDE1234F1Z5',
    totalOrders: 98,
    outstandingAmount: 0
  },
  {
    id: 3,
    name: 'ITC Foods',
    phone: '9123456782',
    email: 'itc@example.com',
    gstin: '19ABCDE1234F1Z5',
    totalOrders: 76,
    outstandingAmount: 28000
  }
];
