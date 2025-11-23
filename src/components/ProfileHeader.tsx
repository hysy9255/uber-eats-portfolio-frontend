import { Link } from "react-router-dom";
import defaultProfileImage from "../images/profile/profile.png";
import { useAuth } from "../AuthContext";

const ProfileHeader = () => {
  const { user } = useAuth();
  const profileImg = user?.profileImgUrl;

  return (
    <div className="rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-teal-400 to-emerald-300">
      <Link to={"/profile"}>
        <img
          src={profileImg ? profileImg : defaultProfileImage}
          alt="profile-img"
          className="block h-[30px] w-[30px] rounded-full bg-white object-cover"
        />
      </Link>
    </div>
  );
};

export default ProfileHeader;
