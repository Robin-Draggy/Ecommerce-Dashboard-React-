import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { routeConfig } from "../../routes/routeConfig";
import { useSidebar } from "../../context/SidebarContext";

export const Sidebar = () => {
  const { user } = useAuth();
  const { isOpen, isMobile } = useSidebar();

  if (!user) return null;

  const expanded = !isMobile && isOpen;

  const dashboardRoute = routeConfig.find((route) => route.path === "/dashboard");
  const dashboardRoutes = dashboardRoute?.children || [];

  const allowedRoutes = dashboardRoutes.filter((route) => {
    if (!route.meta) return false;
    return route.meta.roles.includes(user.role);
  });

  return (
    <aside
      className={`
        bg-cl-primary
        h-screen
        px-2 py-2.5
        rounded-lg
        space-y-3
        transition-all duration-300
        ${expanded ? "w-64" : "w-16"}
      `}
    >
      {allowedRoutes.map((route) => {
        const path = route.index ? "/dashboard" : `/dashboard/${route.path}`;

        return (
          <NavLink key={path} to={path} end={route.index}>
            {({ isActive }) => (
              <div
                className={`
                  p-2 rounded-lg transition-all duration-200
                  ${
                    !isMobile && expanded && isActive
                      ? "bg-sidebar-cl text-cl-primary"
                      : "hover:bg-gray-100 hover:text-gray-900 text-cl-primary"
                  }
                `}
              >
                {/* MOBILE DESIGN */}
                {isMobile ? (
                  <div className="flex flex-col items-center gap-1">

                    {/* ICON */}
                    <span
                      className={`
                        p-2 rounded-full transition-all
                        ${isActive ? "bg-sidebar-cl" : ""}
                      `}
                    >
                      {route.meta.icon}
                    </span>

                    {/* TITLE */}
                    <span className="text-xs text-center">
                      {route.meta.title}
                    </span>

                  </div>
                ) : (
                  /* DESKTOP DESIGN */
                  <div
                    className={`
                      flex items-center
                      ${expanded ? "gap-3" : "justify-center"}
                    `}
                  >

                    {/* ICON */}
                    <span className={`${!expanded ? "p-2 rounded-md" : ""}`}>
                      {route.meta.icon}
                    </span>

                    {/* TITLE */}
                    <span
                      className={`
                        whitespace-nowrap
                        transition-all duration-300
                        origin-left
                        ${
                          expanded
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 w-0"
                        }
                      `}
                    >
                      {route.meta.title}
                    </span>

                  </div>
                )}
              </div>
            )}
          </NavLink>
        );
      })}
    </aside>
  );
};