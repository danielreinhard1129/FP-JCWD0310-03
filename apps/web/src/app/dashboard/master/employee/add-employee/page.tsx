'use client'
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { AddEmployeeForm } from "./components/FormAddEmployee"
import SuperAdminGuard from "@/hoc/SuperAdminGuard"

const AddEmployee = () => {
  return (
    <div className="flex flex-col">
      <div className="p-6 flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard/master/employee"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Add New Employee</h1>
      </div>
      <div className="mx-8 mb-8 p-5 w-8/12 rounded-xl bg-mythemes-secondarygreen">
          <AddEmployeeForm />
      </div>
    </div>
  )
}
 
export default SuperAdminGuard(AddEmployee)