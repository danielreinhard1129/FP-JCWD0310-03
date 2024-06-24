// import useAxios from '@/hooks/api/useAxios';
// import { useEffect, useState } from 'react';

// interface test {
//   results: {
//     components: any;
//   }[];
// }

// export default function useGetLocationByCoord() {
//   const [data, setData] = useState<test>({
//     results: [],
//   });
//   const { axiosInstance } = useAxios();

//   async function getLocation(latitude: any, longitude: any) {
//     const { data } = await axiosInstance.get(
//       `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=dcf8f780a1ff4552bd9e345869f75e5e`,
//     );
//     console.log('ini hook', data);
//     setData(data.data);
//     return;
//   }

//   return { getLocation, data };
// }

'use client';
import useAxios from '@/hooks/api/useAxios';
import { useState } from 'react';

interface Component {
  // Tambahkan properti yang relevan dari komponen OpenCage
  // Sebagai contoh:
  county: string;
  country: string;
  // dan lain-lain...
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
  // useEffect(() => {
  //   getLocation();
  // }, [lat, lng]);

  return { getLocation, data, isLoading };
}

// // ini mantap
// 'use client';
// import useAxios from '@/hooks/api/useAxios';
// import { useEffect, useState } from 'react';

// interface Component {
//   // Tambahkan properti yang relevan dari komponen OpenCage
//   city: string;
//   country: string;
//   // dan lain-lain...
// }

// interface OpenCageResult {
//   formatted: string;
// }

// interface OpenCageData {
//   results: OpenCageResult[];
// }

// interface Coord {
//   latitude: number;
//   longitude: number;
// }

// export default function useGetLocationByCoord(lat: number, lng: number) {
//   const [data, setData] = useState<OpenCageData | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const { axiosInstance } = useAxios();

//   async function getLocation() {
//     try {
//       const response = await axiosInstance.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=dcf8f780a1ff4552bd9e345869f75e5e`,
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error('Failed to fetch location data:', error);
//       setData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (lat !== null && lng !== null) {
//       const handler = setTimeout(() => {
//         getLocation();
//       }, 300); // Delay untuk debounce

//       return () => clearTimeout(handler); // Clean-up function untuk debounce
//     }
//   }, [lat, lng]);

//   return { getLocation, data, isLoading };
// }
