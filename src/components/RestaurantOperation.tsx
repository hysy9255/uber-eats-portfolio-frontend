import { useState } from "react";
import { OrderType } from "../constants/OrderType";
import Dropdown from "./Dropdowns/Dropdown";
import RestaurantInfoInput from "./Inputs/RestaurantInfoInput";
import TitleComp from "./TitleComp";
import { useFormContext, useWatch } from "react-hook-form";
import type { EditRestaurantInfoForm } from "../formDataTypes/restaurant/editRestaurantInfoForm.type";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import EditButton from "./Buttons/EditButton";
import type { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { getToken } from "../auth";
import { updateRestaurant } from "../api/restaurantApi";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";

interface RestaurantOperationProps {
  className?: string;
}

const RestaurantOperation: React.FC<RestaurantOperationProps> = ({
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { loadRestaurantData } = useMyRestaurant();

  const methods = useFormContext<EditRestaurantInfoForm>();

  const token = getToken();
  if (!token) throw new Error("No Token!");

  const [orderType] = useWatch({
    control: methods.control,
    name: ["orderType"],
  });

  const setOrderType = (orderTypeOption: OrderType) => {
    methods.setValue("orderType", orderTypeOption);
  };

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
        <TitleComp title="Operations" />
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
          <div>
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}
      </div>

      <article className="grid grid-cols-3 gap-3">
        <RestaurantInfoInput
          title="Delivery radius (km)"
          isEditing={isEditing}
          fieldName="deliveryRadius"
          isRequired={true}
          valueAsNumber={true}
        />
        <RestaurantInfoInput
          title="Prep time (min)"
          isEditing={isEditing}
          fieldName="prepTime"
          isRequired={true}
          valueAsNumber={true}
        />
        <div className="space-y-1">
          <h2 className="text-sm text-gray-700">Order type</h2>
          <Dropdown
            options={[
              OrderType.DeliveryAndPickup,
              OrderType.DeliveryOnly,
              OrderType.PickupOnly,
            ]}
            option={orderType}
            setOption={setOrderType}
            isEditing={isEditing}
          />
        </div>
      </article>
      <div className="mt-2 text-gray-500 italic text-sm">
        These settings define how your restaurant handles incoming orders.
        Delivery radius, prep time, and order type help customers understand
        availability and expected wait times before checkout.
      </div>
    </div>
  );
};

export default RestaurantOperation;
