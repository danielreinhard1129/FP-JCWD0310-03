// 'use client';
// import React from 'react';
// import PreviewImages from './PreviewImages';
// import Dropzone from 'react-dropzone';

// interface FormInputProps {
//   name: string;
//   label: string;
//   type: string
//   placeholder: string;
//   form: any;
// }

// const FormInputFile: React.FC<FormInputProps> = ({
//   name,
//   label,
//   type ,
//   placeholder,
//   form,
// }) => {
//   return (
//       <PreviewImages
//         fileImages={initialValues.profilePic}
//         onRemoveImage={(idx: number) =>
//           setFieldValue('thumbnail', initialValues.profilePic.toSpliced(idx, 1))
//         }
//       />

//       <Dropzone
//         onDrop={(files) =>
//           setFieldValue('thumbnail', [
//             ...values.thumbnail,
//             ...files.map((file) => file),
//           ])
//         }
//       />
//   );
// };

// export default FormInputDisable;
