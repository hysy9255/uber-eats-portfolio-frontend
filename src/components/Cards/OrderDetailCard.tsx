import { useCallback, useEffect, useState } from "react";
import { OrderStatus } from "../../constants/OrderStatus";
import { StatusRing } from "../StatusRing";
import { getOrderDetailView } from "../../api/orderApi";
import { formatCurrency } from "../../utils/formatCurrency";
import { getToken } from "../../auth";
import SquareBorderXMarkButton from "../Buttons/IconBased/SquareBorderXMarkButton/SquareBorderXMarkButton";

interface OrderDetailCardProps {
  targetOrderId: string | null;
  onClickClose: () => void;
}

export type OrderItemDetail = {
  dishImg: string;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
};

export type OrderDetail = {
  orderId: string;
  orderItems: OrderItemDetail[];
  clientName: string;
  totalPrice: number;
  status: OrderStatus;
  requestToRestaurant: string;
};

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({
  targetOrderId,
  onClickClose,
}) => {
  const token = getToken();
  if (!token) throw new Error("No Token");

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  const loadOrderData = useCallback(async () => {
    if (targetOrderId) {
      const orderDetailData = await getOrderDetailView(token, targetOrderId);

      setOrderDetail(orderDetailData);
    }
  }, [token, targetOrderId]);

  useEffect(() => {
    loadOrderData();
  }, [loadOrderData]);

  return (
    <article className="order-2 border border-gray-300 rounded-2xl bg-neutral-200 p-3">
      <div className="bg-stone-50 p-3 rounded-lg space-y-2">
        <div className=" bg-slate-200 rounded-lg flex gap-x-4 p-2 items-center border relative">
          <StatusRing current={1} total={5} status={OrderStatus.Pending} />
          <div>
            <div className="font-semibold text-lg">{orderDetail?.status}</div>
            <div>Order is waiting to be accepted</div>
          </div>
          <SquareBorderXMarkButton
            buttonClassName="hover:cursor-pointer absolute top-2 right-2"
            imgClassName="w-5 h-5"
            onClick={onClickClose}
          />
        </div>

        <div>
          <div className="text-lg font-semibold">Task Info</div>
          <div className="grid grid-cols-3">
            <div className="border-l-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">
                Preparing time
              </div>
              <div>00h : 25m : 30s</div>
            </div>
            <div className="border-x-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">Address</div>
              <div>Lincoln street 45</div>
            </div>
            <div className="border-r-2 border-gray-200 p-3">
              <div className="text-gray-500 font-medium text-sm">
                {orderDetail?.clientName}
              </div>
              <div>+424 56778912</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 my-4">
          {orderDetail?.orderItems.map((orderItem) => (
            <div
              className={`
              grid grid-cols-[1fr_5fr] 
              gap-3
              text-gray-700 font-semibold text-sm  
              
              `}
            >
              <img className="aspect-4/3 rounded-lg" src={orderItem.dishImg} />
              <div className="border-b border-gray-300 grid grid-cols-[5fr_1fr_1fr] items-center">
                <div>
                  {orderItem.name} ({formatCurrency(orderItem.price)})
                </div>
                <div>x{orderItem.quantity}</div>
                <div className="flex justify-end">
                  {formatCurrency(orderItem.subTotal)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[3fr_1fr] gap-5">
          <div className="border border-gray-300 rounded-lg p-2 text-gray-600">
            <div className="leading-none text-sm">
              {orderDetail?.requestToRestaurant}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold flex justify-end">
              ${orderDetail?.totalPrice}
            </div>
            <div className="flex justify-end">
              <button
                className="
                bg-orange-400 hover:bg-orange-500 active:bg-orange-600 
                hover:cursor-pointer
                text-white rounded-lg py-3 px-6 font-semibold text-nowrap"
              >
                Accept order
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderDetailCard;
