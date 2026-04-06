import { useNavigate } from "react-router-dom";
import { PhoneIcon } from "../components/Icons/PhoneIcon";
import { PinIcon } from "../components/Icons/PinIcon";
import { SuccessBadgeIcon } from "../components/Icons/SuccessBadgeIcon";
import { UserIcon } from "../components/Icons/UserIcon";
import { useClientOrder } from "../ReactContext/clientOrder/UseClientOrder";

const OrderConfirm = () => {
  const { order } = useClientOrder();
  const navigate = useNavigate();

  return (
    <main className={`max-w-[1000px] mx-auto`}>
      <div className="border-b border-gray-300 flex flex-col items-center justify-center py-5">
        <SuccessBadgeIcon size={120} />
        <div className="font-semibold text-black/80 text-xl">
          Order Confirmed!
        </div>
      </div>
      <div className="flex flex-col gap-2 py-10 px-3">
        <div className="flex gap-x-3">
          <div className="rounded-full bg-red-500 p-1 border border-red-300">
            <PinIcon className="text-white" strokeWidth={1.5} size={15} />
          </div>

          <div className="font-semibold text-black/80 text-sm flex items-center justify-center">
            {order?.restaurantInfo.dba}
          </div>
        </div>
        <div className="flex gap-x-3">
          <div className="rounded-full bg-green-500 p-1 border border-green-300">
            <PhoneIcon className="text-white" strokeWidth={1.5} size={15} />
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <div className=" text-black/70 text-sm">Estimated Delivery:</div>
            <div className="font-semibold text-black/80 text-sm">
              {order?.restaurantInfo.eta} -{" "}
              {Number(order?.restaurantInfo.eta) + 10} mins
            </div>
          </div>
        </div>
        <div className="flex gap-x-3">
          <div className="rounded-full bg-gray-500 p-1 border border-gray-300">
            <UserIcon className="text-white" size={15} />
          </div>
          <div className="flex gap-x-1 items-center justify-center">
            <div className="text-black/70 text-sm">Order</div>
            <div className="text-black/90 text-sm">
              #{order?.orderInfo.orderId.split("-")[0]}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 p-5 rounded-lg">
        <div className="font-semibold text-black/80 text-md">Order Summary</div>
        <div className="py-5 border-b border-slate-300 max-h-[200px] overflow-y-auto text-md">
          {order?.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="grid grid-cols-[1fr_auto] gap-x-2">
                <div className="">{item.quantity}x</div>
                <div className="italic">{item.name}</div>
              </div>
              <div>$ {item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-md font-semibold text-black/80 pt-3">
          <div>Total: </div>
          <div>$ {order?.orderInfo.totalPrice}</div>
        </div>
      </div>
      <div className="flex gap-x-2 py-5 justify-end">
        <button
          onClick={() =>
            navigate(`/client/track-order/${order?.orderInfo.orderId}`)
          }
          className="py-2 px-7 bg-green-600 text-white rounded-md hover:cursor-pointer text-sm"
        >
          Track Order
        </button>

        <button
          onClick={() => navigate("/client/restaurants")}
          className="py-2 px-7 border border-slate-300 text-black/70 rounded-md hover:cursor-pointer text-sm"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default OrderConfirm;
