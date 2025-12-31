import WizardShell from "../components/Shells/WizardShell";
import ImageUploadZone from "../components/UploadZones/ImageUploadZone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clearDraft, loadDraft, saveDraft } from "../utils/localDraft";
import { uploadImage } from "../utils/uploadImg";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import { useState } from "react";
import {
  OWNER_STEP2_KEY,
  OwnerStep2RightPanel,
  type IOwnerOnBoardingStep2Form,
} from "./types/OwnerOnBoardingStep2Business.type";
import { OWNER_STEP3_KEY } from "./types/OwnerOnBoardingStep3Location.type";
import { customInputCss } from "../constants/CustomInputCss";
import { ownerOnboardStep2DefaultValues } from "../constants/DefaultValues";
import ProfileOrLogoUploadZone from "../components/UploadZones/ProfileOrLogoUploadZone";
import DefaultRestaurantLogoImg from "../components/Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";
// import defaultRestaurantLogoImg from "../images/defaultRestaurantLogo.jpg";

export default function OwnerOnboardingBusiness() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<IOwnerOnBoardingStep2Form>(
    OWNER_STEP2_KEY,
    ownerOnboardStep2DefaultValues
  );

  const [mainImgUrl, setMainImgUrl] = useState(defaultValues.mainImgUrl);
  const [sub1ImgUrl, setSub1ImgUrl] = useState(defaultValues.sub1ImgUrl);
  const [sub2ImgUrl, setSub2ImgUrl] = useState(defaultValues.sub2ImgUrl);
  const [bannerImgUrl, setBannerImgUrl] = useState(defaultValues.bannerImgUrl);

  const methods = useForm<IOwnerOnBoardingStep2Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const onContinue = (data: IOwnerOnBoardingStep2Form) => {
    saveDraft(OWNER_STEP2_KEY, data);
    navigate("/owner-on-board-step-3");
  };

  const onBack = () => {
    navigate("/owner-on-board-step-1");
  };

  const onExitWithoutSaving = () => {
    clearDraft(OWNER_STEP2_KEY);
    clearDraft(OWNER_STEP3_KEY);
    navigate("/create-account-choice");
  };

  const onSelectMainImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setMainImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("mainImgUrl", persistentUrl);
  };

  const onSelectSub1ImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setSub1ImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("sub1ImgUrl", persistentUrl);
  };

  const onSelectSub2ImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setSub2ImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("sub2ImgUrl", persistentUrl);
  };

  const onSelectBennerImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setBannerImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("bannerImgUrl", persistentUrl);
  };

  const [profileImgPreview, setProfileImgPreview] = useState<
    string | undefined
  >(defaultValues.logoImgUrl);

  const onClickRemove = () => {
    setProfileImgPreview("");
    methods.setValue("logoImgUrl", "", { shouldDirty: true });
    saveDraft(OWNER_STEP2_KEY, { ...methods.getValues() });
  };

  const onClickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setProfileImgPreview(url);
    const persistentUrl = await uploadImage(file);

    methods.setValue("logoImgUrl", persistentUrl, {
      shouldDirty: true,
    });
  };

  return (
    <WizardShell
      onExitWithoutSaving={onExitWithoutSaving}
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Tell us about your business"
      subtitle="This information appears on your store profile and for compliance."
      steps={CREATE_OWNER_PAGE_STEPS}
      active={1}
      right={OwnerStep2RightPanel}
    >
      <form className="space-y-6">
        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <ProfileOrLogoUploadZone
              onClickRemove={onClickRemove}
              onClickUpload={onClickUpload}
              title="Logo Image (optional)"
              defaultImgBackground={<DefaultRestaurantLogoImg />}
              profileImgPreview={profileImgPreview}
            />
          </div>

          <label>
            <span className="text-sm font-medium">Legal business name</span>
            <input
              {...register("lbn", {
                required: "Legal business name is required",
              })}
              className={customInputCss}
              placeholder="Tuxedo Dining LLC"
            />
            {errors.lbn?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.lbn?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Doing business as (DBA)</span>
            <input
              {...register("dba", {
                required: "DBA (doing buisiness as) is required",
              })}
              className={customInputCss}
              placeholder="Chinese Tuxedo"
            />
            {errors.dba?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.dba?.message}
              </span>
            )}
          </label>
        </div>

        {/* Type / Cuisine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="md:col-span-3">
            <span className="text-sm font-medium">Cuisine types</span>
            <input
              {...register("cuisineType", {
                required: "Cuisine type is required",
              })}
              className={customInputCss}
              placeholder="Chinese, Dim Sum, Noodles"
            />
            {errors.cuisineType?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.cuisineType?.message}
              </span>
            )}
          </label>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label>
            <span className="text-sm font-medium">Store phone</span>
            <input
              {...register("storePhone", {
                required: "Store phone is required",
              })}
              className={customInputCss}
              placeholder="+1 212 555 0199"
            />
            {errors.storePhone?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.storePhone?.message}
              </span>
            )}
          </label>
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Business email</span>
            <input
              {...register("businessEmail", {
                required: "Business email is required",
              })}
              type="email"
              className={customInputCss}
              placeholder="contact@chinesetuxedo.com"
            />
            {errors.businessEmail?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.businessEmail?.message}
              </span>
            )}
          </label>
        </div>

        {/* Web presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>
            <span className="text-sm font-medium">Website (optional)</span>
            <input
              {...register("website", {})}
              type="url"
              className={customInputCss}
              placeholder="https://example.com"
            />
            {errors.website?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.website?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Instagram (optional)</span>
            <input
              {...register("instagram", {})}
              type="url"
              className={customInputCss}
              placeholder="https://instagram.com/yourhandle"
            />
            {errors.instagram?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.instagram?.message}
              </span>
            )}
          </label>
        </div>

        {/* Media (logo/cover placeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <div className="text-sm font-medium">Main Cover Image</div>
            <input
              type="hidden"
              {...register("mainImgUrl", {
                required: "Main cover image is required",
              })}
            />
            <ImageUploadZone
              previewSrc={mainImgUrl} // ★ RHF 값 표시
              className="aspect-square"
              onSelected={onSelectMainImageUpload}
            />
            {errors.mainImgUrl?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.mainImgUrl?.message}
              </span>
            )}
          </div>
          <div className="col-span-1">
            <div className="text-sm font-medium">First Sub Cover Image</div>
            <input
              type="hidden"
              {...register("sub1ImgUrl", {
                required: "First sub cover image is required",
              })}
            />
            <ImageUploadZone
              previewSrc={sub1ImgUrl} // ★ RHF 값 표시
              className="aspect-square"
              label={"Recommended 1600×900"}
              onSelected={onSelectSub1ImageUpload}
            />
            {errors.sub1ImgUrl?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.sub1ImgUrl?.message}
              </span>
            )}
          </div>
          <div className="col-span-1">
            <div className="text-sm font-medium">Second Sub Cover Image</div>
            <input
              type="hidden"
              {...register("sub2ImgUrl", {
                required: "Second sub cover image is required",
              })}
            />
            <ImageUploadZone
              previewSrc={sub2ImgUrl} // ★ RHF 값 표시
              className="aspect-square"
              label={"Recommended 1600×900"}
              onSelected={onSelectSub2ImageUpload}
            />
            {errors.sub2ImgUrl?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.sub2ImgUrl?.message}
              </span>
            )}
          </div>
          <div className="col-span-3">
            <div className="text-sm font-medium">Banner Image</div>
            <input
              type="hidden"
              {...register("bannerImgUrl", {
                required: "Banner image is required",
              })}
            />
            <ImageUploadZone
              previewSrc={bannerImgUrl} // ★ RHF 값 표시
              className="aspect-[5/1]"
              label={"Recommended 1600×900"}
              onSelected={onSelectBennerImageUpload}
            />
            {errors.bannerImgUrl?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.bannerImgUrl?.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </WizardShell>
  );
}
