'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useCompleteRegistration from '@/hooks/api/auth/useCompleteRegistration';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/FormInput';
import FormInputDisable from '@/components/FormInputDisable';
import PreviewImages from '@/components/PreviewImages';
import { ValidationSchema } from '../validationSchema';
import Dropzone from '@/components/Dropzone';
import { Loader2 } from 'lucide-react';

interface FormCompleteRegistration {
  email: string;
}

interface FormCompleteRegistrationProps {
  initialValues: FormCompleteRegistration;
}

export const CompleteRegistrationForm: FC<FormCompleteRegistrationProps> = ({
  initialValues,
}) => {
  const { completeRegistration, isLoading } = useCompleteRegistration();
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 mt-9 h-[480px] flex flex-col"
      >
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

        <Button
          type="submit"
          className="bg-mythemes-maingreen"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className=" animate-spin" /> : 'Submit'}
          {isLoading ?? 'Success !'}
        </Button>
      </form>
    </Form>
  );
};
