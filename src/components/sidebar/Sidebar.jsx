import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { routeConfig } from "../../routes/routeConfig";

export const Sidebar = () => {
    const { user } = useAuth();

    if(!user) return null;

    const dashboardRoutes = routeConfig.find(route => route.path === "/dashboard").children;
    
    const allowedRoutes = dashboardRoutes.filter(route => {
        if(!route.meta) return false;

        return route.meta.roles.includes(user.role);
    });

    return (
        <div>
            {allowedRoutes.map(route => {
                const path = route.index ? "/dashboard" : `/dashboard/${route.path}`;

                return (
                    <Link key={path} to={path}>
                    <div className="flex items-center gap-3">
                        <span>{route.meta.icon}</span>
                        <span>{route.meta.title}</span>
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}