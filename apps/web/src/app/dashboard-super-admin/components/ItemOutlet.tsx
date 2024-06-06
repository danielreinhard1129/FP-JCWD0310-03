import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemOutlet = () => {
    return (
        <SelectContent>
            <SelectItem value="YOGYAKARTA">Yogyakarta</SelectItem>
            <SelectItem value="SURABAYA">Surabaya</SelectItem>
            <SelectItem value="SEMARANG">Semarang</SelectItem>
            <SelectItem value="JAKARTA">Jakarta</SelectItem>
        </SelectContent>
    )
}

export default ItemOutlet