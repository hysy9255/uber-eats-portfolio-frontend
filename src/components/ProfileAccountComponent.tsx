import ProfileReadOnlyInput from "./Inputs/ProfileReadOnlyInput";
import PencilButton from "./Buttons/IconBased/PencilButton/PencilButton";
import { useRef } from "react";
import { whiteBackgroundPencilIconEditStyle } from "../tailwindcss/styleConstants";
import DefaultProfileImg from "./Images/DefaultProfileImg/DefaultProfileImg";
import { uploadImage } from "../utils/uploadImg";
import { useFormContext } from "react-hook-form";
import type { UserDTO } from "../dto/User.dto";
import type { UpdateProfileForm } from "../formDataTypes/user/updateProfileForm.type";

interface ProfileAccountComponentProps {
  user?: UserDTO;
  setProfilePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProfileAccountComponent: React.FC<ProfileAccountComponentProps> = ({
  user,
  setProfilePreview,
}) => {
  const { setValue } = useFormContext<UpdateProfileForm>();

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    const persistentUrl = await uploadImage(file);
    setValue("profileImgUrl", persistentUrl);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => inputRef.current?.click();

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    await onSelectImageUpload(file);
  };

  return (
    <article className="border-2 border-black/10 rounded-md py-6 px-20">
      <div className="mb-4">
        <h2 className="text-md font-semibold text-black/80">Account</h2>
        <p className="text-black/60 text-sm">Your account information.</p>
      </div>
      <div className={"grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-[14px]"}>
        <div className="col-span-2 flex justify-start">
          <div className="flex flex-col items-center gap-y-1 relative">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
            />
            {user?.profileImgUrl ? (
              <img
                id="profile-img"
                src={user.profileImgUrl}
                className="w-20 h-20 border-2 border-black/20 rounded-full object-cover"
                alt="Profile"
              />
            ) : (
              <DefaultProfileImg className="w-20 h-20 border-2 border-black/20 rounded-full object-cover" />
            )}

            <div className="absolute top-0.5 right-0.5">
              <PencilButton
                onClick={openPicker}
                className={whiteBackgroundPencilIconEditStyle}
              />
            </div>
          </div>
        </div>

        <div className="self-center text-xs">Name</div>
        <ProfileReadOnlyInput value={user?.name} />
        <div className="self-center text-xs">Email</div>
        <ProfileReadOnlyInput value={user?.email} />
        <div className="self-center text-xs">Role</div>
        <ProfileReadOnlyInput value={user?.role} />
      </div>
    </article>
  );
};

export default ProfileAccountComponent;
