import { createContext, useContext, useState } from 'react';
import { useMenu } from './hooks/useMenu';
import { useApiGet } from './config/Api';
const AppContext = createContext();

export function AppProvider({ children }) {
  const { menu, loading, menuSetting, loadingSetting } = useMenu();
  const { data: storeOptions } = useApiGet(`/get-store-options`);

  const value = { menu, loading, menuSetting, loadingSetting , storeOptions };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context easily
export function useAppContext() {
  return useContext(AppContext);
}
