import { commonLayoutCss } from "../pages/Profile";
import ProfileReadOnlyInput from "./Inputs/ProfileReadOnlyInput";
import EditButton from "./Buttons/EditButton";

interface ProfileSecurityComponentProps {
  onClickEdit: () => void;
}

const ProfileSecurityComponent: React.FC<ProfileSecurityComponentProps> = ({
  onClickEdit,
}) => {
  return (
    <article className="border-2 border-black/10 rounded-md py-6 px-20">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-black/80">Security</h2>
          <p className="text-black/60 text-sm">Change your password.</p>
        </div>
      </div>

      <div className={commonLayoutCss}>
        <div className="self-center text-xs">Password</div>
        <ProfileReadOnlyInput value={"****"} />
        <EditButton onClick={onClickEdit} />
      </div>
    </article>
  );
};

export default ProfileSecurityComponent;
