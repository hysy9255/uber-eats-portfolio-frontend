import { useFormContext } from "react-hook-form";
import ProfilePageModalShell from "./ModalShell/ProfilePageModalShell";
import { updatePassword } from "../../api/userApi";
import { getToken } from "../../auth";
import type { UpdatePasswordForm } from "../../formDataTypes/user/updatePasswordForm.type";

interface PasswordEditModalProps {
  closeModal: () => void;
}

const PasswordEditModal: React.FC<PasswordEditModalProps> = ({
  closeModal,
}) => {
  const token = getToken();
  if (!token) throw new Error("No token");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useFormContext<UpdatePasswordForm>();

  const onSubmit = async (data: UpdatePasswordForm) => {
    try {
      await updatePassword(token, {
        password: data.password,
        newPassword: data.newPassword,
      });
      closeModal();
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : "Failed to update password. Please try again.";

      setError("password", { type: "server", message: msg });
    }
  };

  return (
    <ProfilePageModalShell
      onClickClose={closeModal}
      saveButtonName="save new password"
      formId="password-edit-form"
    >
      <h3 className="font-semibold text-gray-700">Change password</h3>
      <form
        id="password-edit-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_2fr] gap-y-1 gap-x-1"
      >
        <h4 className="text-xs self-center text-gray-700">Current pwd</h4>
        <input
          className="border border-gray-400 rounded-sm px-1 outline-blue-300 text-gray-700"
          {...register("password", {
            required: "current pwd is required",
          })}
          type="password"
        />
        {errors.password && (
          <>
            <div></div>
            <div className="col-span-1 text-xs text-red-600">
              {errors.password.message?.toString()}
            </div>
          </>
        )}
        <h4 className="text-xs self-center text-gray-700">New pwd</h4>
        <input
          className="border border-gray-400 rounded-sm px-1 outline-blue-300 text-gray-700"
          {...register("newPassword", {
            required: "new password is required",
            minLength: {
              value: 4,
              message: "At least 4 characters",
            },
          })}
          type="password"
        />
        {errors.newPassword && (
          <>
            <div></div>
            <div className="col-span-1 text-xs text-red-600">
              {errors.newPassword.message?.toString()}
            </div>
          </>
        )}
        <h4 className="text-xs self-center text-gray-700">Confirm pwd</h4>
        <input
          className="border border-gray-400 rounded-sm px-1 outline-blue-300 text-gray-700"
          {...register("confirmNewPassword", {
            required: "confirm password is required",
            validate: (val) =>
              val === watch("newPassword") || "Passwords do not match",
          })}
          type="password"
        />
        {errors.confirmNewPassword && (
          <>
            <div></div>
            <div className="col-span-1 text-xs text-red-600">
              {errors.confirmNewPassword.message?.toString()}
            </div>
          </>
        )}
      </form>
    </ProfilePageModalShell>
  );
};

export default PasswordEditModal;
