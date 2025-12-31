import CancelButton from "../Buttons/CancelButton";
import RoundBorderXMarkButton from "../Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";
import SubmitButton from "../Buttons/SubmitButton";

interface ProfileImageEditModalProps {
  profilePreview: string;
  onClickClose: () => void;
}

const ProfileImageEditModal: React.FC<ProfileImageEditModalProps> = ({
  profilePreview,
  onClickClose,
}) => {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-100 h-100 rounded-md flex flex-col justify-center items-center gap-y-6 relative">
        <RoundBorderXMarkButton
          onClick={onClickClose}
          className="absolute top-2 right-2 
          border-gray-300 hover:bg-gray-100 active:bg-gray-200"
        />
        <div
          className={[
            "border-2 border-dashed cursor-pointer transition",
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

        <div className="flex gap-3">
          <CancelButton
            onClick={onClickClose}
            className="px-2 py-2 rounded-full"
          />
          <SubmitButton
            buttonName="Save as profile picture"
            className="px-2 py-2 rounded-full"
            onClick={() => console.log("hi")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageEditModal;
