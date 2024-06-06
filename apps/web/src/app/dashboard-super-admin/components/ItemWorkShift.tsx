import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemWorkShift = () => {
    return (
        <SelectContent>
            <SelectItem value="SIANG">Siang</SelectItem>
            <SelectItem value="MALAM">Malam</SelectItem>
        </SelectContent>
    )
}

export default ItemWorkShift