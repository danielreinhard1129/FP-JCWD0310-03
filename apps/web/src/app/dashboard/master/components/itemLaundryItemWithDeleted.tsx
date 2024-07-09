import { SelectContent, SelectItem } from '@/components/ui/select';
import useGetLaundryItemList from '@/hooks/api/laundryItem/useGetLaundryItemList';

const ItemLaundryItemWithDeleted = () => {
  const { data: laundryItems } = useGetLaundryItemList({
    isDelete: Number(Boolean(true))
  }); 

  return (
    <SelectContent>
      {laundryItems.map((laundryItem, index) => {
        return (
          <SelectItem key={index} value={`${laundryItem.id}`}>
            {laundryItem.itemName}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
};

export default ItemLaundryItemWithDeleted;
