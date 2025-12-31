import { useFormContext } from "react-hook-form";
import { customInputCss } from "../constants/CustomInputCss";
// import defaultProfileImg from "../images/profile/profile.png";
import type { IOnBoardingStep1Form } from "../pages/types/OnBoardingStep1Account.type";
import { useOnBoardingAccount } from "../ReactContext/onBoardingAccount/UseOnBoardingAccount";
import ProfileOrLogoUploadZone from "./UploadZones/ProfileOrLogoUploadZone";
import DefaultProfileImg from "./Images/DefaultProfileImg/DefaultProfileImg";

const OnBoardingStep1Account = () => {
  const {
    showMessageUI,
    profileImgPreview,
    pwd,
    onClickRemove,
    onClickUpload,
    handleClickCheckForAvailability,
  } = useOnBoardingAccount();

  const {
    register,
    formState: { errors },
  } = useFormContext<IOnBoardingStep1Form>();

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <ProfileOrLogoUploadZone
        onClickRemove={onClickRemove}
        onClickUpload={onClickUpload}
        title="Profile photo"
        defaultImgBackground={
          <DefaultProfileImg className="w-52 border rounded-full" />
        }
        profileImgPreview={profileImgPreview}
      />
      <label className="block col-span-2 md:col-span-1">
        <div className="text-sm font-medium">First name</div>
        <input
          {...register("firstName", {
            required: "First name is required",
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
          })}
          className={customInputCss}
          placeholder="Jane"
        />
        {errors.firstName?.message && (
          <div className="font-medium text-red-500 text-sm">
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
          className={customInputCss}
          placeholder="Doe"
        />
        {errors.lastName?.message && (
          <div className="font-medium text-red-500 text-sm">
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
          className={customInputCss}
          placeholder="xxx-xxxx-xxxx"
        />
        {errors.phoneNumber?.message && (
          <div className="font-medium text-red-500 text-sm">
            {errors.phoneNumber?.message}
          </div>
        )}
      </label>
      <label className="block col-span-2">
        <div className="text-sm font-medium">Email</div>
        <div className="grid grid-cols-[5fr_1fr] gap-3">
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className={customInputCss}
            placeholder="you@example.com"
          />
          <button
            onClick={() => handleClickCheckForAvailability()}
            type="button"
            className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600
       text-white font-semibold rounded-md text-nowrap px-3 py-1 
       hover:cursor-pointer text-xs
       "
          >
            Check for availability
          </button>
        </div>

        {showMessageUI.isChecked !== null && !showMessageUI.isChecked && (
          <div className="font-medium text-red-500 text-sm">
            Check for availability
          </div>
        )}

        {showMessageUI.available !== null && !showMessageUI.available && (
          <div className="font-medium text-red-500 text-sm">Already in use</div>
        )}

        {showMessageUI.available && (
          <div className="font-medium text-green-500 text-sm">
            Available to use
          </div>
        )}

        {errors.email?.message && (
          <div className="font-medium text-red-500 text-sm">
            {errors.email?.message}
          </div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="font-medium text-red-500 text-sm">
            {"Please enter a valid email"}
          </div>
        )}
      </label>
      <label className="block col-span-1">
        <div className="text-sm font-medium">Password</div>
        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          className={customInputCss}
          placeholder="••••••••"
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.password?.message && (
          <div className="font-medium text-red-500 text-sm">
            {errors.password?.message}
          </div>
        )}
      </label>
      <label className="block col-span-1">
        <div className="text-sm font-medium">Confirm Password</div>
        <input
          {...register("confirmPassword", {
            required: "Password confirm is required",
            validate: (val) => val === pwd || "Passwords do not match",
          })}
          type="password"
          autoComplete="new-password"
          className={customInputCss}
          placeholder="••••••••"
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword?.message && (
          <div className="font-medium text-red-500 text-sm">
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
  );
};

export default OnBoardingStep1Account;
