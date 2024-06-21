'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidationSchema } from '../validationSchema';
import useCreateOutlet from '@/hooks/api/outlet/useCreateOutlet';
import FormSelect from '../../../components/FormSelect';
import ItemOutletType from '../../../components/ItemOutletType';
import Dropzone from '@/components/Dropzone';
import PreviewImages from '@/components/PreviewImages';

const FormCreateOutlet = () => {
  const { createOutlet } = useCreateOutlet();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: { outletImage: [] },
  });
  function onSubmit(values: z.infer<typeof ValidationSchema>) {
    createOutlet(values);
  }

  const handleRemoveImage = (index: number) => {
    const currentOutletImage = form.getValues('outletImage') || [];
    const updatedOutletImage = currentOutletImage.toSpliced(index, 1);
    form.setValue('outletImage', updatedOutletImage, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
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
        <Dropzone
          label="Outlet Image"
          // onDrop={(files) => form.setValue('outletImage', files)}
          onDrop={(files) => {
            const currentThumbnails = form.getValues('outletImage' || []);
            form.setValue('outletImage', [...currentThumbnails, ...files], {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          isError={Boolean(errors.outletImage)}
        />

        <Controller
          name="outletImage"
          control={form.control}
          render={({ field }) => (
            <PreviewImages
              fileImages={field.value}
              onRemoveImage={handleRemoveImage}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormCreateOutlet;