import OwnerSidebarTab from "./Tabs/OwnerSidebarTab";
import { Link, useLocation } from "react-router-dom";
import { ownerSidebarTabs } from "../../constants/OwnerDashboard";
import SideBarShell from "../Shells/SideBarShell";

interface OwnerSideBarProps {
  className?: string;
  sideBarWidth: string;
}

const OwnerSideBar: React.FC<OwnerSideBarProps> = ({
  className,
  sideBarWidth,
}) => {
  const { pathname } = useLocation();

  return (
    <SideBarShell className={className} sideBarWidth={sideBarWidth}>
      <div>
        {ownerSidebarTabs.map((sidebarTab) => (
          <Link to={`${sidebarTab.link}`} key={sidebarTab.label}>
            <OwnerSidebarTab
              title={sidebarTab.label}
              selected={pathname === sidebarTab.link}
            />
          </Link>
        ))}
      </div>
    </SideBarShell>
  );
};

export default OwnerSideBar;
