import { SelectContent, SelectItem } from '@/components/ui/select';
import useGetLaundryItemList from '@/hooks/api/laundryItem/useGetLaundryItemList';

const ItemLaundryItem = () => {
    const { data: laundryItems } = useGetLaundryItemList();
    console.log(laundryItems);
    
    return (
        <SelectContent>
            {laundryItems.map((laundryItem,index)=>{
                return <SelectItem key={index} value={`${laundryItem.id}`}>{laundryItem.itemName}</SelectItem>
            })}
            {/* <SelectItem value="1">Baju</SelectItem>
            <SelectItem value="2">Jaket</SelectItem>
            <SelectItem value="3">Celana</SelectItem> */}
        </SelectContent>
    )
}

export default ItemLaundryItem