'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'Cashier' | 'Admin';

const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'password';

const STORAGE_KEYS = {
  remember: 'grocerypos_remember',
  role: 'grocerypos_role',
  user: 'grocerypos_user',
} as const;

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('Cashier');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;

      setError('');
      setIsSubmitting(true);

      try {
        await new Promise((r) => setTimeout(r, 350));

        const u = username.trim();
        const p = password;

        if (!u || !p) {
          setError('Please enter username and password.');
          return;
        }

        if (u !== DEMO_USERNAME || p !== DEMO_PASSWORD) {
          setError('Invalid username or password.');
          return;
        }

        if (remember) {
          try {
            localStorage.setItem(STORAGE_KEYS.remember, '1');
            localStorage.setItem(STORAGE_KEYS.role, role);
            localStorage.setItem(STORAGE_KEYS.user, u);
          } catch {
            // ignore
          }
        }

        router.push('/dashboard');
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, password, remember, role, router, username]
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-sky-50 via-white to-sky-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">🛒</span>
          </div>
          <div className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">GroceryPOS</div>
          <div className="mt-1 text-sm text-gray-500">Point of Sale System</div>
        </div>

        <div className="mt-6 rounded-2xl bg-white/90 backdrop-blur border border-white shadow-xl">
          <div className="px-6 pt-6">
            <div className="text-center text-xl font-semibold text-gray-900">Login to Your Account</div>
          </div>

          <form onSubmit={onSubmit} className="px-6 pb-6 pt-4">
            <div className="text-xs font-medium text-gray-600">Select Role</div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('Cashier')}
                className={`h-9 rounded-lg border text-sm font-medium transition ${
                  role === 'Cashier'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cashier
              </button>
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={`h-9 rounded-lg border text-sm font-medium transition ${
                  role === 'Admin'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300"
                />
                Remember me
              </label>
              <Link href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error ? (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-11 w-full rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              Demo Credentials: {DEMO_USERNAME} / {DEMO_PASSWORD}
            </div>
            <div className="mt-1 text-center text-xs text-gray-400">© 2025 GroceryPOS. All rights reserved.</div>
          </form>
        </div>
      </div>
    </div>
  );
}
