import { FormProvider, useForm } from "react-hook-form";
import { getToken } from "../auth";
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
import type { EditOperatingHoursForm } from "../formDataTypes/restaurant/editHoursForm.type";
import { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { UpdateOperatingHoursDTO } from "../dtos/restaurant/UpdateOperatingHours.dto";

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

  const methods = useForm<EditOperatingHoursForm>({
    mode: "onSubmit",
  });

  const {
    setError,
    formState: { errors },
    clearErrors,
  } = methods;

  useEffect(() => {
    if (!hours) return;

    methods.reset({
      Mon: hours.Mon,
      Tue: hours.Tue,
      Wed: hours.Wed,
      Thu: hours.Thu,
      Fri: hours.Fri,
      Sat: hours.Sat,
      Sun: hours.Sun,
    });
  }, [hours, methods]);

  const onClickEdit = () => {
    clearErrors();
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    clearErrors();
    setIsEditing(false);
    setHours(restaurant?.operatingHours);
  };

  const onSubmit = async (data: EditOperatingHoursForm) => {
    for (const day of DAYS) {
      const h = hours[day];
      if (!h.open24 && !h.closed) {
        if (!h.open || !h.close) {
          setError(day, {
            type: "manual",
            message: "Please fill open/close time or mark as Open 24 / Closed",
          });
          return;
        }
      }
    }
    const payload = new UpdateRestaurantDTO({
      operatingHours: new UpdateOperatingHoursDTO({ ...data }),
    });

    await updateRestaurant(token, payload);
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
            {Object.keys(errors).length > 0 && (
              <p className="text-xs text-rose-600">
                Make sure all fields are selected
              </p>
            )}
          </div>
        </section>
      </div>
    </FormProvider>
  );
};

export default RestaurantOperatingHours;
