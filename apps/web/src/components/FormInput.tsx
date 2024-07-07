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
    min?: number
}


const FormInput: React.FC<FormInputProps> = ({
    name,
    label,
    type = 'text',
    placeholder,
    form,
    min,

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
                            type={type}
                            placeholder={placeholder}
                            className=''
                            min={min}
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export default FormInput;