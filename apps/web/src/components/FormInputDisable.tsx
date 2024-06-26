'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';


interface FormInputProps {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    form: any;
}


const FormInputDisable: React.FC<FormInputProps> = ({
    name,
    label,
    type = 'text',
    placeholder,
    form,

}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            disabled
                            type={type}
                            placeholder={placeholder}
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export default FormInputDisable;