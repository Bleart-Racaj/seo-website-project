'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productsAPI, suppliersAPI, authAPI } from '@/lib/api';

interface Supplier {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      if (data.length > 0) {
        setSupplierId(data[0].id);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let imagePath = null;
      if (imageFile) {
        const uploadResult = await productsAPI.uploadImage(imageFile);
        imagePath = uploadResult.imagePath;
      }

      await productsAPI.create({
        name,
        description,
        price: parseFloat(price),
        supplierId,
        imagePath,
      });
      router.push('/products');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Add Product
      </h1>

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

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Price *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Supplier *
          </label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          >
            {suppliers.length === 0 ? (
              <option value="">No suppliers available</option>
            ) : (
              suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))
            )}
          </select>
          {suppliers.length === 0 && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#ef4444' }}>
              Please create a supplier first.
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Product Image (JPG, PNG, JPEG - Max 5MB)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                marginTop: '1rem',
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '0.375rem',
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={saving || suppliers.length === 0}
            style={{
              flex: 1,
              backgroundColor: saving || suppliers.length === 0 ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: saving || suppliers.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Creating...' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              flex: 1,
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

