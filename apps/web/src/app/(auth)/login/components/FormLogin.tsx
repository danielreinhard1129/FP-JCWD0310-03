/* eslint-disable react/no-unescaped-entities */
'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useLogin from '@/hooks/api/auth/useLogin';
import useLoginByGoogle from '@/hooks/api/auth/useLoginByGoogle';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { ValidationSchema } from '../validationSchema';
import { Loader2 } from 'lucide-react';

export function FromLogin() {
  const { googleLogin } = useLoginByGoogle();
  const { login, isLoading } = useLogin();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    login(values);
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

        {/* <Button type="submit" className="bg-mythemes-maingreen">
          Submit
        </Button> */}
        <Button
          type="submit"
          className="bg-mythemes-maingreen"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : 'Submit'}
          {isLoading ?? 'Login Success !'}
        </Button>

        <Link
          href={`/forgot-password`}
          className="hover:underline hover:text-mythemes-maingreen ml-auto font-light"
        >
          Forgot password?
        </Link>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div>
          <Button
            onClick={() => googleLogin()}
            className="w-full bg-mythemes-grey flex gap-1 text-black hover:text-white"
          >
            <FcGoogle size={25} /> Sign in with your Google account.
          </Button>
        </div>
        <div className="mx-auto font-light">
          Don't have an account?{' '}
          <Link
            href={`/register`}
            className="text-mythemes-maingreen hover:underline font-bold hover:text-mythemes-secondaryblue"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
