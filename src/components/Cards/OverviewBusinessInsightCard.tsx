import KpiButton from "../Buttons/KpiButton";
import OwnerRevenueOverview from "../OwnerRevenueOverview";
import NewDropdownButton from "../Dropdowns/NewDropdownButton";

import { useDashboardOverview } from "../../ReactContext/dashboardOverview/UseDashboardOverview";

const OverviewBusinessInsightCard = () => {
  const { dayFilter, setDayFilter, dashboard } = useDashboardOverview();

  return (
    <div className="bg-white rounded-md p-3 flex flex-col gap-3 border border-gray-300 h-full">
      <div className="flex justify-between">
        <NewDropdownButton
          filter={dayFilter}
          setFilter={setDayFilter}
          width="w-[120px]"
        />
      </div>

      <article className="grid grid-cols-4 gap-4">
        <KpiButton
          value={String(dashboard?.orderKpi.numOfOrders)}
          label={"Orders"}
          valueSize="text-xs"
          labelSize="text-xs"
        />
        <KpiButton
          value={`$${String(dashboard?.orderKpi.revenue.toFixed(2))}`}
          label={"Total Revenue"}
          valueSize="text-xs"
          labelSize="text-xs"
        />
        <KpiButton
          value={`$${String(dashboard?.orderKpi.avgOrder.toFixed(2))}`}
          label={"Avg. order"}
          valueSize="text-xs"
          labelSize="text-xs"
        />
        <KpiButton
          value={String(dashboard?.orderKpi.numOfReviews)}
          label={"New reviews"}
          valueSize="text-xs"
          labelSize="text-xs"
        />
      </article>
      <OwnerRevenueOverview />
    </div>
  );
};

export default OverviewBusinessInsightCard;
