import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Navbar } from "../components/navbar/Navbar";
import { SidebarProvider } from "../context/SidebarContext";

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col gap-3 p-3">
        <Navbar />
        <div className="flex items-start gap-3">
          <Sidebar />
          <main className="w-full min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};