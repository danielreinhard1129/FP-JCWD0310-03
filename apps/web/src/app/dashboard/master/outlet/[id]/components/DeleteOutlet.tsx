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
import useDeleteOutlet from '@/hooks/api/outlet/useDeleteOutlet';
import { useState } from 'react';

interface DeleteItemProps {
  id: number;
  refetch: () => void;
}

export function DeleteOutlet({ id, refetch }: DeleteItemProps) {
  const { deleteOutlet, isLoading } = useDeleteOutlet(id);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    await deleteOutlet(), refetch();
    setIsOpen(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-500 cursor-pointer font-bold bg-white hover:bg-red-500 hover:text-white px-4 outline outline-red-500"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Delete
        </Button>
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
