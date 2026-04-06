import { Link } from "react-router-dom";
import type { GetOrderForClientDTO } from "../../dto/GetOrderForClient.dto";
import { formatDateParts } from "../../utils/formatDateParts";
import { OtherIcon } from "../Icons/RegisterAddressIcons/OtherIcon";
import { OrderStatusIcon } from "../OrderStatusIcon/OrderStatusIcon";

interface ClientOrderSummaryCardProps {
  order: GetOrderForClientDTO;
}

const xPadding = "px-5";
const yPadding = "py-3";

const ClientOrderSummaryCard: React.FC<ClientOrderSummaryCardProps> = ({
  order,
}) => {
  const { date, time } = formatDateParts(order.orderInfo.createdAt);
  return (
    <Link
      to={`/client/track-order/${order.orderInfo.orderId}`}
      className="shadow-md rounded-2xl overflow-hidden border border-gray-300 bg-slate-50 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200/80"
    >
      <article className={`border-b border-gray-300 ${xPadding} gap-2`}>
        <div
          className={`border-b border-dashed border-gray-300 flex items-center gap-x-3 ${yPadding}`}
        >
          <div className="font-medium text-xs ">
            # {order.orderInfo.orderId.split("-")[0]}
          </div>
          <div className="font-medium text-md ">{order.restaurantInfo.dba}</div>
          <OrderStatusIcon status={order.orderInfo.status} />
        </div>

        <div className={`flex text-gray-800 text-md font-medium ${yPadding}`}>
          <span>
            {order.orderItems.length}{" "}
            {order.orderItems.length === 1 ? "item" : "items"}
          </span>
          <span className="mx-2">·</span>
          <span>${order.orderInfo.totalPrice}</span>
        </div>
      </article>

      <article className={`${xPadding}`}>
        <div className="flex text-sm text-gray-700">
          <div className={`border-r border-gray-300 ${yPadding} pr-5`}>
            Ordered: {date} {time}
          </div>
          <div className={`flex gap-x-1 items-center ${yPadding} pl-3`}>
            <OtherIcon size={17} className="text-gray-700 shrink-0" />

            <div className="flex gap-x-2">
              <div>Deliver To:</div>
              <div className="font-semibold">
                {order.deliveryAddressInfo?.streetAddress} {""}
                {order.deliveryAddressInfo?.apt} {""}
                {order.deliveryAddressInfo?.city} {""}
                {order.deliveryAddressInfo?.state} {""}
                {order.deliveryAddressInfo?.zip}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ClientOrderSummaryCard;
