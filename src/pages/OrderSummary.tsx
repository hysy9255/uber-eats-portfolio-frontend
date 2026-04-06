import { useState } from "react";
import { getToken } from "../auth";
import CheckoutButton from "../components/Buttons/CheckoutButton";
import AddressCard from "../components/Cards/AddressCard";
import DeliveryTypeComponent from "../components/DeliveryTypeComponent";
import OrderRequest from "../components/OrderRequest";
import { useCart } from "../ReactContext/cart/UseCart";
import { DeliveryType } from "../constants/DeliveryTypeEnums";

const OrderSummary = () => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.free
  );

  const { cart, calculatTotalCost } = useCart();

  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }

  const deliveryFee = 4.75;

  const calculateFinalPrice = () => {
    const subTotal = calculatTotalCost();
    if (deliveryType === DeliveryType.direct) {
      return subTotal + deliveryFee;
    } else {
      return subTotal;
    }
  };

  return (
    <aside className="bg-gray-100 py-10 px-5">
      <article className="font-semibold text-xl mb-5 leading-none">
        Order Summary
      </article>
      <article className="text-sm font-semibold text-gray-600 py-5 space-y-4 border-y-2 border-gray-300">
        <div className="flex justify-between leading-none">
          <h2>ITEMS {cart.cartItems.length}</h2>
          <div>${calculatTotalCost().toFixed(2)}</div>
        </div>
        <div className="space-y-2 leading-none">
          <h2>ADDRESS</h2>
          <AddressCard />
        </div>
        <div className="space-y-2">
          <DeliveryTypeComponent
            onClick={() => {
              setDeliveryType(DeliveryType.free);
            }}
            deliveryTypeState={deliveryType}
            assignedDeliveryType={DeliveryType.free}
            cost="Free"
            eta="35-45 mins"
            title="Free Delivery"
          />
          <DeliveryTypeComponent
            onClick={() => {
              setDeliveryType(DeliveryType.direct);
            }}
            deliveryTypeState={deliveryType}
            assignedDeliveryType={DeliveryType.direct}
            cost={`+ $${deliveryFee}`}
            eta="20-30 mins"
            title="Direct Delivery"
          />
        </div>
        <div>
          <OrderRequest />
        </div>
      </article>
      <article className="text-sm font-semibold text-gray-600 py-5 space-y-5">
        <div className="flex justify-between leading-none">
          <h2>TOTAL COST</h2>
          <div>${calculateFinalPrice().toFixed(2)}</div>
        </div>
        <CheckoutButton deliveryType={deliveryType} />
      </article>
    </aside>
  );
};

export default OrderSummary;
