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
import useCreateDeliveryOrder from '@/hooks/api/deliveryOrder/useCreateDeliveryOrder';
import useUpdateOrderWorker from '@/hooks/api/orderWorker/useUpdateOrderWorker';
import useGetUser from '@/hooks/api/user/useGetUser';
import { EmployeeWorkShift } from '@/types/employee.type';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AcceptBypassProps {
  id: number;
  refetch: () => void;
}

export function AcceptBypass({ id, refetch }: AcceptBypassProps) {

  const [isOpen, setIsOpen] = useState(false);

  const { updateOrderWorker } = useUpdateOrderWorker();

  const acceptValues = {
    orderWorkerId: id,
    action: 'accept',
  };

  const handleAccept = async () => {
    try {
      await updateOrderWorker(acceptValues);
      toast.success('Bypass Accepted !');
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
      const currentHour = now.getHours();

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
        onClick={()=>setIsOpen(true)}
        className="py-1 rounded-lg w-1/2 font-bold text-white bg-mythemes-maingreen"
      >
        Accept
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
            <AlertDialogAction onClick={() => handleAccept()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
