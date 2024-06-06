import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemRole = () => {
    return (
        <SelectContent>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="OUTLET_ADMIN">Outlet Admin</SelectItem>
            <SelectItem value="WORKER">Worker</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
        </SelectContent>
    )
}

export default ItemRole