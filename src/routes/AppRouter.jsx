import { useRoutes } from "react-router-dom"
import { routeConfig } from "./routeConfig"

export const AppRouter = () => {
    const routes = useRoutes(routeConfig)

    return routes;
}