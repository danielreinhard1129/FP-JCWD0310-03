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
import useCreateLaundryItem from '@/hooks/api/laundryItem/useCreateLaundryItem';
import { LaundryItem } from '@/types/laundryItem.type';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface CreateItemArgs extends Pick<LaundryItem, 'itemName'> {}
interface Refetch {
  refetch: () => void;
}

const AddItem = ({ refetch }: Refetch) => {
  const { createLaundryItem } = useCreateLaundryItem();
  const [itemName, setItemName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values: CreateItemArgs = { itemName };
    await createLaundryItem(values);
    refetch();
    setItemName('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="font-bold text-mythemes-maingreen flex gap-2 text-md bg-inherit border-none"
        >
          <PlusCircle />
          Add item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
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
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddItem;
