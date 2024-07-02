'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidationSchema } from '../validationSchema';
import FormInput from '@/components/FormInput';

interface FormResetPassword {
  password: string;
}
 
interface FormResetPasswordProps {
  isLoading: boolean;
  onSubmit: any;
  initialValues: FormResetPassword;
}

const FormResetPassword: FC<FormResetPasswordProps> = ({
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
          label="Enter New Password"
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

export default FormResetPassword;
