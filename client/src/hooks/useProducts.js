import { useState, useEffect } from 'react';

const API_BASE = '/api';

export default function useProducts({ category = 'All', search = '' } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (category && category !== 'All') params.append('category', category);
        if (search) params.append('search', search);

        const query = params.toString();
        const response = await fetch(`${API_BASE}/products${query ? `?${query}` : ''}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 250);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [category, search]);

  return { products, loading, error };
}