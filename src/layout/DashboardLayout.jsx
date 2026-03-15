import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar/Sidebar"
import { Navbar } from "../components/navbar/Navbar"

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col gap-3 p-3">
            <Navbar />
            <div className="flex items-start gap-3">
                <Sidebar />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}