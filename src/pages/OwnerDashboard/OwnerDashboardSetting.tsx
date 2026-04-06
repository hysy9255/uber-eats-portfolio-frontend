import { FormProvider, useForm } from "react-hook-form";
import RestaurantLogo from "../../components/RestaurantLogo";
import RestaurantInformation from "../../components/RestaurantInformation";
import RestaurantCoverImages from "../../components/RestaurantCoverImages";
import RestaurantLocation from "../../components/RestaurantLocation";
import RestaurantOperatingHours from "../../components/RestaurantOperatingHours";
import RestaurantOperation from "../../components/RestaurantOperation";
import { useMyRestaurant } from "../../ReactContext/myRestaurant/UseMyRestaurant";
import type { EditRestaurantInfoForm } from "../../formDataTypes/restaurant/editRestaurantInfoForm.type";
import { useEffect } from "react";

const OwnerDashboardSetting = () => {
  const { restaurant } = useMyRestaurant();

  const methods = useForm<EditRestaurantInfoForm>({
    mode: "onSubmit",
  });

  useEffect(() => {
    methods.reset({
      ...restaurant?.restaurantSummary.generalInfo,
    });
  }, [methods, restaurant]);

  return (
    <FormProvider {...methods}>
      <section className="grid grid-cols-1 min-[1300px]:grid-cols-10 gap-2 p-2">
        <RestaurantLogo className="col-span-1 min-[1300px]:col-span-2" />
        <RestaurantInformation className="col-span-1 min-[1300px]:col-span-5" />
        <RestaurantCoverImages className="col-span-1 min-[1300px]:col-span-3" />
        <RestaurantLocation className="col-span-1 min-[1300px]:col-span-5" />
        <RestaurantOperatingHours className="col-span-1 min-[1300px]:col-span-5" />
        <RestaurantOperation className="col-span-1 min-[1300px]:col-span-5" />
      </section>
    </FormProvider>
  );
};

export default OwnerDashboardSetting;
