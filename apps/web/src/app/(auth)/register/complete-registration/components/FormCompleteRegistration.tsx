'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useCompleteRegistration from '@/hooks/api/auth/useCompleteRegistration';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';

import FormInput from '@/components/FormInput';
import { ValidationSchema } from '../validationSchema';
import FormInputDisable from '@/components/FormInputDisable';

interface FormCompleteRegistration {
  email: string;
}

interface FormCompleteRegistrationProps {
  initialValues: FormCompleteRegistration;
}

export const CompleteRegistrationForm: FC<FormCompleteRegistrationProps> = ({
  initialValues,
}) => {
  const { completeRegistration } = useCompleteRegistration();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof schema>) {
    completeRegistration(values);
  }
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
        <FormInputDisable
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
