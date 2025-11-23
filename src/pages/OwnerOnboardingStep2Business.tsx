import WizardShell from "../components/WizardShell";
import ImageUploadZone from "../components/ImageUploadZone";
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

export default function OwnerOnboardingBusiness() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<IOwnerOnBoardingStep2Form>(OWNER_STEP2_KEY, {
    lbn: "",
    dba: "",
    cuisineType: "",
    storePhone: "",
    businessEmail: "",
    website: "",
    instagram: "",
    mainImgUrl: "",
    sub1ImgUrl: "",
    sub2ImgUrl: "",
  });

  const [mainImgUrl, setMainImgUrl] = useState(defaultValues.mainImgUrl);
  const [sub1ImgUrl, setSub1ImgUrl] = useState(defaultValues.sub1ImgUrl);
  const [sub2ImgUrl, setSub2ImgUrl] = useState(defaultValues.sub2ImgUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IOwnerOnBoardingStep2Form>({
    mode: "onChange",
    defaultValues,
  });

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
          <label>
            <span className="text-sm font-medium">Legal business name</span>
            <input
              {...register("lbn", {
                required: "Legal business name is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Tuxedo Dining LLC"
            />
            {errors.lbn?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Chinese Tuxedo"
            />
            {errors.dba?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Chinese, Dim Sum, Noodles"
            />
            {errors.cuisineType?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="+1 212 555 0199"
            />
            {errors.storePhone?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="contact@chinesetuxedo.com"
            />
            {errors.businessEmail?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="https://example.com"
            />
            {errors.website?.message && (
              <span className="font-medium text-red-500">
                {errors.website?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Instagram (optional)</span>
            <input
              {...register("instagram", {})}
              type="url"
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="https://instagram.com/yourhandle"
            />
            {errors.instagram?.message && (
              <span className="font-medium text-red-500">
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
              sizeClass="h-64 w-full"
              onSelected={onSelectMainImageUpload}
              // onSelected={async (file) => {
              //   const url = await uploadImage(file);
              //   setValue(MAIN_IMG_URL, url, {
              //     shouldDirty: true,
              //     shouldValidate: true,
              //   });
              // }
            />
            {errors.mainImgUrl?.message && (
              <span className="font-medium text-red-500">
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
              sizeClass="h-64 w-full"
              label={"Recommended 1600×900"}
              onSelected={onSelectSub1ImageUpload}
              // onSelected={async (file) => {
              //   const url = await uploadImage(file);
              //   setValue(SUB1_IMG_URL, url, {
              //     shouldDirty: true,
              //     shouldValidate: true,
              //   });
              // }}
            />
            {errors.sub1ImgUrl?.message && (
              <span className="font-medium text-red-500">
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
              sizeClass="h-64 w-full"
              label={"Recommended 1600×900"}
              onSelected={onSelectSub2ImageUpload}
              // onSelected={async (file) => {
              //   const url = await uploadImage(file);
              //   setValue(SUB2_IMG_URL, url, {
              //     shouldDirty: true,
              //     shouldValidate: true,
              //   });
              // }}
            />
            {errors.sub2ImgUrl?.message && (
              <span className="font-medium text-red-500">
                {errors.sub2ImgUrl?.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </WizardShell>
  );
}
