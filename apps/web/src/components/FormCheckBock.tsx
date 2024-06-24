'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from './ui/checkbox';

interface FormSelectProps {
  name: string;
  form: any;
}

const FormCheckBox: React.FC<FormSelectProps> = ({ form, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            {/* <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            /> */}
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Set as primary address?</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckBox;
