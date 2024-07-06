import useAxios from '@/hooks/api/useAxios';
import { Address } from '@/types/address.type';

export default function useCreateAddressByCoord(id: number) {
  const { axiosInstance } = useAxios();

  async function createAddress(payload: Partial<Address>) {
    const { data } = await axiosInstance.patch(`/user/profile/${id}`, {
      payload,
    });
  }

  return { createAddress };
}
