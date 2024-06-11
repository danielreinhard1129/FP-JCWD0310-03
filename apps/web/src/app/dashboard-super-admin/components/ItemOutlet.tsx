import { SelectContent, SelectItem } from '@/components/ui/select'
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import React from 'react'

const ItemOutlet = () => {
    const { data: outlets } = useGetOutletList();
    return (
        <SelectContent>
            {outlets.map((outlet,index)=>{
                return <SelectItem key={index} value={`${outlet.id}`}>{outlet.outletName}</SelectItem>
            })}
        </SelectContent>
    )
}

export default ItemOutlet
