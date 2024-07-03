'use client';
import AuthGuard from '@/hoc/AuthGuard';
import useGetUser from '@/hooks/api/user/useGetUser';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import { getChangedValues } from '@/utils/getChangeValues';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FormChangePassword from './components/FormChangePasswor';
import { useAppSelector } from '@/redux/hooks';

interface IFormEditUser {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassword = () => {
  const { updateUser, isLoading } = useUpdateUser();

  const router = useRouter();

  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: Partial<IFormEditUser>) => {
    updateUser({ password: values.password, newPassword: values.newPassword });
  };

  return (
    <main className="container p-0 pt-[32px] bg-[#ffff]">
      <div className="container flex flex-col gap-4">
        <div className="flex relative">
          <ChevronLeft className="absolute" onClick={() => router.back()} />
          <h1 className="font-extrabold mx-auto">Edit profile</h1>
        </div>

        <div className="w-full flex flex-col gap-4">
          <FormChangePassword
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default AuthGuard(ChangePassword);
