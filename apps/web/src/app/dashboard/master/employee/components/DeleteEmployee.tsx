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
import useDeleteEmployee from '@/hooks/api/employee/useDeleteEmployee';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteEmployeeProps {
  id: number;
  refetch: () => void;
}

export function DeleteEmployee({ id, refetch }: DeleteEmployeeProps) {
  const { deleteEmployee } = useDeleteEmployee(Number(id));
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteEmployee();
      refetch();
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Trash2
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
