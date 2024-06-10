import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemStation = () => {
    return (
        <SelectContent>
            <SelectItem value="WASHING">Washing</SelectItem>
            <SelectItem value="IRONING">Ironing</SelectItem>
            <SelectItem value="PACKING">Packing</SelectItem>
        </SelectContent>
    )
}

export default ItemStation