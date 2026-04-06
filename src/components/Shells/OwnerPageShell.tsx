import { Outlet } from "react-router-dom";
import { MenusProvider } from "../../ReactContext/ownerDashboardMenus/MenusProvider";
import { MyRestaurantProvider } from "../../ReactContext/myRestaurant/MyRestaurantProvider";
import { OperatingHoursProvider } from "../../ReactContext/operatingHours/OperatingHoursProvider";
import { OwnerOrderProvider } from "../../ReactContext/ownerOrder/OwnerOrderProvider";
import OwnerLayout from "../Layout/OwnerLayout";

const OwnerPageShell = () => {
  return (
    <MyRestaurantProvider>
      <OwnerOrderProvider>
        <MenusProvider>
          <OperatingHoursProvider>
            <OwnerLayout>
              <Outlet />
            </OwnerLayout>
          </OperatingHoursProvider>
        </MenusProvider>
      </OwnerOrderProvider>
    </MyRestaurantProvider>
  );
};

export default OwnerPageShell;
