import { useContext } from "react";
import { DashboardOverviewContext } from "./DashboardOverviewContext";

export const useDashboardOverview = () => {
  const ctx = useContext(DashboardOverviewContext);
  if (!ctx)
    throw new Error(
      "useDashboardOverview must be used within DashboardOverviewProvider"
    );
  return ctx;
};
