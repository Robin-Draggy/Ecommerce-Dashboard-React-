import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

const MOBILE_BREAKPOINT = 768;

// CRAETING PROVIDER
export const SidebarProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev)
    }

    const value = {
        isOpen,
        toggleSidebar,
        isMobile
    }

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}


// CUSTOM HOOK
export const useSidebar = () => {
    return useContext(SidebarContext)
}