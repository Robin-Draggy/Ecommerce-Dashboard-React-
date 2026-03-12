import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();


// CREATING PROVIDER
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => ( prev === "light" ? "dark" : "light" ))
    }

    const value = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

// CUSTOM HOOK
export const UseTheme = () => {
    return useContext(ThemeContext)
}