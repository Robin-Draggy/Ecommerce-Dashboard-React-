import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar/Sidebar"

export const DashboardLayout = () => {
    return (
    <div className="min-h-screen flex bg-red-500">
        <h1>dashboard</h1>
        <Sidebar />
        <main className="flex-1 p-4">
            <Outlet />
        </main>
    </div>
)
}