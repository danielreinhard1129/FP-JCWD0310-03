'use client';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FormChangePassword from './components/FormChangePasswor';

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
          <h1 className="font-extrabold mx-auto">Change Password</h1>
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

export default CustomerAuthGuard(ChangePassword);
