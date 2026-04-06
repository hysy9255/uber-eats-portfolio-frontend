import { useContext } from "react";
import { MenusContext } from "./MenusContext";

export const useMenus = () => {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("useMenus must be used within MenusProvider");
  return ctx;
};
