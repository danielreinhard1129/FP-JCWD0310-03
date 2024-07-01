
import { SelectContent, SelectItem } from '@/components/ui/select'
import { OrderStatus } from '@/types/order.type'
import React from 'react'

const ItemFilterStatus = () => {
    return (
        <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={OrderStatus.WAITING_FOR_PICKUP_DRIVER}>Waiting for Pickup Driver</SelectItem>
            <SelectItem value={OrderStatus.ON_THE_WAY_TO_CUSTOMER}>On the Way to Customer</SelectItem>
            <SelectItem value={OrderStatus.ON_THE_WAY_TO_OUTLET}>On the Way to Outlet</SelectItem>
            <SelectItem value={OrderStatus.ARRIVED_AT_OUTLET}>Arrived at Outlet</SelectItem>
            <SelectItem value={OrderStatus.READY_FOR_WASHING}>Ready for Washing</SelectItem>
            <SelectItem value={OrderStatus.BEING_WASHED}>Being Washed</SelectItem>
            <SelectItem value={OrderStatus.WASHING_COMPLETED}>Washing Completed</SelectItem>
            <SelectItem value={OrderStatus.BEING_IRONED}>Being Ironed</SelectItem>
            <SelectItem value={OrderStatus.IRONING_COMPLETED}>Ironing Completed</SelectItem>
            <SelectItem value={OrderStatus.BEING_PACKED}>Being Packed</SelectItem>
            <SelectItem value={OrderStatus.AWAITING_PAYMENT}>Awaiting Payment</SelectItem>
            <SelectItem value={OrderStatus.READY_FOR_DELIVERY}>Ready for Delivery</SelectItem>
            <SelectItem value={OrderStatus.WAITING_FOR_DELIVERY_DRIVER}>Waiting for Delivery Driver</SelectItem>
            <SelectItem value={OrderStatus.BEING_DELIVERED_TO_CUSTOMER}>Being Delivered to Customer</SelectItem>
            <SelectItem value={OrderStatus.RECEIVED_BY_CUSTOMER}>Received by Customer</SelectItem>
            <SelectItem value={OrderStatus.COMPLETED}>Completed</SelectItem>
        </SelectContent>
    )
}

export default ItemFilterStatus
