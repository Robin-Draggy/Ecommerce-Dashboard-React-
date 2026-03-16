import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { routeConfig } from "../../routes/routeConfig";

export const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const dashboardRoute = routeConfig.find((route) => route.path === "/dashboard");
  const dashboardRoutes = dashboardRoute?.children || [];

  const allowedRoutes = dashboardRoutes.filter((route) => {
    if (!route.meta) return false;
    return route.meta.roles.includes(user.role);
  });

  return (
    <div className="bg-cl-primary w-[15vw] h-screen px-2 py-2.5 rounded-lg space-y-2">
      {allowedRoutes.map((route) => {
        const path = route.index ? "/dashboard" : `/dashboard/${route.path}`;

        return (
          <NavLink
            key={path}
            to={path}
            end={route.index}
            className={({ isActive }) =>
              `block rounded-md p-2 transition-all ${
                isActive ? "bg-sidebar-cl text-cl-primary" : "text-cl-primary hover:bg-sidebar-cl hover:text-cl-hover"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span>{route.meta.icon}</span>
              <span>{route.meta.title}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};