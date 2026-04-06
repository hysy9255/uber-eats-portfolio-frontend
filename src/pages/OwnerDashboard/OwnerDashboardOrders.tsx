import OrderDashboardHeader from "../../components/Headers/OwnerDashboard/OrderDashboardHeader";
import OrdersTableForOwners from "../../components/Tables/OrdersTableForOwners";
import OrderDetailPopup from "../../components/PopUps/OrderDetailPopUp";
import { useOwnerOrder } from "../../ReactContext/ownerOrder/UseOwnerOrder";

const OwnerDashboardOrders = () => {
  const { selectedOrder } = useOwnerOrder();

  return (
    <>
      {selectedOrder && <OrderDetailPopup />}
      <div className="p-2 flex flex-col gap-[10px] h-[calc(100vh-60px)]">
        <OrderDashboardHeader />
        <OrdersTableForOwners className="flex-1 overflow-y-auto" />
      </div>
    </>
  );
};

export default OwnerDashboardOrders;
