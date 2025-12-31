import type { OwnerDashboardTabs } from "../../constants/OwnerDashboard";

interface SideBarRowProps {
  icon: string;
  label: OwnerDashboardTabs;
  selected: boolean;
}

const SideBarRow: React.FC<SideBarRowProps> = ({ icon, label, selected }) => {
  return (
    <div
      className={`hover:cursor-pointer hover:bg-gray-100 rounded-md ${
        selected && "bg-gray-100"
      }`}
    >
      <div
        className={`rounded-md flex items-center gap-2 py-2 px-2 ${
          selected ? "text-black font-semibold" : "text-gray-700 font-medium"
        }`}
      >
        <img
          className={`w-4 ${
            selected &&
            "filter contrast-125 brightness-90 drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]"
          }`}
          src={icon}
        />
        <div className="text-sm leading-none">{label}</div>
      </div>
    </div>
  );
};

export default SideBarRow;
