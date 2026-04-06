import { Link } from "react-router-dom";
import { useAuth } from "../../ReactContext/auth/UseAuth";
import DefaultProfileImg from "../Images/DefaultProfileImg/DefaultProfileImg";
import { UserRole } from "../../constants/UserRoleEnum";

interface ProfileHeaderProps {
  className?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ className }) => {
  const { user } = useAuth();
  const profileImg = user?.profileImgUrl;

  const directTo =
    user.role === UserRole.Client
      ? user.role
      : user.role === UserRole.Owner
      ? "dashboard"
      : "undefined";

  return (
    <Link
      to={`/${directTo}/profile`}
      className={`${className} rounded-full 
        h-[40px] w-[40px] overflow-hidden
        hover:cursor-pointer`}
    >
      {profileImg ? (
        <img alt="profileImage" className="object-cover" src={profileImg} />
      ) : (
        <DefaultProfileImg className="object-cover border border-gray-200 rounded-full" />
      )}
    </Link>
  );
};

export default ProfileHeader;
