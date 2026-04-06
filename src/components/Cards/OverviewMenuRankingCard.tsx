import { Fragment } from "react";
import { useDashboardOverview } from "../../ReactContext/dashboardOverview/UseDashboardOverview";
import {
  leastSoldMenuRankingTableColumns,
  topMenuRankingTableColumns,
} from "../../constants/MenuRankingColumns";

const OverviewMenuRankingCard = () => {
  const { menuRanking } = useDashboardOverview();

  return (
    <main className="grid grid-cols-1 min-[540px]:grid-cols-2 gap-2">
      <div className="rounded-md p-3 space-y-2 bg-white border border-gray-300">
        <div className="grid grid-cols-[auto_1fr_auto] text-sm">
          <>
            {topMenuRankingTableColumns.map((column, index) => (
              <h2
                key={index}
                className="text-sm font-semibold text-gray-600 text-nowrap p-2 border-b border-gray-300"
              >
                {column}
              </h2>
            ))}
          </>
          {menuRanking?.topOrders.map((menu, index) => (
            <Fragment key={index}>
              <div className=" text-sm  p-2">{index + 1}</div>
              <div className=" text-sm truncate p-2 hover:underline hover:cursor-pointer">
                {menu.dishName}
              </div>
              <div className=" text-sm  p-2">{menu.quantity}</div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="rounded-md p-3 space-y-2 bg-white border border-gray-300">
        <div className="grid grid-cols-[auto_1fr_auto] text-sm">
          <>
            {leastSoldMenuRankingTableColumns.map((column, index) => (
              <h2
                key={index}
                className="text-sm font-semibold text-gray-600 text-nowrap p-2 border-b border-gray-300"
              >
                {column}
              </h2>
            ))}
          </>
          {menuRanking?.leastOrders.map((menu, index) => (
            <Fragment key={index}>
              <div className=" text-sm  p-2">{index + 1}</div>
              <div className=" text-sm truncate p-2 hover:underline hover:cursor-pointer">
                {menu.dishName}
              </div>
              <div className=" text-sm  p-2">{menu.quantity}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OverviewMenuRankingCard;
