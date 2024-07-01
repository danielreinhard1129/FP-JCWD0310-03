'use client';
import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSelect from '../../../components/FormSelect';
import ItemOutletType from '../../../components/ItemOutletType';
import { ValidationSchema } from '../edit/validationSchema';

interface FormUpdateOutlet {
  outletName: string;
  outletType: string;
  addressLine: string;
  city: string;
}

interface FormUpdateOutletProps {
  isLoading: boolean;
  onSubmit: any;
  initialValues: FormUpdateOutlet;
}

const FormEditOutlet: FC<FormUpdateOutletProps> = ({
  isLoading,
  onSubmit,
  initialValues,
}) => {
  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: initialValues,
  });

  const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          name="outletName"
          type="text"
          label="Outlet Name"
          placeholder="Outlet Name"
          form={form}
        />
        <FormInput
          name="addressLine"
          type="text"
          label="Outlet Address"
          placeholder="Outlet Address"
          form={form}
        />

        <FormInput
          name="city"
          type="text"
          label="City"
          placeholder="City"
          form={form}
        />

        <FormSelect
          name="outletType"
          label="Outlet Type"
          placeholder="Select an Outlet type"
          form={form}
          item={<ItemOutletType />}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormEditOutlet;
