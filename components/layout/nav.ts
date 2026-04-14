export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '▦' },
  { label: 'POS Billing', href: '/pos', icon: '🧾' },
  { label: 'Inventory', href: '/inventory', icon: '📦' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Suppliers', href: '/suppliers', icon: '🚚' },
  { label: 'Reports', href: '/reports', icon: '📊' },
  { label: 'Invoices', href: '/invoices', icon: '📄' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];
