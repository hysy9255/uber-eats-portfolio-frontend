import { useContext } from "react";
import { OperatingHoursSetupContext } from "./OperatingHoursSetupContext";

export const useOperatingHoursSetup = () => {
  const ctx = useContext(OperatingHoursSetupContext);
  if (!ctx)
    throw new Error(
      "useOperatingHoursSetup must be used within OperatingHoursSetupProvider"
    );
  return ctx;
};
