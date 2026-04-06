import { useContext } from "react";
import { ClientSideBarContext } from "./ClientSideBarContext";

export const useClientSideBar = () => {
  const ctx = useContext(ClientSideBarContext);
  if (!ctx)
    throw new Error(
      "useClientSideBar must be used within ClientSideBarProvider"
    );
  return ctx;
};
