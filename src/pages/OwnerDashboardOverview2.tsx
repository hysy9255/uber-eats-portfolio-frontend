import DropdownButton, {
  type DropdownOptionsType,
} from "../components/DropdownButton";
import KpiButton from "../components/KpiButton";
import sampleGraph from "../images/sample-graph.png";

const kpiStats = [
  { value: "58", label: "Orders" },
  { value: "$1,240", label: "Revenue" },
  { value: "$21.45", label: "Avg. order" },
  { value: "+4", label: "New reviews" },
];

const dropdownOptions: DropdownOptionsType[] = [
  { label: "Today" },
  { label: "Yesterday" },
  { label: "Last 7 days", isDefault: true },
  { label: "Last 14 days" },
  { label: "Last 30 days" },
];

const OwnerDashboardOverview2 = () => {
  return (
    <>
      <DropdownButton options={dropdownOptions} width="w-[150px]" />
      <article className="grid grid-cols-4 gap-4">
        {kpiStats.map((stat) => (
          <KpiButton
            value={stat.value}
            label={stat.label}
            valueSize="text-xl"
            labelSize="text-md"
          />
        ))}
      </article>
      <article
        id="graph"
        className="bg-white rounded-md border border-gray-300"
      >
        <h2 className="text-xl font-medium pl-5 pt-5">Sales past 7 days</h2>
        <img className="w-full h-[345px] rounded-md" src={sampleGraph} />
      </article>
    </>
  );
};

export default OwnerDashboardOverview2;
