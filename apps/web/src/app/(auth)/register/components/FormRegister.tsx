/* eslint-disable react/no-unescaped-entities */
'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '@/components/FormInput';
import Link from 'next/link';
import { ValidationSchema } from '../validationSchema';
import useRegister from '@/hooks/api/auth/useRegister';
import { Separator } from '@radix-ui/react-separator';

export function FormRegister() {
  const { register } = useRegister();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    register(values);
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
