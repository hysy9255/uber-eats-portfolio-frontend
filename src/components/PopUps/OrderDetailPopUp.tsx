import { useOwnerOrder } from "../../ReactContext/ownerOrder/UseOwnerOrder";
import OrderDetailCard from "../Cards/OrderDetailCard";

const OrderDetailPopup = () => {
  const { selectedOrder, closePopUp } = useOwnerOrder();
  return (
    <div className="fixed z-400 inset-0 bg-black/50 flex items-center justify-center">
      <OrderDetailCard handleClose={closePopUp} order={selectedOrder} />
    </div>
  );
};

export default OrderDetailPopup;
