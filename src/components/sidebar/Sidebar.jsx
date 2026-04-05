import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { routeConfig } from "../../routes/routeConfig";
import { useSidebar } from "../../context/SidebarContext";
import { useMemo } from "react";

export const Sidebar = () => {
  const { user } = useAuth();
  const { isOpen, isMobile, closeSidebar } = useSidebar();

  const allowedRoutes = useMemo(() => {
    if (!user) return [];

    const dashboardRoute = routeConfig.find(
      (route) => route.path === "/dashboard"
    );

    return (dashboardRoute?.children || []).filter(
      (route) =>
        route.meta && route.meta.roles.includes(user.role)
    );
  }, [user]);

  if (!user) return null;

  const expanded = !isMobile && isOpen;

  return (
    <aside
  className={`
    bg-cl-primary h-screen rounded-lg
    flex flex-col gap-2 p-2
    transition-[width] duration-300 ease-in-out
    ${expanded ? "w-64" : "w-16"}
  `}
>
  {allowedRoutes.map((route) => {
    const path = route.index
      ? "/dashboard"
      : `/dashboard/${route.path}`;

    return (
      <NavLink
        key={path}
        to={path}
        end={route.index}
        onClick={() => isMobile && closeSidebar()}
      >
        {({ isActive }) => (
          <div
            className={`
              flex items-center rounded-lg px-2 py-2
              transition-colors duration-200
              ${isActive ? "bg-sidebar-cl text-cl-primary" : "hover:bg-gray-100"}
            `}
          >
            {/* ICON */}
            <span className="flex items-center justify-center w-10 shrink-0">
              {route.meta.icon}
            </span>

            {/* TEXT WRAPPER (important) */}
            <div className="overflow-hidden">
              <span
                className={`
                  block whitespace-nowrap
                  transition-all duration-200 ease-out
                  ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                  }
                `}
              >
                {route.meta.title}
              </span>
            </div>
          </div>
        )}
      </NavLink>
    );
  })}
</aside>
  );
};