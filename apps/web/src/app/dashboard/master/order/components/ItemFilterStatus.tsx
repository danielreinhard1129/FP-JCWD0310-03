
import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemFilterStatus = () => {
    return (
        <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Waiting_for_Driver_Pickup">Waiting_for_Driver_Pickup</SelectItem>
            <SelectItem value="Laundry_On_The_Way_To_Outlet">Laundry_On_The_Way_To_Outlet</SelectItem>
            <SelectItem value="Laundry_Has_Arrived_At_Outlet">Laundry_Has_Arrived_At_Outlet</SelectItem>
            <SelectItem value="Laundry_Being_Washed">Laundry_Being_Washed</SelectItem>
            <SelectItem value="Laundry_Being_Ironed">Laundry_Being_Ironed</SelectItem>
            <SelectItem value="Laundry_Being_Packed">Laundry_Being_Packed</SelectItem>
            <SelectItem value="Awaiting_Payment">Awaiting_Payment</SelectItem>
            <SelectItem value="Laundry_Being_Delivered_To_Customer">Laundry_Being_Delivered_To_Customer</SelectItem>
            <SelectItem value="Laundry_Received_By_Customer">Laundry_Received_By_Customer</SelectItem>
        </SelectContent>
    )
}

export default ItemFilterStatus