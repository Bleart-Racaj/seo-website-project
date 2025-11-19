'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsAPI, suppliersAPI, authAPI } from '@/lib/api';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string | null;
  supplier: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadProducts();
      return;
    }

    try {
      const data = await productsAPI.search(query);
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Search failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(id);
      loadProducts();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Products</h1>
        <Link
          href="/products/add"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Add Product
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search products by name or description..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
          }}
        />
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

      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
        }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            {searchQuery ? 'No products found matching your search.' : 'No products found.'}
          </p>
          {!searchQuery && (
            <Link
              href="/products/add"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Add your first product
            </Link>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
              }}
            >
              {product.imagePath && (
                <img
                  src={`http://localhost:3001${product.imagePath}`}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem',
                  }}
                />
              )}
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {product.name}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                {product.description}
              </p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                ${product.price.toFixed(2)}
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Supplier: {product.supplier.name}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  href={`/products/${product.id}/edit`}
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
                  onClick={() => handleDelete(product.id)}
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

