"use client";

import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
import React, {createContext, useContext, useEffect, useState} from "react"

interface ContextType {
    active: string,
    setActive: (location: string) => void

}

export const SideBarContext = createContext<ContextType | undefined>(undefined);

export const SideBarProvider = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname()
    const [active, setActive] = useState(pathname)

    useEffect(() => {        
        setActive(pathname)
        
    }, [pathname])

    return (
        <SideBarContext.Provider value={{active, setActive}}>
            {children}
        </SideBarContext.Provider>
    )
}


export const getNav = () => {
  const context = useContext(SideBarContext);
  if (!context) throw new Error("getNAv must be used within Sidbarprovider");
  return context;
};
