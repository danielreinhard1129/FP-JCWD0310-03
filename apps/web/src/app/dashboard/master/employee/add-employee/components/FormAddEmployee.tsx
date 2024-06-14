'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useAddEmployee from '@/hooks/api/employee/useAddEmployee';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ValidationSchemaDriver,
  ValidationSchemaOutletAdmin,
  ValidationSchemaSuperAdmin,
  ValidationSchemaWorker,
} from '../validationSchema';
import FormInput from '../../../../../../components/FormInput';
import FormSelect from '../../../components/FormSelect';
import FormSelectRole from '../../../components/FormSelectRole';
import ItemOutlet from '../../../components/ItemOutlet';
import ItemRole from '../../../components/ItemRole';
import ItemStation from '../../../components/ItemStation';
import ItemWorkShift from '../../../components/ItemWorkShift';

export function AddEmployeeForm() {
  const { addEmployee } = useAddEmployee();
  const [selected, setSelected] = useState<string>('');
  const [schema, setSchema] = useState(ValidationSchemaSuperAdmin);

  const form = useForm<z.infer<typeof ValidationSchemaWorker>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    addEmployee(values);
    console.log(values);
  }

  useEffect(() => {
    if (selected == 'SUPER_ADMIN') {
      setSchema(ValidationSchemaSuperAdmin);
    } else if (selected == 'OUTLET_ADMIN') {
      setSchema(ValidationSchemaOutletAdmin);
    } else if (selected == 'WORKER') {
      setSchema(ValidationSchemaWorker);
    } else if (selected == 'DRIVER') {
      setSchema(ValidationSchemaDriver);
    }
  }, [selected]);

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
        <FormSelectRole
          name="role"
          label="Role"
          placeholder="Select a Role"
          form={form}
          setSelected={setSelected}
          item={<ItemRole />}
        />

        {selected == 'OUTLET_ADMIN' ? (
          <>
            <FormSelect
              name="outletId"
              label="Outlet"
              placeholder="Select an Outlet"
              form={form}
              item={<ItemOutlet />}
            />
            <FormSelect
              name="workShift"
              label="Work Shift"
              placeholder="Select a Work Shift"
              form={form}
              item={<ItemWorkShift />}
            />
          </>
        ) : (
          <div></div>
        )}

        {selected == 'WORKER' ? (
          <>
            <FormSelect
              name="outletId"
              label="Outlet"
              placeholder="Select an Outlet"
              form={form}
              item={<ItemOutlet />}
            />
            <FormSelect
              name="workShift"
              label="Work Shift"
              placeholder="Select a Work Shift"
              form={form}
              item={<ItemWorkShift />}
            />
            <FormSelect
              name="station"
              label="Station"
              placeholder="Select a Station"
              form={form}
              item={<ItemStation />}
            />
          </>
        ) : (
          <div></div>
        )}

        {selected == 'DRIVER' ? (
          <>
            <FormSelect
              name="outletId"
              label="Outlet"
              placeholder="Select an Outlet"
              form={form}
              item={<ItemOutlet />}
            />
          </>
        ) : (
          <div></div>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
