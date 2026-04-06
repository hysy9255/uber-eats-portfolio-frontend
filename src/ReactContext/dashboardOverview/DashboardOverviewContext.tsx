import { createContext } from "react";
import type { DayFilter } from "../../components/Dropdowns/NewDropdownButton";
import type { GetOwnerDashBoardPageDTO } from "../../dto/GetOwnerDashboardPage.dto";
import type { MenuRankingDTO } from "../../dto/MenuRanking.dto";

type DashboardOverviewContextValue = {
  dayFilter: DayFilter;
  setDayFilter: React.Dispatch<React.SetStateAction<DayFilter>>;
  dashboard?: GetOwnerDashBoardPageDTO;
  menuRanking?: MenuRankingDTO;
};

export const DashboardOverviewContext =
  createContext<DashboardOverviewContextValue | null>(null);
