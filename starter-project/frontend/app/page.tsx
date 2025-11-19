'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = authAPI.isAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <main style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Inventory Portal
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '3rem' }}>
        Manage your products and suppliers with ease
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <Link
          href="/login"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
          }}
        >
          Login
        </Link>
        <Link
          href="/register"
          style={{
            backgroundColor: 'white',
            color: '#3b82f6',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            border: '2px solid #3b82f6',
          }}
        >
          Register
        </Link>
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        textAlign: 'left',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Features
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ Product Management</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Supplier Management</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Image Uploads</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Product Search</li>
        </ul>
      </div>
    </main>
  );
}

