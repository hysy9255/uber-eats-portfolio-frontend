import { Fragment } from "react/jsx-runtime";
import type { OwnerOnBoardingForm } from "./Layout/OwnerOnBoardLayout";
import { useFormContext, useWatch } from "react-hook-form";
import { customInputCss } from "../constants/CustomInputCss";
import Dropdown from "./Dropdowns/Dropdown";
import { OrderType } from "../constants/OrderType";

const LocationExtraInfoInputs = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<OwnerOnBoardingForm>();

  const [orderType] = useWatch({
    control: control,
    name: ["step3.orderType"],
  });

  const setOrderType = (orderTypeOption: OrderType) => {
    setValue("step3.orderType", orderTypeOption);
  };
  return (
    <Fragment>
      <div>
        <span className="text-sm font-medium">Delivery radius (km)</span>
        <input
          {...register("step3.deliveryRadius", {
            required: "Delivery radius is required",
            min: { value: 1, message: "Must be at least 1 km" },
          })}
          type="number"
          min={1}
          step={1}
          className={customInputCss}
          placeholder="5"
        />
        {errors.step3?.deliveryRadius?.message && (
          <span className="font-medium text-red-500 text-sm">
            {errors.step3.deliveryRadius.message}
          </span>
        )}
      </div>
      <div>
        <span className="text-sm font-medium">Prep time (min)</span>
        <input
          {...register("step3.prepTime", {
            required: "Preparation time is required",
            min: { value: 1, message: "Must be at least 1 min" },
          })}
          type="number"
          min={1}
          step={1}
          className={customInputCss}
          placeholder="5"
        />
        {errors.step3?.prepTime?.message && (
          <span className="font-medium text-red-500 text-sm">
            {errors.step3.prepTime.message}
          </span>
        )}
      </div>
      <div>
        <span className="text-sm font-medium">Order type</span>
        <Dropdown
          options={[
            OrderType.DeliveryAndPickup,
            OrderType.PickupOnly,
            OrderType.DeliveryOnly,
          ]}
          option={orderType}
          setOption={setOrderType}
          isEditing={true}
          isRegular={true}
        />
      </div>
    </Fragment>
  );
};

export default LocationExtraInfoInputs;
