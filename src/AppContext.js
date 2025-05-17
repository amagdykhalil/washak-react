import { createContext, useContext, useState } from 'react';
import { useMenu } from './hooks/useMenu';
const AppContext = createContext();


export function AppProvider({ children }) {
    const {menu , loading  , menuSetting , loadingSetting } = useMenu()
        
    const value = { menu, loading , menuSetting , loadingSetting  };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context easily
export function useAppContext() {
    return useContext(AppContext);
}
