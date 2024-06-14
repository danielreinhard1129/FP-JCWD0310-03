'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';


interface FormSelectRoleProps {
    name: string;
    label: string;
    item: any;
    placeholder: string;
    form: any;
    setSelected: any;
}


const FormSelectRole: React.FC<FormSelectRoleProps> = ({
    name,
    label,
    item,
    placeholder,
    form,
    setSelected,

}) => {



    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={(e) => { setSelected(e); field.onChange(e) }} defaultValue={field.value}>
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

export default FormSelectRole;