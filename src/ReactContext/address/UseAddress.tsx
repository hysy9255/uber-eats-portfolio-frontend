import { useContext } from "react";
import { AddressContext } from "./AddressContext";

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within AddressProvider");
  return ctx;
};
