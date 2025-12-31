import { useEffect, useState } from "react";
import TitleComp from "./TitleComp";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { updateRestaurant } from "../api/restaurantApi";
import { getToken } from "../auth";
import EditButton from "./Buttons/EditButton";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton";
import { useOutletContext } from "react-router-dom";
import type { OwnerDashboardContext } from "./Shells/OwnerDashboardShell";
import RestaurantInfoInput from "./Inputs/RestaurantInfoInput";
import RestaurantLogoUploadZone from "./UploadZones/RestaurantLogoUploadZone";
import RhfImageUploadZone from "./UploadZones/RhfImageUploadZone";
// import RhfImageUploadZone from "./RhfImageUploadZone";
// import RestaurantLogoUploadZone from "./RestaurantLogoUploadZone";

export interface RestaurantInfoEditForm {
  logo: string | null;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website: string | null;
  instagram: string | null;
  mainImgUrl: string | null;
  sub1ImgUrl: string | null;
  sub2ImgUrl: string | null;
  bannerImgUrl: string | null;
}

const RestaurantInfoEditor = () => {
  const { restaurant, loadRestaurantData } =
    useOutletContext<OwnerDashboardContext>();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const token = getToken();
  if (!token) throw new Error("No Token!");

  const methods = useForm<RestaurantInfoEditForm>({
    mode: "onSubmit",
  });

  useEffect(() => {
    methods.reset({
      logo: restaurant?.logo || null,
      lbn: restaurant?.lbn || "",
      dba: restaurant?.dba || "",
      cuisineType: restaurant?.cuisineType || "",
      storePhone: restaurant?.storePhone || "",
      businessEmail: restaurant?.businessEmail || "",
      website: restaurant?.website || null,
      instagram: restaurant?.instagram || null,
      mainImgUrl: restaurant?.mainImgUrl || null,
      sub1ImgUrl: restaurant?.sub1ImgUrl || null,
      sub2ImgUrl: restaurant?.sub2ImgUrl || null,
      bannerImgUrl: restaurant?.bannerImgUrl || null,
    });
  }, [methods, restaurant]);

  const { handleSubmit, control, reset } = methods;

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  const onSubmit = async (data: RestaurantInfoEditForm) => {
    const hasBlob = [data.mainImgUrl, data.sub1ImgUrl, data.sub2ImgUrl].some(
      (v) => typeof v === "string" && v.startsWith("blob:")
    );
    if (hasBlob) {
      alert("Image upload is still in progress. Please wait.");
      return;
    }
    await updateRestaurant(token, {
      ...data,
      website: data.website?.trim() || null,
      instagram: data.instagram?.trim() || null,
    });
    await loadRestaurantData();
    setIsEditing(false);
  };

  if (!restaurant) return null;

  return (
    <FormProvider {...methods}>
      <div className="relative border border-gray-300 rounded-md p-4 space-y-5">
        {isEditing ? (
          <div className="absolute right-4 top-4 flex gap-1">
            <CancelButton onClick={onClickCancelEdit} className="px-3 py-1 " />
            <SubmitButton
              buttonName="submit"
              onClick={handleSubmit(onSubmit)}
              className="px-3 py-1"
            />
          </div>
        ) : (
          <div className="absolute right-4 top-4">
            <EditButton onClick={onClickEdit} className="px-3 py-1" />
          </div>
        )}

        <section className="space-y-4">
          <TitleComp title="Restaurant Information" />
          <article className="grid grid-cols-9 gap-3">
            <div className="col-span-3">
              <h2 className="text-sm text-gray-700">Restaurant Logo Image</h2>
              <Controller
                name="logo"
                control={control}
                defaultValue={restaurant.logo}
                render={({ field }) => (
                  <RestaurantLogoUploadZone
                    sizeClass="w-45"
                    isEditing={isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="col-span-6 grid grid-cols-9 gap-3">
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
                className="col-span-4"
              />
              <RestaurantInfoInput
                title="Business email"
                isEditing={isEditing}
                fieldName="businessEmail"
                className="col-span-5"
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
        </section>

        <section className="space-y-4">
          <TitleComp title="Cover Images" />
          <article className="grid grid-cols-9 gap-3">
            <div className="col-span-3  space-y-1">
              <h2 className="text-sm text-gray-700">Main Cover Image</h2>
              <Controller
                name="mainImgUrl"
                control={control}
                defaultValue={restaurant.mainImgUrl}
                render={({ field }) => (
                  <RhfImageUploadZone
                    sizeClass="2xl:h-60 aspect-square"
                    isEditing={isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="col-span-3  space-y-1">
              <h2 className="text-sm text-gray-700">First Sub Cover Image</h2>
              <Controller
                name="sub1ImgUrl"
                control={control}
                defaultValue={restaurant.sub1ImgUrl}
                render={({ field }) => (
                  <RhfImageUploadZone
                    sizeClass="2xl:h-60 aspect-square"
                    isEditing={isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="col-span-3 space-y-1">
              <h2 className="text-sm text-gray-700">Second Sub Cover Image</h2>
              <Controller
                name="sub2ImgUrl"
                control={control}
                defaultValue={restaurant.sub2ImgUrl}
                render={({ field }) => (
                  <RhfImageUploadZone
                    sizeClass="2xl:h-60 aspect-square"
                    isEditing={isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="col-span-9  space-y-1">
              <h2 className="text-sm text-gray-700">Banner Image</h2>
              <Controller
                name="bannerImgUrl"
                control={control}
                defaultValue={restaurant.bannerImgUrl}
                render={({ field }) => (
                  <RhfImageUploadZone
                    sizeClass="aspect-[4/1]"
                    isEditing={isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </article>
        </section>
      </div>
    </FormProvider>
  );
};

export default RestaurantInfoEditor;
