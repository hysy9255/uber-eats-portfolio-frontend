import { useFormContext } from "react-hook-form";
import CancelButton from "./Buttons/CancelButton";
import EditButton from "./Buttons/EditButton";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import RestaurantInfoInput from "./Inputs/RestaurantInfoInput";
import TitleComp from "./TitleComp";
import type { EditRestaurantInfoForm } from "../formDataTypes/restaurant/editRestaurantInfoForm.type";
import type { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { updateRestaurant } from "../api/restaurantApi";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";
import { getToken } from "../auth";
import { useState } from "react";

interface RestaurantInformationProps {
  className?: string;
}

const RestaurantInformation: React.FC<RestaurantInformationProps> = ({
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { loadRestaurantData } = useMyRestaurant();

  const methods = useFormContext<EditRestaurantInfoForm>();

  const token = getToken();
  if (!token) throw new Error("No Token!");

  const onSubmit = async (data: EditRestaurantInfoForm) => {
    const payload: UpdateRestaurantDTO = { generalInfo: { ...data } };
    await updateRestaurant(token, payload);
    await loadRestaurantData();
    setIsEditing(false);
  };
  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    methods.reset();
    setIsEditing(false);
  };
  return (
    <div
      className={`${className} flex flex-col gap-y-3 border border-gray-300 rounded-md p-5`}
    >
      <div className="flex justify-between items-center h-[28px]">
        <TitleComp title="Restaurant Information" />
        {isEditing ? (
          <div className="flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              buttonName="Save"
              onClick={methods.handleSubmit(onSubmit)}
              className="px-3 py-1"
            />
          </div>
        ) : (
          <div className="">
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}
      </div>

      <article className="grid grid-cols-8 gap-3">
        <div className="col-span-8 grid grid-cols-9 gap-3">
          <RestaurantInfoInput
            title="Legal business name"
            isEditing={isEditing}
            fieldName="lbn"
            className="col-span-5"
          />
          <RestaurantInfoInput
            title="Doing business as (DBA)"
            isEditing={isEditing}
            fieldName="dba"
            className="col-span-4"
          />
          <RestaurantInfoInput
            title="Cuisine types"
            isEditing={isEditing}
            fieldName="cuisineType"
            className="col-span-9"
          />
          <RestaurantInfoInput
            title="Store phone"
            isEditing={isEditing}
            fieldName="storePhone"
            className="col-span-5"
          />
          <RestaurantInfoInput
            title="Business email"
            isEditing={isEditing}
            fieldName="businessEmail"
            className="col-span-4"
          />
          <RestaurantInfoInput
            title="Website (optional)"
            isEditing={isEditing}
            fieldName="website"
            isRequired={false}
            className="col-span-5"
          />
          <RestaurantInfoInput
            title="Instagram (optional)"
            isEditing={isEditing}
            fieldName="instagram"
            isRequired={false}
            className="col-span-4"
          />
        </div>
      </article>
    </div>
  );
};

export default RestaurantInformation;
