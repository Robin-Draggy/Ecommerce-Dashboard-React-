import { useRoutes } from "react-router-dom"
import { routeConfig } from "./routeConfig"

export const AppRouter = () => {
    const route = useRoutes(routeConfig)
    return route
}