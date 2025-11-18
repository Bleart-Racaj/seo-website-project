'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth, isAuthenticated } from '@/lib/api';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, [pathname]);

  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem('userId');
    setAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link href="/" style={{ marginRight: '15px', fontWeight: 'bold' }}>Home</Link>
        {authenticated ? (
          <>
            <Link href="/suppliers" style={{ marginRight: '15px' }}>Suppliers</Link>
            <Link href="/products" style={{ marginRight: '15px' }}>Products</Link>
          </>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '15px' }}>Login</Link>
            <Link href="/register" style={{ marginRight: '15px' }}>Register</Link>
          </>
        )}
      </div>
      {authenticated && (
        <button
          onClick={handleLogout}
          style={{
            padding: '5px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

