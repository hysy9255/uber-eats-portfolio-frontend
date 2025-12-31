import { useContext } from "react";
import { OperatingHoursContext } from "./OperatingHoursContext";

export const useOperatingHours = () => {
  const ctx = useContext(OperatingHoursContext);
  if (!ctx)
    throw new Error(
      "useOperatingHours must be used within OperatingHoursProvider"
    );
  return ctx;
};
