import { useEffect, useState } from "react";
import { OrderStatus } from "../../constants/OrderStatus";
import BlankCircleIcon from "./BlankCircleIcon";
import SuccessIcon from "./SuccessIcon";
import type { GetOrderForClientDTO } from "../../dto/GetOrderForClient.dto";
import { socket } from "../../socket";

const iconRadius = 40;
const lineHeight = 6;
const lineWidth = 400;
const iconTopFix = lineHeight / 2;
const textTopFix = (iconRadius * 2) / 3;

const trackerConfig: Record<
  OrderStatus,
  { lineWidth: number; order: number; leftPos: string }
> = {
  [OrderStatus.Pending]: {
    lineWidth: lineWidth * 0,
    order: 0,
    leftPos: "left-0",
  },
  [OrderStatus.Cooking]: {
    lineWidth: lineWidth * (1 / 3),
    order: 1,
    leftPos: "left-1/3",
  },
  [OrderStatus.Ready]: {
    lineWidth: lineWidth * (1 / 3),
    order: 1,
    leftPos: "left-1/3",
  },
  [OrderStatus.Delivering]: {
    lineWidth: lineWidth * (2 / 3),
    order: 2,
    leftPos: "left-2/3",
  },
  [OrderStatus.Delivered]: {
    lineWidth: lineWidth * (3 / 3),
    order: 3,
    leftPos: "left-3/3",
  },
};

interface OrderTrackerProps {
  order?: GetOrderForClientDTO;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    OrderStatus.Pending
  );

  useEffect(() => {
    const onOrderStatusChanged = (payload: {
      orderId: string;
      status: OrderStatus;
    }) => {
      if (payload.orderId === order?.orderInfo.orderId) {
        setCurrentStatus(payload.status);
      }
    };

    socket.on("order.statusChanged", onOrderStatusChanged);

    socket.emit("joinOrderRoom", { orderId: order?.orderInfo.orderId });

    return () => {
      socket.off("order.statusChanged", onOrderStatusChanged);
    };
  }, [order?.orderInfo.orderId]);

  useEffect(() => {
    if (!order) return;
    setCurrentStatus(order.orderInfo.status);
  }, [order]);

  return (
    <div className="px-10 pt-10 pb-15 flex items-center justify-center">
      <div
        className={`bg-[#DEDCDE] relative`}
        style={{ width: lineWidth, height: lineHeight }}
      >
        <div
          className={`bg-[#3ACF5E] absolute`}
          style={{
            width: trackerConfig[currentStatus].lineWidth,
            height: lineHeight,
          }}
        />
        {currentStatus === OrderStatus.Pending ||
        trackerConfig[currentStatus].order > 0 ? (
          <SuccessIcon
            size={iconRadius}
            className={`absolute left-0 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        ) : (
          <BlankCircleIcon
            size={iconRadius}
            className={`absolute left-0 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        )}
        <div
          className={`absolute left-0 -translate-x-1/2 font-medium text-black-/80`}
          style={{ top: textTopFix }}
        >
          Pending
        </div>

        {currentStatus === OrderStatus.Cooking ||
        currentStatus === OrderStatus.Ready ||
        trackerConfig[currentStatus].order > 1 ? (
          <SuccessIcon
            size={iconRadius}
            className={`absolute left-1/3 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        ) : (
          <BlankCircleIcon
            size={iconRadius}
            className={`absolute left-1/3 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        )}
        <div
          className="absolute left-1/3 -translate-x-1/2 font-medium text-black-/80"
          style={{ top: textTopFix }}
        >
          Cooking
        </div>

        {currentStatus === OrderStatus.Delivering ||
        trackerConfig[currentStatus].order > 2 ? (
          <SuccessIcon
            size={iconRadius}
            className={`absolute left-2/3 -translate-x-1/2 -translate-y-1/2 `}
            style={{ top: iconTopFix }}
          />
        ) : (
          <BlankCircleIcon
            size={iconRadius}
            className={`absolute left-2/3 -translate-x-1/2 -translate-y-1/2 `}
            style={{ top: iconTopFix }}
          />
        )}
        <div
          className="absolute left-2/3 -translate-x-1/2 font-medium text-black-/80"
          style={{ top: textTopFix }}
        >
          Deliverying
        </div>

        {currentStatus === OrderStatus.Delivered ||
        trackerConfig[currentStatus].order > 3 ? (
          <SuccessIcon
            size={iconRadius}
            className={`absolute left-3/3 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        ) : (
          <BlankCircleIcon
            size={iconRadius}
            className={`absolute left-3/3 -translate-x-1/2 -translate-y-1/2`}
            style={{ top: iconTopFix }}
          />
        )}
        <div
          className="absolute left-3/3 -translate-x-1/2 font-medium text-black-/80"
          style={{ top: textTopFix }}
        >
          Delivered
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
