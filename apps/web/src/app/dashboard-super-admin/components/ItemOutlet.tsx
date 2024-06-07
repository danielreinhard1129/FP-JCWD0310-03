import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemOutlet = () => {
    return (
        <SelectContent>
            <SelectItem value="1">Yogyakarta</SelectItem>
            <SelectItem value="2">Surabaya</SelectItem>
            <SelectItem value="2">Semarang</SelectItem>
            <SelectItem value="3">Jakarta</SelectItem>
        </SelectContent>
    )
}

export default ItemOutlet