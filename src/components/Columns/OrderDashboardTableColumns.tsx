interface OrderDashboardTableColumnsProps {
  tableColumnCss: string;
  className?: string;
}

const OrderDashboardTableColumns: React.FC<OrderDashboardTableColumnsProps> = ({
  tableColumnCss,
  className,
}) => {
  return (
    <h3
      className={`${className} border border-gray-300 bg-stone-50 rounded-md text-sm font-semibold py-3 px-5 gap-3 grid ${tableColumnCss}`}
    >
      <div>Order ID</div>
      <div>Date</div>
      <div>Time</div>
      <div>Status</div>
      <div>Customer's Note</div>
      <div>Ordered By</div>
      <div>Driver</div>
      <div className="text-right">Total</div>
    </h3>
  );
};

export default OrderDashboardTableColumns;
