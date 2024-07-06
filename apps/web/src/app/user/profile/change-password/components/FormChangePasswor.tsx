'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '../../../../../components/FormInput';
import { ValidationSchema } from '../validationSchema';

interface FormEditUser {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface FormEditUserProps {
  isLoading: boolean;
  onSubmit: any;
  initialValues: FormEditUser;
}

const FormChangePassword: FC<FormEditUserProps> = ({
  isLoading,
  onSubmit,
  initialValues,
}) => {
  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          name="password"
          type="password"
          label="Old Password"
          placeholder="Your old Password"
          form={form}
        />
        <FormInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="Your New Password"
          form={form}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          form={form}
        />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormChangePassword;
