'use client';


import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Button } from './ui/button';
import { BASE_API_URL } from '@/utils/config';

interface PreviewImagesProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}

const PreviewImages: FC<PreviewImagesProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }
    return images;
  }, [fileImages, images]);

  return (
    <div className="flex gap-4">
      {imageResults?.map((image, index) => {
        return (
          <div
            key={index}
            className="relative h-[200px] w-[300px] rounded-md border"
          >
            <Image
              src={images ? `${BASE_API_URL}/${image}` : image}
              alt="thumbnail"
              objectFit="contain"
              fill
            />

            <Button
              className="absolute -right-5 -top-5"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewImages;
