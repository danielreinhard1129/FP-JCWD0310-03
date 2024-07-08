'use client';
import { SelectContent, SelectItem } from '@/components/ui/select';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import React, { useState } from 'react';

interface SelectOutletProps {
    defaultValue: string;
}

const ItemOutletWithDeleted: React.FC<SelectOutletProps> = ({
    defaultValue,
}) => {
    const [page, setPage] = useState(1);
    const { data: outlets } = useGetOutletList({
        isDelete: Number(Boolean(true))
    });

    return (
        <SelectContent>
            {outlets.map((outlet, index) => {
                let note = ""
                if ((outlet.isDelete == true && outlet.id == Number(defaultValue)) || outlet.isDelete == false) {
                    if(outlet.isDelete){
                        note = "(DELETED)"
                    }
                    return (
                        <SelectItem key={index} value={`${outlet.id}`}>
                            {outlet.outletName}{note}
                        </SelectItem>
                    );
                }
            })}
        </SelectContent>
    );
};

export default ItemOutletWithDeleted;