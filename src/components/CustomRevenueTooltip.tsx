export const CustomRevenueTooltip = (props: any) => {
  const { active, payload, label } = props;

  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0]?.payload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md">
      <div className="mb-2 text-sm font-medium text-gray-900">{label}</div>
      <div className="text-sm text-gray-700">
        Revenue:{" "}
        <span className="font-semibold">
          ${Number(data.revenue).toFixed(2)}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        # of Orders: <span className="font-semibold">{data.numOfOrders}</span>
      </div>
    </div>
  );
};
