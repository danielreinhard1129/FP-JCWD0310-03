import useAxios from '@/hooks/api/useAxios';

export default function useCreateAddressByCoord() {
  const { axiosInstance } = useAxios();

  async function createAddress(city: any, address: any) {
    const { data } = await axiosInstance.post('/user/create-address', {
      city,
      address,
    });
    console.log('ini hook create', data);
  }

  return { createAddress };
}
