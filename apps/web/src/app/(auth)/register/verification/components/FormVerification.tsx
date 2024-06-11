/* eslint-disable react/no-unescaped-entities */
'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useVerification from '@/hooks/api/auth/useVerification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidationSchema } from '../validationSchema';
import { useSearchParams } from 'next/navigation';
import { User } from '@/types/user.type';
import { data } from 'cypress/types/jquery';

interface VerificationArgs extends Pick<User, 'password'> {}

interface VerificationToken extends Pick<User, 'password'> {
  token: string | null;
}
export function FormVerification() {
  const searchParams = useSearchParams();
  let tokenParams = searchParams.get('token');
  const { verification } = useVerification();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: VerificationToken) {
  
    verification(values);
    console.log(values);
  }

  const handleSubmit = (data: VerificationArgs) => {
    const finalData = {
      password: data.password,
      token: tokenParams,
    };
    onSubmit(finalData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 flex flex-col justify-center gap-2 mt-5"
      >
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your Password"
          form={form}
        />
        <Button type="submit" className="bg-mythemes-maingreen">
          Submit
        </Button>
      </form>
    </Form>
  );
}
