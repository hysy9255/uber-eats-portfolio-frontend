import { Fragment } from "react/jsx-runtime";
import { OrderStatus } from "../../constants/OrderStatus";
import OrderDashboardTableColumns from "../Columns/OrderDashboardTableColumns";
import OrderRow from "../Rows/OrderRow";
import { useOwnerOrder } from "../../ReactContext/ownerOrder/UseOwnerOrder";

interface OrdersTableForOwnersProps {
  className?: string;
}

const OrdersTableForOwners: React.FC<OrdersTableForOwnersProps> = ({
  className,
}) => {
  const { orders, handleViewOrder } = useOwnerOrder();

  const titles = {
    [OrderStatus.Pending]: `New Orders`,
    [OrderStatus.Cooking]: `Preparing`,
    [OrderStatus.Ready]: `Ready For Delivery`,
    [OrderStatus.Delivering]: `On the way to customer`,
    [OrderStatus.Delivered]: `Delivered`,
  };

  const tableColumnCss = "grid-cols-[1fr_1fr_1fr_1fr_2fr_1.5fr_1.5fr_0.5fr]";

  return (
    <article className={`${className}`}>
      <OrderDashboardTableColumns
        className="sticky top-0"
        tableColumnCss={tableColumnCss}
      />
      {/* <div className="flex-1 overflow-y-auto min-h-0"> */}
      <div>
        {Object.entries(orders).map(([status, ods], index) => (
          <Fragment key={index}>
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              {titles[status as OrderStatus]} ({ods.length})
            </div>

            {ods.map((od, index) => (
              <OrderRow
                key={od.orderInfo.orderId}
                onClickViewOrder={handleViewOrder}
                order={od}
                className={`${ods.length > index + 1 ? "mb-1" : "mb-0"}`}
                tableColumnCss={tableColumnCss}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </article>
  );
};

export default OrdersTableForOwners;
