import { createContext } from "react";

type GeneralSideBarContextValue = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GeneralSideBarContext =
  createContext<GeneralSideBarContextValue | null>(null);
