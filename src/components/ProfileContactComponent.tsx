import type { UserDTO } from "../dto/User.dto";
import { commonLayoutCss } from "../pages/Profile";
import EditButton from "./Buttons/EditButton";
import ProfileReadOnlyInput from "./Inputs/ProfileReadOnlyInput";

interface ProfileContactComponentProps {
  onClickEdit: () => void;
  user?: UserDTO;
}

const ProfileContactComponent: React.FC<ProfileContactComponentProps> = ({
  onClickEdit,
  user,
}) => {
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
        <ProfileReadOnlyInput value={user?.phoneNumber} />
        <EditButton onClick={onClickEdit} />
      </div>
    </article>
  );
};

export default ProfileContactComponent;
