import { CloudCog } from "lucide-react";
import { createContext, useContext, useState } from "react"

const AuthContext = createContext();


// CRAETING PROVIDER
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
            name: "robin",
            role: "admin"
        });

    const login = () => {
        const fakeUser = {
            name: "rasel",
            role: "admin"
        }

        localStorage.setItem("token", user.role)
        setUser(fakeUser);
    }

    const logout = () => {
        setUser(null);
    }

    const value = {
        user, 
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


// CUSTOM HOOK
export const useAuth = () => {
    return useContext(AuthContext);
}