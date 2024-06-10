/* eslint-disable react/no-unescaped-entities */
'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/FormInput';
import useLogin from '@/hooks/api/auth/useLogin';
import { ValidationSchema } from '../validationSchema';
import Link from 'next/link';

export function FromLogin() {
  const { login } = useLogin();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    login(values);
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
          name="password"
          type="password"
          label="Password"
          placeholder="Entry Password"
          form={form}
        />

        <Button type="submit" className="bg-mythemes-maingreen">
          Submit
        </Button>
        {/* <div className=''> */}
        <Link
          href={'http://localhost:3000/forgot-password'}
          className="hover:underline hover:text-mythemes-maingreen ml-auto font-light"
        >
          Forgot password?
        </Link>
        {/* </div> */}

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div>Google</div>
        <div className="mx-auto font-light">
          Don't have account?{' '}
          <Link
            href={'http://localhost:3000/register'}
            className="text-main_green hover:underline  hover:text-mythemes-secondarygreen"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
