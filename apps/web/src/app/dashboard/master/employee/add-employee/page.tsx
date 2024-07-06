'use client'
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { AddEmployeeForm } from "./components/FormAddEmployee"
import SuperAdminGuard from "@/hoc/SuperAdminGuard"
import { Separator } from "@/components/ui/separator"

const AddEmployee = () => {
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard/master/employee"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Add New Employee</h1>
      </div>
      <Separator className="bg-black" />
      <div className="p-6 rounded-xl bg-white">
          <AddEmployeeForm />
      </div>
    </div>
    
  )
}
 
export default SuperAdminGuard(AddEmployee)