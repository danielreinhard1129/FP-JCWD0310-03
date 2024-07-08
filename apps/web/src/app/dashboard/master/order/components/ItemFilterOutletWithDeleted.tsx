'use client';
import { SelectContent, SelectItem } from '@/components/ui/select';
import useGetOutletList from '@/hooks/api/outlet/useGetOutletsList';
import React, { useState } from 'react';

const ItemFilterOutletWithDeleted = () => {
    const { data: outlets } = useGetOutletList({
        isDelete: Number(Boolean(true))
    });
    return (
        <SelectContent>
            <SelectItem key={0} value="all">
                All Outlet
            </SelectItem>
            {outlets.map((outlet, index) => {
                let note = ""
                if (outlet.isDelete) {
                    note = "(DELETED)"
                }
                return (
                    <SelectItem key={index} value={`${outlet.id}`}>
                        {outlet.outletName}{note}
                    </SelectItem>
                );
            })}
        </SelectContent>
    );
};

export default ItemFilterOutletWithDeleted;