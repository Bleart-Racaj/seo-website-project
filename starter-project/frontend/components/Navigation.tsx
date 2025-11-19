'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = authAPI.isAuthenticated();

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav style={{
      backgroundColor: '#1f2937',
      padding: '1rem 2rem',
      marginBottom: '2rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            Inventory Portal
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link
              href="/products"
              style={{
                color: pathname === '/products' ? '#60a5fa' : '#d1d5db',
                textDecoration: 'none',
                fontWeight: pathname === '/products' ? '600' : '400',
              }}
            >
              Products
            </Link>
            <Link
              href="/suppliers"
              style={{
                color: pathname === '/suppliers' ? '#60a5fa' : '#d1d5db',
                textDecoration: 'none',
                fontWeight: pathname === '/suppliers' ? '600' : '400',
              }}
            >
              Suppliers
            </Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

