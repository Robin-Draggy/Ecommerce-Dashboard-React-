import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

// CRAETING PROVIDER
export const SidebarProvider = ({chilldren}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev)
    }

    const value = {
        isOpen,
        toggleSidebar
    }

    return (
        <SidebarContext.Provider value={value}>
            {chilldren}
        </SidebarContext.Provider>
    )
}


// CUSTOM HOOK
export const useSidebar = () => {
    return useContext(SidebarProvider)
}