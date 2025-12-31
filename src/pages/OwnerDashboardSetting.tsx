import RestaurantInfoEditor from "../components/RestaurantInfoEditor";
import LocationAndOperatingHoursEditor from "../components/LocationAndOperatingHoursEditor";
import { OperatingHoursProvider } from "../ReactContext/operatingHours/OperatingHoursProvider";

const OwnerDashboardSetting = () => {
  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-3 p-3 ">
        <RestaurantInfoEditor />
        <OperatingHoursProvider>
          <LocationAndOperatingHoursEditor />
        </OperatingHoursProvider>
      </section>
    </>
  );
};

export default OwnerDashboardSetting;
