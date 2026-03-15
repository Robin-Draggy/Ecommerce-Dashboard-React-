import { LayoutDashboard, BarChart3, Settings, User, Users, ShoppingBag } from "lucide-react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MainLayout } from "../layout/MainLayout";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Products } from "../pages/products/Products";
import { lazy } from "react";
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
          icon: <LayoutDashboard size={14} />,
          roles: ["admin", "editor"]
        }
      },
     {
      path: "products",
      element: <Products />,
      meta: {
        title: "Products",
        icon: <ShoppingBag size={14} />,
        roles: ["admin"]
      }
     }
    ]
  }
];