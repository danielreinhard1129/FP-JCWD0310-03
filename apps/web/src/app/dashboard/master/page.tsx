'use client'
import AdminAuthGuard from "@/hoc/AdminAuthGuard"

const DashboardSuperAdmin = () => {
    return (
        <div className="container p-5">
            <h1>PAGES HOME DASHBOARD</h1>
        </div>
    )
}

export default AdminAuthGuard(DashboardSuperAdmin)