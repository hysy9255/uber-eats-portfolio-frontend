import { useCallback, useEffect, useState, type ReactNode } from "react";
import { DashboardOverviewContext } from "./DashboardOverviewContext";
import { getToken } from "../../auth";
import type { DayFilter } from "../../components/Dropdowns/NewDropdownButton";
import type { GetOwnerDashBoardPageDTO } from "../../dto/GetOwnerDashboardPage.dto";
import { getMenuRankings, getOwnerDashboardPage } from "../../api/orderApi";
import type { MenuRankingDTO } from "../../dto/MenuRanking.dto";

interface DashboardOverviewProviderProps {
  children: ReactNode;
}

export const DashboardOverviewProvider: React.FC<
  DashboardOverviewProviderProps
> = ({ children }) => {
  const token = getToken();
  if (!token) throw new Error("No Token");

  const [dayFilter, setDayFilter] = useState<DayFilter>("7");
  const [dashboard, setDashboard] = useState<GetOwnerDashBoardPageDTO>();
  const [menuRanking, setMenuRanking] = useState<MenuRankingDTO>();

  const loadOwnerDashboardData = useCallback(async () => {
    const data = await getOwnerDashboardPage(token, dayFilter);
    setDashboard(data);
  }, [token, dayFilter]);

  const loadMenuRankingData = useCallback(async () => {
    const data = await getMenuRankings(token);
    // setMenuRanking(() => data.sort((a, b) => a.quantity - b.quantity));
    // setMenuRanking(() => data.sort((a, b) => b.quantity - a.quantity));
    setMenuRanking(() => ({
      topOrders: data.topOrders.sort((a, b) => b.quantity - a.quantity),
      leastOrders: data.leastOrders.sort((a, b) => a.quantity - b.quantity),
    }));
  }, [token]);

  useEffect(() => {
    loadOwnerDashboardData();
    loadMenuRankingData();
  }, [loadOwnerDashboardData, loadMenuRankingData]);

  return (
    <DashboardOverviewContext.Provider
      value={{
        dayFilter,
        setDayFilter,
        dashboard,
        menuRanking,
      }}
    >
      {children}
    </DashboardOverviewContext.Provider>
  );
};
