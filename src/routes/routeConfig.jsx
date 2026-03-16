import { lazy } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MainLayout } from "../layout/MainLayout";

import { LayoutDashboard, ShoppingBag, ListOrdered, Users, ClipboardType, Warehouse } from "lucide-react";

import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Products } from "../pages/products/Products";
import { Orders } from "../pages/orders/Orders";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Customers } from "../pages/customers/Customers";
import { Categories } from "../pages/categories/Categories";
import { Inventory } from "../pages/inventory/Inventory";

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
          icon: <LayoutDashboard size={20} />,
          roles: ["admin", "editor"],
          breadcrumb: "Dashboard" 
        }
      },
     {
      path: "products",
      element: <Products />,
      meta: {
        title: "Products",
        icon: <ShoppingBag size={20} />,
        roles: ["admin"],
        breadcrumb: "Products"
      }
     },
     {
      path: "orders",
      element: <Orders />,
      meta: {
        title: "Orders",
        icon: <ListOrdered size={20} />,
        roles: ["admin"],
        breadcrumb: "Orders"
      }
     },
     {
      path: "customers",
      element: <Customers />,
      meta: {
        title: "Customers",
        icon: <Users size={20} />,
        roles: ["admin"],
        breadcrumb: "Customers"
      }
     },
     {
      path: "categories",
      element: <Categories />,
      meta: {
        title: "Categories",
        icon: <ClipboardType size={20} />,
        roles: ["admin"],
        breadcrumb: "Categories"
      }
     },
     {
      path: "Inventory",
      element: <Inventory />,
      meta: {
        title: "Inventory",
        icon: <Warehouse size={20} />,
        roles: ["admin"],
        breadcrumb: "Inventory"
      }
     },
    ]
  }
];