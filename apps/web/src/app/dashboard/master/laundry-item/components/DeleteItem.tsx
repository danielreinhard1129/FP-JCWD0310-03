'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useDeleteLaundryItem from '@/hooks/api/laundryItem/useDeleteLaundryItem';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteItemProps {
  id: number;
  refetch: () => void;
}

export function DeleteItem({ id, refetch }: DeleteItemProps) {
  const { deleteLaundryItem } = useDeleteLaundryItem(id);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    await deleteLaundryItem(), refetch();
    setIsOpen(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Trash2
          size={20}
          className="text-red-500 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
