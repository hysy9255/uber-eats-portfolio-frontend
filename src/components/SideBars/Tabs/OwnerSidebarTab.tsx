import { OwnerDashboardTabs } from "../../../constants/OwnerDashboard";
import DocumentIcon from "../../Icons/DashboardSideBarIcons/DocumentIcon/DocumentIcon";
import GearIcon from "../../Icons/DashboardSideBarIcons/GearIcon/GearIcon";
import HomeIcon from "../../Icons/DashboardSideBarIcons/HomeIcon/HomeIcon";
import ListCheckIcon from "../../Icons/DashboardSideBarIcons/ListCheckIcon/ListCheckIcon";

interface OwnerSidebarTabProps {
  title: OwnerDashboardTabs;
  selected?: boolean;
}

const OwnerSidebarTab: React.FC<OwnerSidebarTabProps> = ({
  title,
  selected,
}) => {
  const iconCss = `w-5 ${
    selected &&
    "filter contrast-125 brightness-90 drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]"
  }`;

  const baseCss =
    "hover:cursor-pointer rounded-md hover:bg-gray-100 gap-4 py-2 flex items-center pl-3";
  const notSelectedCss = `${baseCss} text-gray-700 font-medium`;
  const selectedCss = `${baseCss} bg-gray-100 text-black font-semibold`;
  return (
    <div className={selected ? selectedCss : notSelectedCss}>
      {title === OwnerDashboardTabs.OVERVIEW && (
        <HomeIcon className={iconCss} />
      )}
      {title === OwnerDashboardTabs.MENUS && (
        <DocumentIcon className={iconCss} />
      )}
      {title === OwnerDashboardTabs.ORDERS && (
        <ListCheckIcon className={iconCss} />
      )}
      {title === OwnerDashboardTabs.SETTING && <GearIcon className={iconCss} />}
      <div className="text-sm leading-none">{title}</div>
    </div>
  );
};

export default OwnerSidebarTab;
