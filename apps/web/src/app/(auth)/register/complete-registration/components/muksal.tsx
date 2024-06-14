// 'use client';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';
// // import Select from 'react-select';
// import dynamic from 'next/dynamic';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import React, { useState } from 'react';
// import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   TCreateProductSchema,
//   createProductSchema,
// } from './components/validationSchema';
// import useGetCategory from '@/hooks/api/categoy/useGetCategory';
// import Image from 'next/image';
// import useCreateProduct from '@/hooks/api/product/useCreateProduct';
// import { Loader2 } from 'lucide-react';

// // Dynamic import for react-select
// const Select = dynamic(() => import('react-select'), { ssr: false });

// const CreateProduct: React.FC = () => {
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const { createProduct, isLoading } = useCreateProduct();
//   const {
//     register,
//     control,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//     reset,
//   } = useForm<TCreateProductSchema>({
//     resolver: zodResolver(createProductSchema),
//   });

//   const handleFileChange = (files: FileList | null) => {
//     if (files) {
//       const newFiles = Array.from(files);
//       const existingFiles = getValues('images') || [];
//       const allFiles = existingFiles.concat(newFiles);

//       if (allFiles.length > 5) {
//         alert('You can only upload up to 5 images');
//         return;
//       }

//       setValue('images', allFiles);

//       // Create image previews
//       const previews = allFiles.map((file) => URL.createObjectURL(file));
//       setImagePreviews(previews);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     // Remove from imagePreviews
//     const updatedPreviews = [...imagePreviews];
//     updatedPreviews.splice(index, 1);
//     setImagePreviews(updatedPreviews);

//     // Remove from images in form data
//     const imagesFormData = getValues('images') || [];
//     const updatedImages = [...imagesFormData];
//     updatedImages.splice(index, 1);
//     setValue('images', updatedImages);
//   };

//   const onSubmit: SubmitHandler<TCreateProductSchema> = (data) => {
//     console.log(data);
//     console.log(data.categories);
//     createProduct(data);

//     reset({
//       name: '',
//       description: '',
//       price: 0,
//       categories: [],
//       images: [],
//     });

//     setImagePreviews([]);
//   };
//   const { categories } = useGetCategory();
//   // console.log(categories);
//   const categoryOptions = categories.map((category) => ({
//     value: category.id.toString(),
//     label: category.name,
//   }));
//   return (
//     <main className="container mx-auto max-w-xl max-h-screen py-10">
//       <div>
//         <Card className="shadow-xl">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <CardHeader>
//               <CardTitle>Create Product</CardTitle>
//               <CardDescription>
//                 Buat produk dengan beberapa kategori dan gambar
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div>
//                 <Label>Name</Label>
//                 <Input {...register('name')} type="text" placeholder="Name" />
//                 {errors.name && (
//                   <p className="mt-1 text-xs text-red-500">{`${errors.name.message}`}</p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <Label>Description</Label>
//                 <Input
//                   {...register('description')}
//                   type="text"
//                   placeholder="Description"
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-xs text-red-500">{`${errors.description.message}`}</p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <Label>Price</Label>
//                 <Input
//                   {...register('price', { valueAsNumber: true })}
//                   type="number"
//                   placeholder="Price"
//                 />
//                 {errors.price && (
//                   <p className="mt-1 text-xs text-red-500">{`${errors.price.message}`}</p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <Label>Categories</Label>
//                 <Controller
//                   name="categories"
//                   control={control}
//                   render={({ field: { value, onBlur, onChange, name } }) => (
//                     <Select
//                       isMulti
//                       value={value}
//                       onBlur={onBlur}
//                       name={name}
//                       options={categoryOptions}
//                       onChange={(selectedOption) => onChange(selectedOption)}
//                     />
//                   )}
//                 />
//                 {errors.categories && (
//                   <p className="mt-1 text-xs text-red-500">
//                     {errors.categories.message}
//                   </p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <Label>Images</Label>
//                 <Controller
//                   name="images"
//                   control={control}
//                   render={({ field: { onBlur, name } }) => (
//                     <Input
//                       onBlur={onBlur}
//                       name={name}
//                       type="file"
//                       onChange={(e) => handleFileChange(e.target.files)}
//                       multiple
//                     />
//                   )}
//                 />
//                 {errors.images && (
//                   <p className="mt-1 text-xs text-red-500">
//                     {errors.images.message}
//                   </p>
//                 )}
//                 <div className="flex gap-4 mt-4">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative">
//                       <Image
//                         key={index}
//                         src={preview}
//                         alt={`Preview ${index + 1}`}
//                         width={100}
//                         height={100}
//                         style={{
//                           objectFit: 'fill',
//                           width: '100px',
//                           height: '100px',
//                         }}
//                       />
//                       <button
//                         type="button"
//                         className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
//                         onClick={() => handleRemoveImage(index)}
//                       >
//                         <Trash2 />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end">
//               <Button disabled={isLoading} type="submit">
//                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 {isLoading ? 'Loading' : 'Create'}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default CreateProduct;