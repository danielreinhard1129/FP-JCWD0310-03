'use client';

import FormInputDisable from '@/components/FormInputDisable';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '../../../../../components/FormInput';
import { ValidationSchema } from '../validationSchema';
import { Role } from '@/types/user.type';

interface FormEditUser {
  fullName: string;
  email: string;
  password: string;
  profilePic: File[];
}

interface FormEditUserProps {
  isLoading: boolean;
  onSubmit: any;
  initialValues: Partial<FormEditUser>;
}

const FormEditUser: FC<FormEditUserProps> = ({
  isLoading,
  onSubmit,
  initialValues,
}) => {
  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: initialValues,
  });
 
  const { profilePic, role } = useAppSelector((state) => state.user);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="Your Full Name"
          form={form}
        />
        {profilePic && profilePic.includes('googleusercontent.com') ? (
          <FormInputDisable
            name="email"
            type="email"
            label="Email"
            placeholder="Your Email"
            form={form}
          />
        ) : (
          (role!==Role.CUSTOMER?(
            <FormInputDisable
            name="email"
            type="email"
            label="Email"
            placeholder="Your Email"
            form={form}
          />
          ):(
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="Your Email"
              form={form}
            />
          ))
        )}

        <div className="flex">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-mythemes-secondaryblue ml-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEditUser;
