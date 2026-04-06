import { OrderStatus } from "../../constants/OrderStatus";
import { StatusRing } from "../StatusRing";
import { formatCurrency } from "../../utils/formatCurrency";
import SquareBorderXMarkButton from "../Buttons/IconBased/SquareBorderXMarkButton/SquareBorderXMarkButton";
import type { GetOrderForOwnerDTO } from "../../dto/GetOrderForOwner.dto";
import NoImgAvailable from "../Images/NoImgAvailable/NoImgAvailable";
import { orderStatusMapper } from "../../utils/orderStatusMapper";
import UpdateOrderStatusButton from "../Buttons/UpdateOrderButton";
import { getToken } from "../../auth";
import { updateOrderStatus } from "../../api/orderApi";
import { useEffect, useState } from "react";
import { useOwnerOrder } from "../../ReactContext/ownerOrder/UseOwnerOrder";

interface OrderDetailCardProps {
  handleClose: () => void;
  order?: GetOrderForOwnerDTO;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({
  handleClose,
  order,
}) => {
  const { loadOrdersData } = useOwnerOrder();
  const token = getToken();
  const [nextStatus, setNextStatus] = useState<
    | OrderStatus.Cooking
    | OrderStatus.Ready
    | OrderStatus.Delivering
    | OrderStatus.Delivered
  >();

  useEffect(() => {
    if (order?.orderInfo.status === OrderStatus.Pending)
      setNextStatus(OrderStatus.Cooking);
    if (order?.orderInfo.status === OrderStatus.Cooking)
      setNextStatus(OrderStatus.Ready);
    if (order?.orderInfo.status === OrderStatus.Ready)
      setNextStatus(OrderStatus.Delivering);
    if (order?.orderInfo.status === OrderStatus.Delivering)
      setNextStatus(OrderStatus.Delivered);
  }, [order?.orderInfo.status]);

  const handleOnClickUpdateOrder = async () => {
    if (!nextStatus || !order || !token) return;
    await updateOrderStatus(token, order.orderInfo.orderId, {
      status: nextStatus,
    });
    loadOrdersData();
    handleClose();
  };

  return (
    <article className="order-2 border border-gray-300 rounded-2xl bg-neutral-200 p-3 w-[500px] z-[200]">
      <div className="bg-stone-50 p-3 rounded-lg space-y-2">
        <section className=" bg-slate-200 rounded-lg flex gap-x-4 p-2 items-center border relative">
          <StatusRing
            current={orderStatusMapper(order?.orderInfo.status)}
            status={OrderStatus.Pending}
          />
          <div>
            <div className="font-semibold text-lg">
              {order?.orderInfo.status}
            </div>
            <div>Order is waiting to be accepted</div>
          </div>
          <SquareBorderXMarkButton
            buttonClassName="hover:cursor-pointer absolute top-2 right-2"
            imgClassName="w-5 h-5"
            onClick={handleClose}
          />
        </section>

        <section>
          <div className="text-lg font-semibold">Task Info</div>
          <div className="grid grid-cols-3">
            <div className="border-l-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">
                Preparing time
              </div>
              <div className="text-xs">00h : 25m : 30s</div>
            </div>
            <div className="border-x-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">Address</div>
              <div className="text-xs">{`${order?.deliveryAddressInfo.streetAddress} ${order?.deliveryAddressInfo.apt} ${order?.deliveryAddressInfo.city} ${order?.deliveryAddressInfo.state} ${order?.deliveryAddressInfo.zip}
              `}</div>
            </div>
            <div className="border-r-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">
                {order?.clientInfo.name}
              </div>
              <div className="text-xs">+{order?.clientInfo.phoneNumber}</div>
            </div>
          </div>
        </section>

        <section className="space-y-2 my-4 p-3 max-h-[300px] overflow-y-auto rounded-lg border border-gray-300">
          {order?.orderItems.map((orderItem, index) => (
            <div
              key={index}
              className={`
              grid grid-cols-[1fr_5fr] 
              gap-3
              text-gray-700 font-semibold text-sm  
              `}
            >
              {orderItem.dishImg ? (
                <img
                  className="aspect-4/3 rounded-lg object-cover"
                  src={orderItem.dishImg}
                />
              ) : (
                <NoImgAvailable onlyText={true} />
              )}

              <div className="border-b border-gray-300 grid grid-cols-[5fr_1fr_1fr] items-center">
                <div>
                  {orderItem.name} ({formatCurrency(orderItem.price)})
                </div>
                <div>x{orderItem.quantity}</div>
                <div className="flex justify-end">
                  {formatCurrency(orderItem.quantity * orderItem.price)}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-[3fr_1fr] gap-5">
          <div className="border border-gray-300 rounded-lg p-2 text-gray-600">
            <div className="leading-none text-sm">
              {order?.orderInfo.requestToRestaurant}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold flex justify-end">
              ${order?.orderInfo.totalPrice}
            </div>
            <UpdateOrderStatusButton
              handleOnClick={handleOnClickUpdateOrder}
              nextStatus={nextStatus}
            />
          </div>
        </section>
      </div>
    </article>
  );
};

export default OrderDetailCard;
