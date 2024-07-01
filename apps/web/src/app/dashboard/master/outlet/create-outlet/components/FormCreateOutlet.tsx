'use client';
// import CardMap from '@/components/CardMap';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useCreateOutlet from '@/hooks/api/outlet/useCreateOutlet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSelect from '../../../components/FormSelect';
import ItemOutletType from '../../../components/ItemOutletType';
import { ValidationSchema } from '../validationSchema';
import dynamic from 'next/dynamic';
const CardMap = dynamic(() => import('@/components/CardMap'), { ssr: false });


const FormCreateOutlet = () => {
  const { createOutlet } = useCreateOutlet();
  const [locationData, setLocationData] = useState({
    addressLine: '',
    city: '',
    latitude: '',
    longitude: '',
  });

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: 'all',
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      addressLine: locationData.addressLine,
      city: locationData.city,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    },
  });

  const onLocationSelect = (location: any) => {
    setLocationData(location);
    form.setValue('addressLine', location.addressLine);
    form.setValue('city', location.city);
    form.setValue('latitude', String(location.latitude));
    form.setValue('longitude', String(location.longitude));
  };

  function onSubmit(values: z.infer<typeof ValidationSchema>) {
    createOutlet(values);
  }

  const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="w-full flex flex-col gap-3">
            <FormInput
              name="outletName"
              type="text"
              label="Outlet Name"
              placeholder="Outlet Name"
              form={form}
            />
            <FormSelect
              name="outletType"
              label="Outlet Type"
              placeholder="Select an Outlet type"
              form={form}
              item={<ItemOutletType />}
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
          </div>
          <div className="flex flex-col gap-3">
            <FormInput
              name="latitude"
              type="text"
              label="Latitude"
              placeholder="Latitude"
              form={form}
            />

            <FormInput
              name="longitude"
              type="text"
              label="longitude"
              placeholder="longitude"
              form={form}
            />
            <CardMap onLocationSelect={onLocationSelect} />
          </div>
        </div>
 
        <Button
          type="submit"
          className="bg-white outline outline-teal-800 text-mythemes-maingreen font-bold hover:bg-mythemes-maingreen hover:text-white"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormCreateOutlet;
