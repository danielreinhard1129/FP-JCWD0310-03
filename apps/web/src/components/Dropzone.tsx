'use client';
import React, { FC } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Label } from './ui/label';
import { TbCloudUpload } from 'react-icons/tb';

interface DropzoneProps {
  label: string;
  isError: boolean;
  onDrop: (files: FileWithPath[]) => void;
}

const Dropzone: FC<DropzoneProps> = ({ isError, label, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div className=" space-y-1.5">
      <Label className={isError ? 'text-red-500' : ''}>{label}</Label>

      <div
        {...getRootProps({
          className:
            'p-10 border flex justify-center rounded-lg shadow-xl bg-white bg-opacity-80',
        })}
      >
        <input {...getInputProps()} />
        <Label className="  w-full text-center  text-md text-gray-500 ">
          Click to select files <TbCloudUpload className='mx-auto' />
        </Label>
      </div>

      {isError && (
        <div className="text-xs text-red-500">{label}is Required</div>
      )}
    </div>
  );
};

export default Dropzone;
