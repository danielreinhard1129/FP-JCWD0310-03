'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetLaundryItem from '@/hooks/api/laundryItem/useGetLaundryItem';
import useUpdateLaundryItem from '@/hooks/api/laundryItem/useUpdateLaundryItem';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UpdateItemArgs {
  itemName: string;
}
interface UpdateItemProps {
  id: number;
  refetch: () => void;
  isLoading: boolean;
}

export function UpdateItem({ id, refetch, isLoading }: UpdateItemProps) {
  const { laundryItem, isLoading: isLoadingGetLaundryItem } =
    useGetLaundryItem(id);
  const { updateLaundryItem, isLoading: isLoadingUpdateLaundryItem } =
    useUpdateLaundryItem(id);
  const [itemName, setItemName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (laundryItem) {
      setItemName(laundryItem.itemName);
    }
  }, [laundryItem]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values: UpdateItemArgs = { itemName };
    await updateLaundryItem(values);
    refetch();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SquarePen
          size={20}
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new item. Dont forget to click Save
            to confirm.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="itemName" className="text-right">
              Item name
            </Label>
            <Input
              id={String(id)}
              name="itemName"
              defaultValue={laundryItem?.itemName}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoadingUpdateLaundryItem}>
              Save item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
