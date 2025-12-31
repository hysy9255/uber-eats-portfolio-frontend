import { useOutletContext } from "react-router-dom";
import BusinessInsight from "../components/BusinessInsight";
import EmbedMapIframe from "../components/EmbedMapIframe";
import MenuRankings from "../components/MenuRankings";
import OperatingHoursForDashboard from "../components/OperatingHoursForDashboard";
import OrdersComponentForDashboard from "../components/OrdersComponentForDashboard";
import { mockOrderData } from "../constants/MockOrdersData";
import type { OwnerDashboardContext } from "../components/Shells/OwnerDashboardShell";

const OwnerDashboardOverview2 = () => {
  const { restaurant } = useOutletContext<OwnerDashboardContext>();

  if (!restaurant) return null;
  return (
    <main className="flex-1 justify-center p-[10px] grid grid-cols-[2fr_1fr] gap-3">
      <article className="flex justify-between items-center relative border border-gray-300 rounded-md p-3 col-span-2">
        <div className="flex items-end gap-1">
          <h1 className="text-lg font-semibold leading-none">
            {restaurant?.dba}
          </h1>
          <p className="text-sm leading-none">
            {restaurant?.unit}, {restaurant?.streetAddress}, {restaurant?.city},{" "}
            {restaurant?.zip}{" "}
          </p>
        </div>
      </article>

      <section id="left-half" className=" space-y-3">
        <BusinessInsight />
        <MenuRankings />
      </section>
      <section id="right-half" className="space-y-3">
        <OrdersComponentForDashboard orders={mockOrderData} />
        <OperatingHoursForDashboard
          operatingHours={restaurant?.operatingHours}
        />
        <EmbedMapIframe />
      </section>
    </main>
  );
};

export default OwnerDashboardOverview2;
