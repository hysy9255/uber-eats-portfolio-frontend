import { useState } from "react";
import CancelButton from "./Buttons/CancelButton";
import SubmitButton from "./Buttons/SubmitButton";
import {
  commonLayoutCss,
  type UpdateProfileForm,
  type UserProfile,
} from "../pages/Profile";
import { useAuth } from "../ReactContext/auth/UseAuth";
import { updateMyProfile } from "../api/userApi";
import { useFormContext } from "react-hook-form";
import EditButton from "./Buttons/EditButton";

interface ProfileContactComponentProps {
  userProfile?: UserProfile;
}

const ProfileContactComponent: React.FC<ProfileContactComponentProps> = ({
  userProfile,
}) => {
  const { register, handleSubmit, reset } = useFormContext<UpdateProfileForm>();
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();
  if (!token) throw new Error("No token");

  const handleClickSubmit = async (data: UpdateProfileForm) => {
    await updateMyProfile(token, data);
    setIsEditing(false);
    reset({ phoneNumber: data.phoneNumber });
  };

  const handleClickCancel = () => {
    setIsEditing(false);
    reset({ phoneNumber: userProfile?.phoneNumber });
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };
  return (
    <article className="border-2 border-black/10 rounded-md py-6 px-20">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-black/80">Contact</h2>
          <p className="text-black/60 text-sm">
            You can update your phone number.
          </p>
        </div>
      </div>

      <div className={`${commonLayoutCss}`}>
        <label className="self-center text-xs">Phone</label>
        <div className="flex items-center">
          <input
            type="tel"
            disabled={!isEditing}
            className={`border-1 ${
              isEditing ? "border-blue-300" : "border-gray-300"
            }  rounded px-2 py-1 flex-1 outline-none text-xs`}
            {...register("phoneNumber", {
              required: true,
              pattern: /^[0-9\-\s()+]{6,20}$/,
            })}
          />
        </div>
        {isEditing ? (
          <div className="flex gap-x-1">
            <CancelButton className="h-full" onClick={handleClickCancel} />
            <SubmitButton
              buttonName="Submit"
              className="h-full"
              onClick={handleSubmit(handleClickSubmit)}
            />
          </div>
        ) : (
          <EditButton className="h-full" onClick={handleClickEdit} />
        )}
      </div>
    </article>
  );
};

export default ProfileContactComponent;
