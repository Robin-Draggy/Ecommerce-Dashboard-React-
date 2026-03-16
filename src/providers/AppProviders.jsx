import { AuthProvider } from "../context/AuthContext"
import { SidebarProvider } from "../context/SidebarContext"
import { ThemeProvider } from "../context/ThemeContext"

export const AppProviders = ({ children }) => {
    return (
        // WRAPPING THE PROVIDERS TO USE THEM 
        <AuthProvider>
            <ThemeProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}