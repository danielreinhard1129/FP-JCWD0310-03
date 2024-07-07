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
import useGetUser from '@/hooks/api/user/useGetUser';
import { EmployeeWorkShift } from '@/types/employee.type';
import { useEffect, useState } from 'react';

interface DeliveryRequestProps {
  id: number;
  refetch: () => void;
}

export function DeliveryRequest({ id, refetch }: DeliveryRequestProps) {

  const [isOpen, setIsOpen] = useState(false);

  const { createDeliveryOrder } = useCreateDeliveryOrder();

  const { user } = useGetUser();

  const employeeWorkShift = user?.employee?.workShift


  const values = {
    orderId: id,
  };

  const handleCreate = async () => {
    try {
      await createDeliveryOrder(values);
      refetch();
    } catch (error) {
      console.error('Failed to create delivery order', error);
    }
  };

  //shift confirmation
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
    <div className="flex gap-2 justify-end">
          <Button
            disabled={isDisable}
            onClick={() => setIsOpen(true)}
            className="py-0.5 bg-mythemes-maingreen text-white font-bold"
          >
            Create Delivery Order
          </Button>
        </div>
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
          <AlertDialogAction onClick={() => handleCreate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
