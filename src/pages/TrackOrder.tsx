import OrderTracker from "../components/Icons/OrderTracker";
import TrackOrderSummaryCard from "../components/TrackOrderSummaryCard";
import { useClientOrder } from "../ReactContext/clientOrder/UseClientOrder";

const TrackOrder = () => {
  const { order } = useClientOrder();

  return (
    <main className={`max-w-[1000px] mx-auto`}>
      <div className="font-semibold text-black/80 text-2xl text-center py-5">
        Track Order
      </div>

      <OrderTracker order={order} />
      <div className="grid grid-cols-1 min-[811px]:grid-cols-2 gap-2">
        <TrackOrderSummaryCard order={order} />
      </div>
    </main>
  );
};

export default TrackOrder;
