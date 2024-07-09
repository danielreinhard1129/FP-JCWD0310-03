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
import useUpdateOrderWorker from '@/hooks/api/orderWorker/useUpdateOrderWorker';
import useGetUser from '@/hooks/api/user/useGetUser';
import { EmployeeWorkShift } from '@/types/employee.type';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface RejectBypassProps {
  id: number;
  refetch: () => void;
}

export function RejectBypass({ id, refetch }: RejectBypassProps) {

  const [isOpen, setIsOpen] = useState(false);

  const { updateOrderWorker } = useUpdateOrderWorker();

  const rejectValues = {
    orderWorkerId: id,
    action: 'reject',
  };

  const handleReject = async () => {
    try {
      await updateOrderWorker(rejectValues);
      toast.success('Bypass Rejected !');
      refetch();
    } catch (error) {
      console.error('Failed to update pickup order', error);
    }
  };

  const { user } = useGetUser();

  const employeeWorkShift = user?.employee?.workShift

  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getUTCHours() + 7

      if (employeeWorkShift === EmployeeWorkShift.DAY) {
        if (currentHour >= 6 && currentHour < 18) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else if (employeeWorkShift === EmployeeWorkShift.NIGHT) {
        if (currentHour >= 18 || currentHour < 6) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [employeeWorkShift]);

  return (
    <>
      <Button
        disabled={isDisable}
        onClick={() => setIsOpen(true)}
        className="py-1 rounded-l w-1/2 font-bold text-white bg-red-500"
      >
        Reject
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleReject()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
