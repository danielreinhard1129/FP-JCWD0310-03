import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemWorkShift = () => {
    return (
        <SelectContent>
            <SelectItem value="DAY">Siang</SelectItem>
            <SelectItem value="NIGHT">Malam</SelectItem>
        </SelectContent>
    )
}

export default ItemWorkShift