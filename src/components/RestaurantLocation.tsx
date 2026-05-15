import { useEffect, useState } from "react";
import CancelButton from "./Buttons/CancelButton";
import EditButton from "./Buttons/EditButton";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import RestaurantLocationInput from "./Inputs/RestaurantLocationInput";
import TitleComp from "./TitleComp";
import { FormProvider, useForm } from "react-hook-form";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";
import { getToken } from "../auth";
import { updateRestaurant } from "../api/restaurantApi";
import { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { UpdateRestaurantAddressDTO } from "../dtos/restaurant/UpdateRestaurantAddress.dto";
import type { EditLocationForm } from "../formDataTypes/restaurant/editLocationForm.type";

interface RestaurantLocationProps {
  className?: string;
}

const RestaurantLocation: React.FC<RestaurantLocationProps> = ({
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { restaurant, loadRestaurantData } = useMyRestaurant();

  const token = getToken();
  if (!token) throw new Error("No Token");

  const methods = useForm<EditLocationForm>({
    mode: "onSubmit",
  });

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    setIsEditing(false);
    methods.reset({
      ...restaurant?.address,
    });
  };

  const onSubmit = async (data: EditLocationForm) => {
    const payload: UpdateRestaurantDTO = new UpdateRestaurantDTO({
      address: new UpdateRestaurantAddressDTO({ ...data }),
    });
    await updateRestaurant(token, payload);
    await loadRestaurantData();
    setIsEditing(false);
  };

  useEffect(() => {
    methods.reset({
      ...restaurant?.address,
    });
  }, [restaurant, methods]);

  return (
    <div
      className={`${className} flex flex-col gap-y-3 border border-gray-300 rounded-md p-5`}
    >
      <div className="flex justify-between items-center h-[28px]">
        <TitleComp title="Location" />
        {isEditing ? (
          <div className="flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              onClick={methods.handleSubmit(onSubmit)}
              buttonName="save"
              className="px-3 py-1"
            />
          </div>
        ) : (
          <div>
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}
      </div>

      <FormProvider {...methods}>
        <div className="grid grid-cols-3 gap-2">
          <RestaurantLocationInput
            title="Street address"
            fieldName="streetAddress"
            className="col-span-2"
            isEditing={isEditing}
          />
          <RestaurantLocationInput
            title="Unit"
            fieldName="unit"
            className="col-span-1"
            isEditing={isEditing}
          />
          <RestaurantLocationInput
            title="State"
            fieldName="state"
            className="col-span-1"
            isEditing={isEditing}
          />
          <RestaurantLocationInput
            title="City"
            fieldName="city"
            className="col-span-1"
            isEditing={isEditing}
          />
          <RestaurantLocationInput
            title="Zip"
            fieldName="zip"
            className="col-span-1"
            isEditing={isEditing}
          />
        </div>
      </FormProvider>
      <div className="mt-2 text-gray-500 italic text-sm">
        We use your location and business hours to determine availability for
        delivery and pickup. Accurate details help prevent missed orders and
        provide more reliable ETA calculations for customers. This information
        helps customers find your restaurant and place orders smoothly.
      </div>
    </div>
  );
};

export default RestaurantLocation;
