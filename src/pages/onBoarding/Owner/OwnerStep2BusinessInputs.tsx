import { Fragment } from "react/jsx-runtime";
import ProfileOrLogoUploadZone from "../../../components/UploadZones/ProfileOrLogoUploadZone";
import OnBoardInput from "../../../components/Inputs/OnBoardInput";
import { useFormContext } from "react-hook-form";
import type { OwnerOnBoardingForm } from "../../../components/Layout/OwnerOnBoardLayout";
import ImageUploadZone from "../../../components/UploadZones/ImageUploadZone";
import DefaultRestaurantLogoImg from "../../../components/Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";

interface OwnerStep2BusinessInputsProps {
  onClickRemove: () => void;
  onClickUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileImgPreview?: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  onSelectMainImageUpload: (file: File) => void;
  onSelectSub1ImageUpload: (file: File) => void;
  onSelectSub2ImageUpload: (file: File) => void;
  onSelectBannerImageUpload: (file: File) => void;
}

const OwnerStep2BusinessInputs: React.FC<OwnerStep2BusinessInputsProps> = ({
  onClickRemove,
  onClickUpload,
  profileImgPreview,
  mainImgUrl,
  sub1ImgUrl,
  sub2ImgUrl,
  bannerImgUrl,
  onSelectMainImageUpload,
  onSelectSub1ImageUpload,
  onSelectSub2ImageUpload,
  onSelectBannerImageUpload,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<OwnerOnBoardingForm>();
  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <ProfileOrLogoUploadZone
            onClickRemove={onClickRemove}
            onClickUpload={onClickUpload}
            title="Logo Image (optional)"
            defaultImgBackground={<DefaultRestaurantLogoImg />}
            profileImgPreview={profileImgPreview}
          />
        </div>

        <OnBoardInput
          css="col-span-1"
          title="Legal business name"
          field="step2.lbn"
          placeholder="Tuxedo Dining LLC"
        />
        <OnBoardInput
          css="col-span-1"
          title="Doing business as (DBA)"
          field="step2.dba"
          placeholder="Chinese Tuxedo"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <OnBoardInput
          css="col-span-1"
          title="Cuisine type"
          field="step2.cuisineType"
          placeholder="Chinese, Dim Sum, Noodles"
        />

        <OnBoardInput
          css="col-span-1"
          title="Store phone"
          field="step2.storePhone"
          placeholder="+1 212 555 0199"
        />

        <OnBoardInput
          css="col-span-1"
          title="Business email"
          field="step2.businessEmail"
          placeholder="contact@chinesetuxedo.com"
        />
      </div>

      {/* Web presence */}
      <div className="grid grid-cols-2 gap-4">
        <OnBoardInput
          css="col-span-1"
          title="Website (optional)"
          field="step2.website"
          placeholder="https://example.com"
        />
        <OnBoardInput
          css="col-span-1"
          title="Instagram (optional)"
          field="step2.instagram"
          placeholder="https://instagram.com/yourhandle"
        />
      </div>

      {/* Media (logo/cover placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1">
          <div className="text-sm font-medium">Main Cover Image</div>
          <input
            type="hidden"
            {...register("step2.mainImgUrl", {
              required: "Main cover image is required",
            })}
          />
          <ImageUploadZone
            previewSrc={mainImgUrl}
            className="aspect-square rounded-lg"
            onSelected={onSelectMainImageUpload}
          />
          {errors.step2?.mainImgUrl?.message && (
            <span className="font-medium text-red-500 text-sm">
              {errors.step2.mainImgUrl.message}
            </span>
          )}
        </div>
        <div className="col-span-1">
          <div className="text-sm font-medium">First Sub Cover Image</div>
          <input
            type="hidden"
            {...register("step2.sub1ImgUrl", {
              required: "First sub cover image is required",
            })}
          />
          <ImageUploadZone
            previewSrc={sub1ImgUrl} // ★ RHF 값 표시
            className="aspect-square rounded-lg"
            label={"Recommended 1600×900"}
            onSelected={onSelectSub1ImageUpload}
          />
          {errors.step2?.sub1ImgUrl?.message && (
            <span className="font-medium text-red-500 text-sm">
              {errors.step2.sub1ImgUrl.message}
            </span>
          )}
        </div>
        <div className="col-span-1">
          <div className="text-sm font-medium">Second Sub Cover Image</div>
          <input
            type="hidden"
            {...register("step2.sub2ImgUrl", {
              required: "Second sub cover image is required",
            })}
          />
          <ImageUploadZone
            previewSrc={sub2ImgUrl} // ★ RHF 값 표시
            className="aspect-square rounded-lg"
            label={"Recommended 1600×900"}
            onSelected={onSelectSub2ImageUpload}
          />
          {errors.step2?.sub2ImgUrl?.message && (
            <span className="font-medium text-red-500 text-sm">
              {errors.step2.sub2ImgUrl.message}
            </span>
          )}
        </div>
        <div className="col-span-3">
          <div className="text-sm font-medium">Banner Image</div>
          <input
            type="hidden"
            {...register("step2.bannerImgUrl", {
              required: "Banner image is required",
            })}
          />
          <ImageUploadZone
            previewSrc={bannerImgUrl} // ★ RHF 값 표시
            className="aspect-[5/1] rounded-lg"
            label={"Recommended 1600×900"}
            onSelected={onSelectBannerImageUpload}
          />
          {errors.step2?.bannerImgUrl?.message && (
            <span className="font-medium text-red-500 text-sm">
              {errors.step2.bannerImgUrl.message}
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OwnerStep2BusinessInputs;
