'use client';
import React from 'react';

import { Input } from './ui/input';
import { Label } from './ui/label';

interface FormInputProps {
  name: string;
  label: string;
  type: string ;
  //value: string | number | Date;
  placeholder: string;
  //isError: boolean;
  //error: string | undefined;
  //handleChange: FormikHandlers['handleChange'];
  //handleBlur: FormikHandlers['handleBlur'];
}


const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  //isError,
  placeholder,
  //value,
  //error,
  //handleChange,
  //handleBlur,
}) => {
  //const adjustedValue = value instanceof Date ? value.toISOString().split('T')[0] : value;

  const adjustedPlaceholder = type === 'date' ? 'YYYY-MM-DD' : type === 'time' ? 'HH:MM' : placeholder;
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        placeholder={adjustedPlaceholder}
        //onBlur={handleBlur}
        //onChange={handleChange}
        //value={adjustedValue}
        //className={isError ? 'border-mythemes-darkpink' : 'border-mythemes-scarletgum font-semibold'}
      />
      {/* {isError ? <div className="text-xs text-mythemes-darkpink">{error}</div> : null} */}
    </div>
  );
};

export default FormInput;