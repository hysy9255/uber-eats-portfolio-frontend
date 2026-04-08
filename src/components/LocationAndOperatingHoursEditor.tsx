import { useEffect } from "react";
import { DAYS } from "../pages/types/OwnerOnBoardingStep3Location.type";
import TitleComp from "./TitleComp";
import { FormProvider, useForm } from "react-hook-form";
import CancelButton from "./Buttons/CancelButton";
import EditButton from "./Buttons/EditButton";
import { updateRestaurant } from "../api/restaurantApi";
import { getToken } from "../auth";
// import RestaurantLocationInput from "./Inputs/RestaurantLocationInput";
import { useOperatingHours } from "../ReactContext/operatingHours/UseOperatingHours";
import OperatingHoursEditRow from "./Rows/OperatingHoursEditRow";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import type { EditLocationAndOperatingHoursForm } from "../formDataTypes/restaurant/editLocationAndHoursForm.type";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";

const LocationAndOperatingHoursEditor = () => {
  const { restaurant, loadRestaurantData } = useMyRestaurant();

  const token = getToken();
  if (!token) throw new Error("No Token");

  const { hours, setHours, isEditing, setIsEditing } = useOperatingHours();

  const methods = useForm<EditLocationAndOperatingHoursForm>({
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
  } = methods;

  useEffect(() => {
    reset({
      address: {
        ...restaurant?.restaurantSummary.address,
      },
    });
  }, [restaurant, reset]);

  useEffect(() => {
    setValue("operatingHours", hours);
    clearErrors("operatingHours");
  }, [hours, setValue, clearErrors]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    setIsEditing(false);
    reset({
      address: {
        ...restaurant?.restaurantSummary.address,
      },
    });
    setHours(restaurant?.restaurantSummary.operatingHours);
  };

  const onSubmit = async (data: EditLocationAndOperatingHoursForm) => {
    for (const day of DAYS) {
      const h = hours[day];
      if (!h.open24 && !h.closed) {
        if (!h.open || !h.close) {
          setError("operatingHours", {
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

  return (
    <FormProvider {...methods}>
      <div className="relative bg-white rounded-lg p-4 space-y-5">
        {isEditing ? (
          <div className="absolute right-4 top-4 flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              buttonName="save"
              className="px-3 py-1"
            />
          </div>
        ) : (
          <div className="absolute right-4 top-4">
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}
        <section className="grid grid-cols-2 gap-5 p-5">
          <div className="col-span-2">
            <TitleComp title="Operating Hours" />
            <article className="space-y-2 mt-3">
              {DAYS.map((day) => (
                <OperatingHoursEditRow key={day} day={day} />
              ))}
            </article>
            {errors.operatingHours && (
              <p className="text-xs text-rose-600">
                {String(errors.operatingHours.message)}
              </p>
            )}
          </div>
        </section>
      </div>
    </FormProvider>
  );
};

export default LocationAndOperatingHoursEditor;
