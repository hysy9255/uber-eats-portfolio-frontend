import OverviewRestaurantNameCard from "../../components/Cards/OverviewRestaurantNameCard";
import OverviewBusinessInsightCard from "../../components/Cards/OverviewBusinessInsightCard";
import OverviewMenuRankingCard from "../../components/Cards/OverviewMenuRankingCard";
import { DashboardOverviewProvider } from "../../ReactContext/dashboardOverview/DashboardOverviewProvider";

const OwnerDashboardOverview = () => {
  return (
    // <div className="p-2 flex flex-col gap-2 h-[calc(100vh-60px)]">
    <DashboardOverviewProvider>
      <div className="p-2 flex flex-col gap-2">
        <OverviewRestaurantNameCard />
        <OverviewBusinessInsightCard />
        <OverviewMenuRankingCard />
        {/* <div className="grid grid-cols-1 min-[540px]:grid-cols-2 gap-2">
          <OverviewMenuRankingCard />
          <OverviewMenuRankingCard />
        </div> */}
      </div>
    </DashboardOverviewProvider>
  );
};

export default OwnerDashboardOverview;
