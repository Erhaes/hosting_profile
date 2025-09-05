import { useState, useEffect } from 'react';
import facilitiesData from '@/data/facilities';
import apiClient from '@/services/apiClient';

export function useFacilities() {
  const [facilities, setFacilities] = useState(facilitiesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/labs');
        setFacilities(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch facilities:', err);
        setError('Gagal memuat data fasilitas');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return { facilities, loading, error };
}