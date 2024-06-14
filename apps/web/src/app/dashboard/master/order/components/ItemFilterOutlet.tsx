import { SelectContent, SelectItem } from '@/components/ui/select'
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import React from 'react'

const ItemFilterOutlet = () => {
    const { data: outlets } = useGetOutletList();
    return (
        <SelectContent>
            <SelectItem key={0} value="all">All Outlet</SelectItem>
            {outlets.map((outlet,index)=>{
                return <SelectItem key={index} value={`${outlet.id}`}>{outlet.outletName}</SelectItem>
            })}
        </SelectContent>
    )
}

export default ItemFilterOutlet
