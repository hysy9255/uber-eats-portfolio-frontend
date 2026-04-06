import { useEffect, useState, type ReactNode } from "react";
import { ClientSideBarContext } from "./ClientSideBarContext";
import { ClientSideBarTabTypes } from "../../constants/ClientSideBarTabEnums";
import { useLocation } from "react-router-dom";
import type { AddOn } from "../../constants/ClientSidebarConfigs";

interface ClientSideBarProviderProps {
  children: ReactNode;
}

export const ClientSideBarProvider: React.FC<ClientSideBarProviderProps> = ({
  children,
}) => {
  const { pathname } = useLocation();

  const [selectedTab, setSelectedTab] = useState<ClientSideBarTabTypes>(() => {
    const target = pathname.split("/").length;
    const tab = pathname.split("/")[target - 1];
    return tab as ClientSideBarTabTypes;
  });
  const [expandedKey, setExpandedKey] = useState<AddOn | null>(null);

  useEffect(() => {
    const target = pathname.split("/").length;
    const tab = pathname.split("/")[target - 1];
    setSelectedTab(tab as ClientSideBarTabTypes);
  }, [pathname]);

  return (
    <ClientSideBarContext.Provider
      value={{
        selectedTab,
        expandedKey,
        setExpandedKey,
      }}
    >
      {children}
    </ClientSideBarContext.Provider>
  );
};
