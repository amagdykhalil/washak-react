import { createContext, useContext, } from 'react';
import { useApiGet } from '../config/Api';
const AppContext = createContext();

export function AppProvider({ children }) {
  
  const { data: menuData = {}, loading: loadingMenu } = useApiGet(`/get-store-menu`);
  const { data: menuSettingData  = {}, loading: loadingSetting } = useApiGet(`/get-store-menu-settings`);
  const { data: storeOptionsData = {}, loading: optionsLoading } = useApiGet(`/get-store-options`);

  const menu = menuData?.data;
  const menuSetting = menuSettingData?.data;
  const storeOptions = storeOptionsData?.data;

  const value = { menu, loadingMenu, menuSetting, loadingSetting , storeOptions,optionsLoading };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context easily
export function useAppContext() {
  
  const context = useContext(AppContext);
  if (!context)
    throw new Error(
      "AppContext was used outside of AppProvider"
    );
  return context;
}