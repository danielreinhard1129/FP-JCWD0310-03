import useForgotPassword from '@/hooks/api/auth/useForgotPassword';
import React, { useState } from 'react';
import { ValidationSchema } from '../validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const FormForgotPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    forgotPassword(values);
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

        <Button
          type="submit"
          className="bg-mythemes-maingreen"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : 'submit'}
          {isLoading ?? 'Email sent'}
        </Button>
      </form>
      <div className="mx-auto font-light">
        Already have an account?{' '}
        <Link
          href={`/login`}
          className="text-mythemes-maingreen hover:underline font-bold hover:text-mythemes-secondarygreen"
        >
          Login
        </Link>
      </div>
    </Form>
  );
};

export default FormForgotPassword;
