import { useContext } from "react";
import { OwnerOrderContext } from "./OwnerOrderContext";

export const useOwnerOrder = () => {
  const ctx = useContext(OwnerOrderContext);
  if (!ctx)
    throw new Error("useOwnerOrder must be used within ClientOrderProvider");
  return ctx;
};
