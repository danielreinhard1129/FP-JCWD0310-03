import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProfileForm } from "../components/Form"

const AddEmployee = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex gap-2 my-auto ">
        <Link className="my-auto" href={"/dashboard-super-admin/menu-employee"}>
          <ChevronLeft />
        </Link>
        <h1 className="text-lg font-bold my-auto">Add New Employee</h1>
      </div>
      <ProfileForm />
    </div>
  )
}

export default AddEmployee