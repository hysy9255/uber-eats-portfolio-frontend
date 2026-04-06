import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { useDashboardOverview } from "../ReactContext/dashboardOverview/UseDashboardOverview";

const currencyFormatter = (value: number) => `$${value}`;

const OwnerRevenueOverview = () => {
  const { dashboard } = useDashboardOverview();

  const percentChange = dashboard?.revenueStats.percentChange
    ? Number(dashboard?.revenueStats.percentChange)
    : undefined;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <section className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Revenue</h2>
          <p className="mt-1 text-sm text-gray-500">
            Daily revenue trend for the selected period
          </p>
        </div>

        <div className="text-right">
          <div className="text-xl font-semibold text-gray-900">
            ${dashboard?.orderKpi.revenue.toFixed(2)}
          </div>
          {percentChange !== undefined ? (
            <div
              className={`text-sm font-medium ${
                percentChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentChange > 0 ? "+" : ""}
              {percentChange.toFixed(2)}%
            </div>
          ) : null}
        </div>
      </section>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={dashboard?.revenueStats.revenueGraphData}
            margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.38} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            {/* <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
            /> */}
            <XAxis
              dataKey="date"
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={currencyFormatter}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(value) => {
                const amount =
                  typeof value === "number" ? value : Number(value ?? 0);
                return [`$${amount.toFixed(2)}`, "Revenue"];
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            />
            {/* <Tooltip content={<CustomRevenueTooltip />} /> */}

            <Line
              type="linear"
              dataKey="revenue"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: "#ef4444" }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OwnerRevenueOverview;
