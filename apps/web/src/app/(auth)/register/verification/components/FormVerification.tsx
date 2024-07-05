/* eslint-disable react/no-unescaped-entities */
'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useVerification from '@/hooks/api/auth/useVerification';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidationSchema } from '../validationSchema';
import { useSearchParams } from 'next/navigation';
import { User } from '@/types/user.type';
import { data } from 'cypress/types/jquery';
import { Loader2 } from 'lucide-react';
interface VerificationToken {
  password: string | null;
  // token: string | null;
}
const FormVerification = () => {
  const searchParams = useSearchParams();
  let tokenParams = searchParams.get('token');
  const { verification, isLoading } = useVerification();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: {},
  });

  function onSubmit(values: VerificationToken) {
    const payload = {
      password: values.password,
      token: tokenParams,
    };
    verification(payload);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col justify-center gap-2 mt-5"
      >
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your Password"
          form={form}
        />
        <Button
          type="submit"
          className="bg-mythemes-maingreen"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : 'Verify'}
          {isLoading ?? 'Success !'}
        </Button>
      </form>
    </Form>
  );
};
export default FormVerification;
