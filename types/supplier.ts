export interface Supplier {
  id: number;
  name: string;
  phone: string;
  email?: string;
  gstin?: string;
  totalOrders: number;
  outstandingAmount: number;
}
