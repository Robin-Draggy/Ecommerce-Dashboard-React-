import { LayoutDashboard } from "lucide-react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MainLayout } from "../layout/MainLayout";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Dashboard } from "../pages/dashboard/Dashboard";

export const routeConfig = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        meta: {
          title: "Dashboard",
          icon: <LayoutDashboard />,
          roles: ["admin", "editor"]
        }
      }
    ]
  }
]