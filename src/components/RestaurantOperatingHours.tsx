import { FormProvider, useForm } from "react-hook-form";
import { getToken } from "../auth";
import type { EditLocationAndOperatingHoursForm } from "../formDataTypes/restaurant/editLocationAndHoursForm.type";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";
import { useOperatingHours } from "../ReactContext/operatingHours/UseOperatingHours";
import { useEffect } from "react";
import { DAYS } from "../pages/types/OwnerOnBoardingStep3Location.type";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import EditButton from "./Buttons/EditButton";
import TitleComp from "./TitleComp";
import OperatingHoursEditRow from "./Rows/OperatingHoursEditRow";
import { updateRestaurant } from "../api/restaurantApi";

interface RestaurantOperatingHoursProps {
  className?: string;
}

const RestaurantOperatingHours: React.FC<RestaurantOperatingHoursProps> = ({
  className,
}) => {
  const { restaurant, loadRestaurantData } = useMyRestaurant();

  const token = getToken();
  if (!token) throw new Error("No Token");

  const { hours, setHours, isEditing, setIsEditing } = useOperatingHours();

  const methods = useForm<EditLocationAndOperatingHoursForm>({
    mode: "onSubmit",
  });

  const {
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
      <div
        className={`${className} flex flex-col gap-y-3 border border-gray-300 rounded-md p-5`}
      >
        <div className="flex justify-between items-center h-[28px]">
          <TitleComp title="Operating Hours" />
          {isEditing ? (
            <div className="flex gap-1">
              <CancelButton
                onClick={onClickCancelEdit}
                className="px-3 py-1 "
              />
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
        <section className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
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

export default RestaurantOperatingHours;
