import React, { createContext, useState, useContext, ReactNode } from "react";

interface TabContextProps {
  opened: boolean;
  toggleOpened: () => void;
}

interface TabContextProviderProps {
  children: ReactNode;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabContextProvider: React.FC<TabContextProviderProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <TabContext.Provider value={{ opened, toggleOpened }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabMenu = (): TabContextProps => useContext(TabContext)!;
