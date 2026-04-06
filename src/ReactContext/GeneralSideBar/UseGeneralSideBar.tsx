import { useContext } from "react";
import { GeneralSideBarContext } from "./GeneralSidebarContext";

export const useGeneralSideBar = () => {
  const ctx = useContext(GeneralSideBarContext);
  if (!ctx)
    throw new Error(
      "useGeneralSideBar must be used within GeneralSideBarProvider"
    );
  return ctx;
};
