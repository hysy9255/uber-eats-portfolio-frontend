import { useState } from "react";
import WizardShell from "../components/WizardShell";
import { useForm } from "react-hook-form";
import { clearDraft, loadDraft, saveDraft } from "../utils/localDraft";
import { useNavigate } from "react-router-dom";
import defaultProfileImg from "../images/profile/profile.png";
import { uploadImage } from "../utils/uploadImg";
import { CREATE_DRIVER_PAGE_STEPS } from "../constants/CreateDriverPageSteps";
import {
  DRIVER_STEP1_KEY,
  DriverStep1RightPanel,
  type IDriverOnBoardingStep1Form,
} from "./types/DriverOnBoardingStep1Account.type";
import { DRIVER_STEP2_KEY } from "./types/DriverOnBoardingStep2Vehicle.type";
import { DRIVER_STEP3_KEY } from "./types/DriverOnBoardingStep3Doc.type";
import { DRIVER_STEP4_KEY } from "./types/DriverOnBoardingStep4Background.type";
import { DRIVER_STEP5_KEY } from "./types/DriverOnBoardingStep5Payout.type";

export default function DriverOnboardingAccount() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const defaultValues = loadDraft<IDriverOnBoardingStep1Form>(
    DRIVER_STEP1_KEY,
    {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImgUrl: "",
    }
  );

  const [profileImgPreview, setProfileImgPreview] = useState(
    defaultValues.profileImgUrl
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IDriverOnBoardingStep1Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const onContinue = (data: IDriverOnBoardingStep1Form) => {
    saveDraft(DRIVER_STEP1_KEY, data);
    navigate("/driver-on-board-step-2");
  };

  const onBack = () => {
    setShowConfirm(true);
  };

  const onExitWithoutSaving = () => {
    clearDraft(DRIVER_STEP1_KEY);
    clearDraft(DRIVER_STEP2_KEY);
    clearDraft(DRIVER_STEP3_KEY);
    clearDraft(DRIVER_STEP4_KEY);
    clearDraft(DRIVER_STEP5_KEY);
    navigate("/create-account-choice");
  };

  const pwd = watch("password");

  const onClickRemove = () => {
    setProfileImgPreview("");
    setValue("profileImgUrl", "", { shouldDirty: true });
    saveDraft(DRIVER_STEP1_KEY, { ...getValues() });
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

    setValue("profileImgUrl", persistentUrl, {
      shouldDirty: true,
    });
  };

  return (
    <WizardShell
      onExitWithoutSaving={onExitWithoutSaving}
      showConfirm={showConfirm}
      setShowConfirm={setShowConfirm}
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Create your driver account"
      subtitle="Use your email or phone to sign up."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={0}
      right={DriverStep1RightPanel}
    >
      <form
        onSubmit={handleSubmit(onContinue)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="block col-span-2">
          <div className="text-sm font-medium mb-2">Profile photo</div>

          {/* Preview */}
          <div className="flex items-center gap-4">
            <div className="h-25 w-25 rounded-full overflow-hidden ring-1 ring-slate-300 bg-slate-100 flex items-center justify-center">
              {profileImgPreview ? (
                <img
                  src={profileImgPreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={defaultProfileImg}
                  className="w-52 border rounded-full"
                  alt="Profile"
                ></img>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Remove button */}
              {profileImgPreview ? (
                <button
                  type="button"
                  className="text-sm text-slate-600 underline"
                  onClick={onClickRemove}
                >
                  Remove
                </button>
              ) : (
                <label className="inline-block">
                  <span className="rounded-full px-3 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 cursor-pointer">
                    Upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onClickUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            PNG or JPG up to 2MB. Square images look best.
          </p>
        </div>
        <label className="block col-span-2 md:col-span-1">
          <div className="text-sm font-medium">First name</div>
          <input
            {...register("firstName", {
              required: "First name is required",
              setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            })}
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="Jane"
          />
          {errors.firstName?.message && (
            <div className="font-medium text-red-500">
              {errors.firstName?.message}
            </div>
          )}
        </label>

        <label className="block col-span-2 md:col-span-1">
          <div className="text-sm font-medium">Last name</div>
          <input
            {...register("lastName", {
              required: "Last name is required",
              setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            })}
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="Doe"
          />
          {errors.lastName?.message && (
            <div className="font-medium text-red-500">
              {errors.lastName?.message}
            </div>
          )}
        </label>
        <label className="block col-span-2">
          <div className="text-sm font-medium">Phone number</div>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^010-\d{4}-\d{4}$/,
                message: "Use xxx-xxxx-xxxx format",
              },
            })}
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="xxx-xxxx-xxxx"
          />
          {errors.phoneNumber?.message && (
            <div className="font-medium text-red-500">
              {errors.phoneNumber?.message}
            </div>
          )}
        </label>
        <label className="block col-span-2">
          <div className="text-sm font-medium">Email</div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="you@example.com"
          />
          {errors.email?.message && (
            <div className="font-medium text-red-500">
              {errors.email?.message}
            </div>
          )}
          {errors.email?.type === "pattern" && (
            <div className="font-medium text-red-500">
              {"Please enter a valid email"}
            </div>
          )}
        </label>
        <label className="block col-span-2">
          <div className="text-sm font-medium">Password</div>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.password?.message && (
            <div className="font-medium text-red-500">
              {errors.password?.message}
            </div>
          )}
        </label>
        <label className="block col-span-2">
          <div className="text-sm font-medium">Confirm Password</div>
          <input
            {...register("confirmPassword", {
              required: "Password confirm is required",
              validate: (val) => val === pwd || "Passwords do not match",
            })}
            type="password"
            autoComplete="new-password"
            className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword?.message && (
            <div className="font-medium text-red-500">
              {errors.confirmPassword?.message}
            </div>
          )}
        </label>

        <label className="mt-1 inline-flex items-center gap-2 md:col-span-2">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          <span className="text-sm text-slate-700">
            Send me deals and promotions
          </span>
        </label>
      </form>
    </WizardShell>
  );
}
