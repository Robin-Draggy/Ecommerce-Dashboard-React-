import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <div  style={{background:"blue", padding:"40px"}}>
            <Outlet />
        </div>
    )
}