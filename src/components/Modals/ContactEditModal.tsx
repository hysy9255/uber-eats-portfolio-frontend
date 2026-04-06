import { useFormContext } from "react-hook-form";
import ProfilePageModalShell from "./ModalShell/ProfilePageModalShell";
import { updateMe } from "../../api/userApi";
import { getToken } from "../../auth";
import type { UpdateProfileForm } from "../../formDataTypes/user/updateProfileForm.type";
import type { UserDTO } from "../../dto/User.dto";

interface ContactEditModalProps {
  onClickClose: () => void;
  setUserProfile: React.Dispatch<React.SetStateAction<UserDTO>>;
}

const ContactEditModal: React.FC<ContactEditModalProps> = ({
  onClickClose,
  setUserProfile,
}) => {
  const token = getToken();
  if (!token) throw new Error("No token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<UpdateProfileForm>();

  const onSubmit = async (data: UpdateProfileForm) => {
    await updateMe(token, data);
    setUserProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, phoneNumber: data.phoneNumber };
    });
    reset({ phoneNumber: data.phoneNumber });
    onClickClose();
  };

  return (
    <ProfilePageModalShell
      onClickClose={onClickClose}
      saveButtonName="save phone number"
      formId="contact-edit-form"
    >
      <h3 className="font-semibold text-gray-700">Insert new phone number</h3>
      <form id="contact-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-gray-400 rounded-sm px-1 outline-blue-300"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^010-\d{4}-\d{4}$/,
              message: "Use xxx-xxxx-xxxx format",
            },
          })}
        />
        {errors.phoneNumber && (
          <div className="text-xs text-rose-600">
            {String(errors?.phoneNumber?.message)}
          </div>
        )}
      </form>
    </ProfilePageModalShell>
  );
};

export default ContactEditModal;
