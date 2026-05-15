import TitleComp from "./TitleComp";
import RestaurantImgUploadZone from "./RestaurantImgUploadZone";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton/SubmitButton";
import EditButton from "./Buttons/EditButton";
import { useState } from "react";
import { getToken } from "../auth";
import { useFormContext } from "react-hook-form";
import type { EditRestaurantInfoForm } from "../formDataTypes/restaurant/editRestaurantInfoForm.type";
import { UpdateRestaurantDTO } from "../dtos/restaurant/UpdateRestaurant.dto";
import { updateRestaurant } from "../api/restaurantApi";
import { useMyRestaurant } from "../ReactContext/myRestaurant/UseMyRestaurant";
import { UpdateRestaurantGeneralInfoDTO } from "../dtos/restaurant/UpdateRestaurantGeneralInfo.dto";

interface RestaurantCoverImagesProps {
  className?: string;
}

const RestaurantCoverImages: React.FC<RestaurantCoverImagesProps> = ({
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { loadRestaurantData } = useMyRestaurant();

  const methods = useFormContext<EditRestaurantInfoForm>();

  const token = getToken();
  if (!token) throw new Error("No Token!");

  const onSubmit = async (data: EditRestaurantInfoForm) => {
    const payload: UpdateRestaurantDTO = new UpdateRestaurantDTO({
      generalInfo: new UpdateRestaurantGeneralInfoDTO({ ...data }),
    });
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
      className={`${className} flex flex-col gap-y-3 col-span-1 border border-gray-300 rounded-md p-5`}
    >
      <div className="flex justify-between items-center h-[28px]">
        <TitleComp title="Cover Images" />
        {isEditing ? (
          <div className="flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              buttonName="save"
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

      <article className="">
        <section className="">
          <div className=" grid grid-cols-3 gap-3">
            <RestaurantImgUploadZone
              titleName="Main"
              className=""
              field="mainImgUrl"
              aspect="aspect-square"
              isEditing={isEditing}
            />
            <RestaurantImgUploadZone
              titleName="Sub #1"
              className=""
              field="sub1ImgUrl"
              aspect="aspect-square"
              isEditing={isEditing}
            />
            <RestaurantImgUploadZone
              titleName="Sub #2"
              className=""
              field="sub2ImgUrl"
              aspect="aspect-square"
              isEditing={isEditing}
            />
            <RestaurantImgUploadZone
              titleName="Banner"
              className=" col-span-3"
              field="bannerImgUrl"
              aspect="aspect-[4/1]"
              isEditing={isEditing}
            />
          </div>
        </section>
      </article>
      <div className="mt-2 text-gray-500 italic text-sm line-clamp-2">
        Upload images that reflect your brand, signature dishes, and dining
        experience.
      </div>
    </div>
  );
};

export default RestaurantCoverImages;
