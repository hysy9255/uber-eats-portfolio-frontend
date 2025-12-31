// import defaultProfileImage from "../../images/profile/profile.png";

import { useState } from "react";
import HeaderDropDown from "../Dropdowns/HeaderDropDown";
import { useAuth } from "../../ReactContext/auth/UseAuth";
import DefaultProfileImg from "../Images/DefaultProfileImg/DefaultProfileImg";

const ProfileHeader = () => {
  const { user } = useAuth();
  const profileImg = user?.profileImgUrl;

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setDropDownOpen(!dropDownOpen)}
        className="rounded-full 
        p-[2px] bg-gradient-to-tr 
        from-blue-600 via-teal-400 to-emerald-300
        hover:cursor-pointer
        "
      >
        {profileImg ? (
          <img
            alt="profileImage"
            className="block h-[40px] w-[40px] rounded-full bg-white object-cover"
            src={profileImg}
          />
        ) : (
          <DefaultProfileImg className="block h-[40px] w-[40px] rounded-full bg-white object-cover" />
        )}
      </div>
      {dropDownOpen && <HeaderDropDown />}
    </>
  );
};

export default ProfileHeader;
