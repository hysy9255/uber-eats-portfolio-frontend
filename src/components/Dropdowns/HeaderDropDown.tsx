// import logOutIcon from "../../icons/logout4.png";
import { useNavigate } from "react-router-dom";
import DefaultProfileImg from "../Images/DefaultProfileImg/DefaultProfileImg";
import LogOutIcon from "../Icons/LogOutIcon/LogOutIcon";

const HeaderDropDown = () => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const onClickProfile = () => {
    if (location.pathname === "/profile") {
      window.location.reload();
      return;
    } else {
      navigate("/profile");
    }
  };
  return (
    <div
      className="
    absolute rounded-xl shadow-2xl 
    bg-white w-50 top-[55px] right-3 py-3 
    ring-1 ring-gray-200
    z-50
    "
    >
      <div
        onClick={onClickProfile}
        className="flex pl-5  hover:bg-gray-100 hover:cursor-pointer"
      >
        <div className=" w-[35px] h-[35px] flex items-center">
          <DefaultProfileImg className="w-[20px] h-[20px]" />
        </div>
        <div className="text-sm  flex items-center font-serif w-30">
          View Profile
        </div>
      </div>

      <div
        onClick={onClickLogOut}
        className="flex pl-5 hover:bg-gray-100 hover:cursor-pointer"
      >
        <div className="w-[35px] h-[35px] flex items-center">
          <LogOutIcon className="w-[20px] h-[20px]" />
        </div>
        <div className="text-sm  flex items-center font-serif w-30">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
