import { createContext } from "react";
import type { ClientSideBarTabTypes } from "../../constants/ClientSideBarTabEnums";
import type { AddOn } from "../../constants/ClientSidebarConfigs";

type ClientSideBarContextValue = {
  selectedTab: ClientSideBarTabTypes | undefined;
  expandedKey: AddOn | null;
  setExpandedKey: React.Dispatch<React.SetStateAction<AddOn | null>>;
};

export const ClientSideBarContext =
  createContext<ClientSideBarContextValue | null>(null);
