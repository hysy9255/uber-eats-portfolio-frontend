import { useFormContext } from "react-hook-form";
import ProfilePageModalShell from "./ModalShell/ProfilePageModalShell";
import { getToken } from "../../auth";
import { updateMe } from "../../api/userApi";
import type { UpdateProfileForm } from "../../formDataTypes/user/updateProfileForm.type";
import type { UserDTO } from "../../dto/User.dto";

interface ProfileImageEditModalProps {
  profilePreview: string;
  onClickClose: () => void;
  setUserProfile: React.Dispatch<React.SetStateAction<UserDTO>>;
}

const ProfileImageEditModal: React.FC<ProfileImageEditModalProps> = ({
  profilePreview,
  onClickClose,
  setUserProfile,
}) => {
  const token = getToken();
  if (!token) throw new Error("No token");

  const { register, handleSubmit, reset } = useFormContext<UpdateProfileForm>();

  const onSubmit = async (data: UpdateProfileForm) => {
    await updateMe(token, data);
    setUserProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, profileImgUrl: data.profileImgUrl };
    });
    reset({ profileImgUrl: data.profileImgUrl });
    onClickClose();
  };

  return (
    <ProfilePageModalShell
      onClickClose={onClickClose}
      saveButtonName="save as profile picture"
      formId="profile-image-edit-form"
    >
      <h3 className="font-semibold text-gray-700">New profile image</h3>
      <form id="profile-image-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          value={profilePreview}
          {...register("profileImgUrl")}
        />
      </form>
      <div
        className={[
          "border-2 cursor-pointer transition",
          "border-slate-300 bg-slate-50 hover:bg-slate-100",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
          "overflow-hidden grid place-items-center relative",
          "h-60 w-60",
          "rounded-full",
        ].join(" ")}
      >
        <img
          src={profilePreview}
          alt="preview"
          className="h-full w-full object-cover absolute inset-0"
        />
      </div>
    </ProfilePageModalShell>
  );
};

export default ProfileImageEditModal;
