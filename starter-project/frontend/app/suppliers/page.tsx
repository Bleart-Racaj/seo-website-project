'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { suppliersAPI, authAPI } from '@/lib/api';
import Link from 'next/link';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function SuppliersPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadSuppliers();
  }, [router]);

  const loadSuppliers = async () => {
    try {
      const data = await suppliersAPI.getAll();
      setSuppliers(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;

    try {
      await suppliersAPI.delete(id);
      loadSuppliers();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete supplier');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading suppliers...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Suppliers</h1>
        <Link
          href="/suppliers/add"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Add Supplier
        </Link>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '0.375rem',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      {suppliers.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
        }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>No suppliers found.</p>
          <Link
            href="/suppliers/add"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Add your first supplier
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {supplier.name}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                📧 {supplier.email}
              </p>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                📞 {supplier.phone}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  href={`/suppliers/${supplier.id}/edit`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  style={{
                    flex: 1,
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

