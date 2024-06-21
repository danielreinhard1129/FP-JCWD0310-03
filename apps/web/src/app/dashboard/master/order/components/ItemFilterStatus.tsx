
import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

const ItemFilterStatus = () => {
    return (
        <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Waiting_for_Driver_Pickup">Waiting for Driver Pickup</SelectItem>
            <SelectItem value="Laundry_On_The_Way_To_Outlet">Laundry On The Way To Outlet</SelectItem>
            <SelectItem value="Laundry_Has_Arrived_At_Outlet">Laundry Has Arrived At Outlet</SelectItem>
            <SelectItem value="Laundry_Being_Washed">Laundry Being Washed</SelectItem>
            <SelectItem value="Laundry_Finished_Washing">Laundry Finished Washing</SelectItem>
            <SelectItem value="Laundry_Being_Ironed">Laundry Being Ironed</SelectItem>
            <SelectItem value="Laundry_Finished_Ironing">Laundry Finished Ironing</SelectItem>
            <SelectItem value="Laundry_Being_Packed">Laundry Being Packed</SelectItem>
            <SelectItem value="Laundry_Finished_Packing">Laundry Finished Packing</SelectItem>
            <SelectItem value="Awaiting_Payment">Awaiting Payment</SelectItem>
            <SelectItem value="Laundry_Being_Delivered_To_Customer">Laundry Being Delivered To Customer</SelectItem>
            <SelectItem value="Laundry_Received_By_Customer">Laundry Received By Customer</SelectItem>
        </SelectContent>
    )
}

export default ItemFilterStatus
