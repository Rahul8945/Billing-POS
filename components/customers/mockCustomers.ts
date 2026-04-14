import { Customer } from '@/types/customer';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh@example.com',
    loyaltyPoints: 450,
    creditBalance: 0,
    totalPurchases: 25600
  },
  {
    id: 2,
    name: 'Priya Sharma',
    phone: '9876543211',
    email: 'priya@example.com',
    loyaltyPoints: 1200,
    creditBalance: 500,
    totalPurchases: 48900
  },
  {
    id: 3,
    name: 'Amit Patel',
    phone: '9876543212',
    loyaltyPoints: 320,
    creditBalance: 0,
    totalPurchases: 18700
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    phone: '9876543213',
    email: 'sneha@example.com',
    loyaltyPoints: 890,
    creditBalance: 1200,
    totalPurchases: 36500
  }
];
