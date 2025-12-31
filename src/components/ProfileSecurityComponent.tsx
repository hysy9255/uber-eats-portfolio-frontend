import { useState } from "react";
import { commonLayoutCss, type UpdatePasswordForm } from "../pages/Profile";
import ProfileReadOnlyInput from "./Inputs/ProfileReadOnlyInput";
import { useFormContext } from "react-hook-form";
import { updatePassword } from "../api/userApi";
import { useAuth } from "../ReactContext/auth/UseAuth";
import SubmitButton from "./Buttons/SubmitButton";
import CancelButton from "./Buttons/CancelButton";
import EditButton from "./Buttons/EditButton";

const ProfileSecurityComponent = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors: pwdErrors, isSubmitting },
    watch,
  } = useFormContext<UpdatePasswordForm>();
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();
  if (!token) throw new Error("No token");

  const [pwdMsg, setPwdMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const handleClickSubmit = async (data: UpdatePasswordForm) => {
    try {
      await updatePassword(token, data);
      setPwdMsg({ type: "ok", text: "Password updated successfully." });
      reset();
      setIsEditing(false);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setPwdMsg({ type: "err", text: message });
    }
  };

  const handleClickCancel = () => {
    reset();
    setIsEditing(false);
    setPwdMsg(null);
  };

  const handleClickEdit = () => {
    setPwdMsg(null);
    setIsEditing(true);
  };

  return (
    <article className="border-2 border-black/10 rounded-md py-6 px-20">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-black/80">Security</h2>
          <p className="text-black/60 text-sm">Change your password.</p>
        </div>
      </div>
      {pwdMsg && (
        <div
          className={`mb-3 text-sm ${
            pwdMsg.type === "ok" ? "text-green-700" : "text-red-600"
          }`}
        >
          {pwdMsg.text}
        </div>
      )}
      {isEditing ? (
        <div className={commonLayoutCss}>
          <label className="self-center text-xs">Current password</label>
          <div>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full border border-blue-300 rounded px-2 py-1 focus:outline-none text-xs"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {pwdErrors.currentPassword && (
              <div className=" text-sm text-red-600">
                {pwdErrors.currentPassword.message?.toString()}
              </div>
            )}
          </div>
          <div className="flex gap-x-1">
            <CancelButton onClick={handleClickCancel} disabled={isSubmitting} />
            <SubmitButton
              buttonName="submit"
              onClick={handleSubmit(handleClickSubmit)}
              disabled={isSubmitting}
            />
          </div>
          <label className="self-center text-xs">New password</label>
          <div className="">
            <input
              type="password"
              autoComplete="new-password"
              className="w-full border border-blue-300 rounded px-2 py-1 focus:outline-none text-xs"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 4,
                  message: "At least 4 characters",
                },
              })}
            />
            {pwdErrors.newPassword && (
              <div className="text-sm text-red-600">
                {pwdErrors.newPassword.message?.toString()}
              </div>
            )}
          </div>
          <div></div>
          <label className="self-center text-xs col-span-1">
            Confirm new password
          </label>
          <div className="">
            <input
              type="password"
              autoComplete="new-password"
              className="w-full border border-blue-300 rounded px-2 py-1 focus:outline-none text-xs"
              {...register("confirmNewPassword", {
                required: "Confirm password is required",
                validate: (val) =>
                  val === watch("newPassword") || "Passwords do not match",
              })}
            />
            {pwdErrors.confirmNewPassword && (
              <div className="text-sm text-red-600">
                {pwdErrors.confirmNewPassword.message?.toString()}
              </div>
            )}
          </div>
          <div></div>
          <div />
        </div>
      ) : (
        <div className={commonLayoutCss}>
          <div className="self-center text-xs">Password</div>
          <ProfileReadOnlyInput value={"****"} />
          {/* <EditButton2 onClick={handleClickEdit} /> */}
          <EditButton onClick={handleClickEdit} />
        </div>
      )}
    </article>
  );
};

export default ProfileSecurityComponent;
