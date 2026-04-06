import { useContext } from "react";
import { ClientOrderContext } from "./ClientOrderContext";

export const useClientOrder = () => {
  const ctx = useContext(ClientOrderContext);
  if (!ctx)
    throw new Error("useClientOrder must be used within ClientOrderProvider");
  return ctx;
};
