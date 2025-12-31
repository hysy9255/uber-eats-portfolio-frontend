import { useContext } from "react";
import { OnBoardingAccountContext } from "./OnBoardingAccountContext";

export const useOnBoardingAccount = () => {
  const ctx = useContext(OnBoardingAccountContext);
  if (!ctx)
    throw new Error(
      "useOnBoardingAccount must be used within OnBoardingAccountProvider"
    );
  return ctx;
};
