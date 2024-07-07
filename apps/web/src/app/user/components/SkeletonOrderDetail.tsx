'use client';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import CustomerAuthGuard from '@/hoc/CustomerAuthGuard';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrderDetailSkeleton = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    return (
        <div>
            <div className="flex flex-col gap-4 container p-4 bg-white px-6">
                <div className="relative flex gap-2">
                    <Link className="absolute h-6 my-auto" href={'/user/order'}>
                        <ChevronLeft className="h-6 my-auto" />
                    </Link>
                    <h1 className="font-bold mx-auto my-auto">Order Details</h1>
                </div>
            </div>
            <div className="flex flex-col gap-4 container bg-mythemes-grey px-6 min-h-screen py-6">
                <div className="flex flex-col gap-2 p-6 rounded-xl shadow-lg bg-white">
                    <div className="flex flex-col pb-4">
                        <div className="flex gap-2 justify-start">
                            <p className="text-md font-bold text-gray-500">Order</p>
                            <Skeleton className="w-24 h-6" />
                        </div>
                        <Skeleton className="w-32 h-4 mt-2" />
                    </div>
                    <div className="flex flex-col text-gray-700">
                        <div className="flex justify-between">
                            <p className="text-sm font-semibold">Name</p>
                            <Skeleton className="w-24 h-4" />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm font-semibold">Email</p>
                            <Skeleton className="w-36 h-4" />
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="flex justify-between text-gray-500">
                                    <p className="text-sm font-semibold">Base address</p>
                                </div>
                                <div className="flex flex-col pl-5 text-left">
                                    <Skeleton className="w-32 h-4 mt-1" />
                                    <Skeleton className="w-24 h-4 mt-1" />
                                    <Skeleton className="w-36 h-4 mt-1" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-gray-500">
                                    <p className="text-sm font-semibold">Outlet address</p>
                                </div>
                                <div className="flex flex-col pl-5 text-left ">
                                    <Skeleton className="w-32 h-4 mt-1" />
                                    <Skeleton className="w-24 h-4 mt-1" />
                                    <Skeleton className="w-36 h-4 mt-1" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">Distance</p>
                                <Skeleton className="w-16 h-4" />
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-gray-500">
                                <p className="text-sm font-semibold">Laundry Items</p>
                            </div>
                            <div className="flex flex-col pl-5 text-left ">
                                <Skeleton className="w-32 h-4 mt-1" />
                                <Skeleton className="w-32 h-4 mt-1" />
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">Weight</p>
                                <Skeleton className="w-16 h-4" />
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex flex-col">
                            <div className="flex justify-between text-gray-500">
                                <p className="text-sm font-semibold">Price</p>
                            </div>
                            <div className="flex flex-col pl-5">
                                <div className="flex justify-between">
                                    <p className="text-xs font-semibold text-gray-800">Pickup Change</p>
                                    <Skeleton className="w-16 h-4" />
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-xs font-semibold text-gray-800">Delivery Change</p>
                                    <Skeleton className="w-16 h-4" />
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm">Laundry Change</p>
                                </div>
                                <div className="pl-4 flex justify-between text-xs font-semibold text-gray-800">
                                    <Skeleton className="w-16 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold">Status :</p>
                            <div className="flex text-sm h-10 font-bold bg-mythemes-grey rounded text-mythemes-maingreen">
                                <Skeleton className="w-24 h-6 my-auto mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="bg-mythemes-maingreen text-white p-1 rounded-xl w-full">
                    <Loader2 className="mx-auto animate-spin" />
                </button>
            </div>
        </div>
    );
};

export default CustomerAuthGuard(OrderDetailSkeleton);
