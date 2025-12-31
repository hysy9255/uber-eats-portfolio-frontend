import { useState } from "react";
import AppleStockWidget from "./AppleStockWidget";
import DropdownButton from "./Dropdowns/DropdownButton";
import KpiButton from "./Buttons/KpiButton";

const kpiStats = [
  { value: "58", label: "Orders" },
  { value: "$1,240", label: "Revenue" },
  { value: "$21.45", label: "Avg. order" },
  { value: "+4", label: "New reviews" },
];

enum DayFilter {
  today = "Today",
  yesterday = "Yesterday",
  last7days = "Last 7 days",
  last14days = "Last 14 days",
  last30days = "Last 30 days",
}

const dayFilterOptions: DayFilter[] = [
  DayFilter.today,
  DayFilter.yesterday,
  DayFilter.last7days,
  DayFilter.last14days,
  DayFilter.last30days,
];

const BusinessInsight = () => {
  const [dayFilter, setDayFilter] = useState<DayFilter>(DayFilter.last7days);
  return (
    <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="text-sm font-semibold flex items-center">
          Business Insights
        </h1>
        <DropdownButton
          filter={dayFilter}
          setFilter={setDayFilter}
          options={dayFilterOptions}
          width="w-[120px]"
        />
      </div>

      <article className="grid grid-cols-4 gap-4">
        {kpiStats.map((stat, index) => (
          <KpiButton
            key={index}
            value={stat.value}
            label={stat.label}
            valueSize="text-xs"
            labelSize="text-xs"
          />
        ))}
      </article>
      <AppleStockWidget />
    </div>
  );
};

export default BusinessInsight;
