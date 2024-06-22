// `use client`
// import React, { useState } from 'react'


// const UserOrder = () => {
//   const [page, setPage] = useState<number>(1);
//   // const { id } = useAppSelector((state) => state.user);
//   const id = 4;
//   const { data: pickupOrders, meta: meta, refetch: refetch } = useGetPickupOrders({
//     id: id,
//     pickupStatus: String(PickupStatus.Waiting_for_Driver),
//     page: page,
//     take: 10,
//   });

//   const handleChangePaginate = ({ selected }: { selected: number }) => {
//     setPage(selected + 1);
//   };
//   return (
//     <div>UserOrder</div>
//   )
// }

// export default UserOrder