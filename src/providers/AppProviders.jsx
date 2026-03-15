import { AuthProvider } from "../context/AuthContext"
import { ThemeProvider } from "../context/ThemeContext"

export const AppProviders = ({ children }) => {
    return (
        // WRAPPING THE PROVIDERS TO USE THEM 
        <AuthProvider>
            <ThemeProvider>
            {children}
            </ThemeProvider>
        </AuthProvider>
    )
}