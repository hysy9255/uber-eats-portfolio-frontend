import SideBarRow from "./SideBarRow";
import { Link, useLocation } from "react-router-dom";
import { sidebarTabOptions } from "../constants/OwnerDashboard";

const OwnerDashboardSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside>
      {sidebarTabOptions.map((sidebarTabOption) => (
        <Link to={`${sidebarTabOption.link}`} key={sidebarTabOption.label}>
          <SideBarRow
            icon={sidebarTabOption.icon}
            label={sidebarTabOption.label}
            selected={pathname === sidebarTabOption.link}
          />
        </Link>
      ))}
    </aside>
  );
};

export default OwnerDashboardSidebar;
