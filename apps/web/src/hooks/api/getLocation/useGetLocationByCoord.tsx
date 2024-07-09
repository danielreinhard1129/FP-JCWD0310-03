'use client';
import useAxios from '@/hooks/api/useAxios';
import { useState } from 'react';

interface Component {
  county: string;
  country: string;
}

interface OpenCageResult {
  formatted: string;
  components: Component;
}

interface OpenCageData {
  results: OpenCageResult[];
}

export default function useGetLocationByCoord() {
  const [data, setData] = useState<OpenCageData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { axiosInstance } = useAxios();

  async function getLocation(lat: number, lng: number) {
    try {
      const response = await axiosInstance.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=dcf8f780a1ff4552bd9e345869f75e5e`,
      );
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }

  return { getLocation, data, isLoading };
}
