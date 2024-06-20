'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';


interface FormSelectProps {
    name: string;
    label: string;
    item: any;
    placeholder: string;
    form: any;
}


const FormSelectDisable: React.FC<FormSelectProps> = ({
    name,
    label,
    item,
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
                    <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        {item}
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export default FormSelectDisable;