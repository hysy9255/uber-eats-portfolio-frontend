import { useEffect } from "react";
import {
  DAYS,
  type Day,
  type DayHours,
} from "../pages/types/OwnerOnBoardingStep3Location.type";
import TitleComp from "./TitleComp";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton";
import EditButton from "./Buttons/EditButton";
import { useOutletContext } from "react-router-dom";
import type { OwnerDashboardContext } from "./Shells/OwnerDashboardShell";
import { updateRestaurant } from "../api/restaurantApi";
import { getToken } from "../auth";
import RestaurantLocationInput from "./Inputs/RestaurantLocationInput";
import { useOperatingHours } from "../ReactContext/operatingHours/UseOperatingHours";
import {
  OrderTypeOptions,
  PrepTimeOptions,
} from "../pages/types/constant.enums.type";
import { customEditInputCss } from "../constants/CustomInputCss";
import Dropdown3 from "./Dropdowns/Dropdown3";
import { DayHoursRow5 } from "./Rows/DayHoursRow5";

export interface LocationAndOperatingHoursEditForm {
  streetAddress: string;
  unit: string;
  state: string;
  city: string;
  zip: string;
  deliveryRadius: string;
  prepTime: PrepTimeOptions;
  orderType: OrderTypeOptions;
  hours: Record<Day, DayHours>;
}

const LocationAndOperatingHoursEditor = () => {
  const { restaurant, loadRestaurantData } =
    useOutletContext<OwnerDashboardContext>();

  const token = getToken();
  if (!token) throw new Error("No Token");

  const { hours, setHours, initialHours, isEditing, setIsEditing } =
    useOperatingHours();

  const methods = useForm<LocationAndOperatingHoursEditForm>({
    mode: "onSubmit",
    defaultValues: {
      streetAddress: "",
      unit: "",
      state: "",
      city: "",
      zip: "",
      deliveryRadius: "",
      prepTime: PrepTimeOptions.tenToFifteen,
      orderType: OrderTypeOptions.deliveryAndPickup,
      hours: initialHours,
    },
  });

  useEffect(() => {
    methods.reset({
      streetAddress: restaurant?.streetAddress || "",
      unit: restaurant?.unit || "",
      state: restaurant?.state || "",
      city: restaurant?.city || "",
      zip: restaurant?.zip || "",
      deliveryRadius: restaurant?.deliveryRadius
        ? String(restaurant.deliveryRadius)
        : "",
      prepTime: restaurant?.prepTime || PrepTimeOptions.tenToFifteen,
      orderType: restaurant?.orderType || OrderTypeOptions.deliveryAndPickup,
      hours: initialHours,
    });
  }, [initialHours, restaurant, methods]);

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
  } = methods;

  useEffect(() => {
    setValue("hours", hours);
    clearErrors("hours");
  }, [hours, setValue, clearErrors]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    setIsEditing(false);
    reset();
    setHours(initialHours);
  };

  const onSubmit = async (data: LocationAndOperatingHoursEditForm) => {
    for (const day of DAYS) {
      const h = hours[day];
      if (!h.open24 && !h.closed) {
        if (!h.open || !h.close) {
          setError("hours", {
            type: "manual",
            message: "Please fill open/close time or mark as Open 24 / Closed",
          });
          return;
        }
      }
    }

    await updateRestaurant(token, {
      ...data,
    });
    await loadRestaurantData();
    setIsEditing(false);
  };

  const [prepTime, orderType] = useWatch({
    control: methods.control,
    name: ["prepTime", "orderType"],
  });

  const setPrepTime = (prepTimeOption: PrepTimeOptions) => {
    methods.setValue("prepTime", prepTimeOption);
  };

  const setOrderType = (orderTypeOption: OrderTypeOptions) => {
    methods.setValue("orderType", orderTypeOption);
  };

  return (
    <FormProvider {...methods}>
      <div className="relative border border-gray-300 rounded-md p-4 space-y-5">
        {isEditing ? (
          <div className="absolute right-4 top-4 flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              buttonName="Submit"
              className="px-3 py-1"
            />
          </div>
        ) : (
          <div className="absolute right-4 top-4">
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}

        <section className="space-y-4">
          <TitleComp title="Location" />
          <article className="grid grid-cols-3 gap-3">
            <RestaurantLocationInput
              title="Street address"
              fieldName="streetAddress"
              className="col-span-2"
            />
            <RestaurantLocationInput
              title="Unit"
              fieldName="unit"
              className="col-span-1"
            />
            <RestaurantLocationInput
              title="State"
              fieldName="state"
              className="col-span-1"
            />
            <RestaurantLocationInput
              title="City"
              fieldName="city"
              className="col-span-1"
            />
            <RestaurantLocationInput
              title="Zip"
              fieldName="zip"
              className="col-span-1"
            />
          </article>
        </section>

        <section className="space-y-4">
          <TitleComp title="Order Setting" />
          <div className="grid grid-cols-3 gap-3">
            <div>
              <h2 className="text-sm text-gray-700">Delivery radius (km)</h2>
              <input
                {...methods.register("deliveryRadius", {
                  required: "Delivery radius is required",
                  min: { value: 1, message: "Must be at least 1 km" },
                })}
                type="number"
                min={1}
                step={1}
                className={`${customEditInputCss} ${
                  isEditing
                    ? "border-blue-300 text-gray-900"
                    : "border-gray-300 text-gray-500"
                }`}
                disabled={!isEditing}
              />
              {methods.formState.errors.deliveryRadius?.message && (
                <span className="font-medium text-red-500 text-sm">
                  {methods.formState.errors.deliveryRadius?.message}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-sm text-gray-700">Prep time (avg)</h2>
              <Dropdown3
                options={[
                  PrepTimeOptions.tenToFifteen,
                  PrepTimeOptions.fifteenToTwenty,
                  PrepTimeOptions.twentyToThirty,
                ]}
                option={prepTime}
                setOption={setPrepTime}
                isEditing={isEditing}
              />
            </div>
            <div>
              <h2 className="text-sm text-gray-700">Order type</h2>
              <Dropdown3
                options={[
                  OrderTypeOptions.deliveryAndPickup,
                  OrderTypeOptions.deliveryOnly,
                  OrderTypeOptions.pickupOnly,
                ]}
                option={orderType}
                setOption={setOrderType}
                isEditing={isEditing}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <TitleComp title="Operating Hours" />
          <article className="space-y-2">
            {DAYS.map((day) => (
              <DayHoursRow5 key={day} day={day} />
            ))}
          </article>
          {errors.hours && (
            <p className="text-xs text-rose-600">
              {String(errors.hours.message)}
            </p>
          )}
        </section>
      </div>
    </FormProvider>
  );
};

export default LocationAndOperatingHoursEditor;
