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

export function FormVerification() {
  const { verification } = useVerification();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    verification(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col justify-center gap-2 mt-5"
      >
        <FormInput
          name="email"
          type="email"
          label="Email"
          placeholder="Your Email"
          form={form}
        />
        <FormInput
          name="fullName"
          type="fullName"
          label="FullName"
          placeholder="Full Name"
          form={form}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your Password"
          form={form}
        />
        {/* <FormInput
          name="email"
          type="email"
          label="Email"
          placeholder="Your Email"
          form={form}
        /> */}

        <Button type="submit" className="bg-mythemes-maingreen">
          Submit
        </Button>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div>Google</div>
      </form>
    </Form>
  );
}
