import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import star from "../icons/star.png";
import logoutIcon from "../icons/logout.svg";
import { useAuth } from "../AuthContext";

interface SideBarProps {
  toggleSideBar: () => void;
  sideBarOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggleSideBar, sideBarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (sideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // cleanup just in case
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBarOpen]);

  const handleLogout = () => {
    // localStorage.removeItem("jwt-token"); // clear token
    logout();
    navigate("/login"); // ✅ use the returned function in the callback
  };

  //   const alwaysOpen = true;

  return (
    <div className="lg:block hidden">
      <div
        id="overlay"
        className={`fixed inset-0 bg-gray-500 z-20 transform transition-opacity duration-200 ${
          sideBarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSideBar}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-[350px] bg-green-100 z-30 transform transition-transform duration-500 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div id="sidebar-contents" className="w-full py-[105px] h-full pl-10 ">
          <div className="flex flex-col  h-full justify-between">
            <div>
              <Link to={"/restaurants"}>
                <div className="grid grid-cols-[60px_1fr] items-center hover:bg-black/10 rounded-xl px-3 py-4">
                  <div className="h-full w-full flex items-center">
                    <img className="w-[25px] h-[25px]" src={star} />
                  </div>
                  <div className="text-xl font-light text-gray-800">
                    Order History
                  </div>
                </div>
              </Link>
              <Link to={"/restaurants"}>
                <div className="grid grid-cols-[60px_1fr] items-center hover:bg-black/10 rounded-xl px-3 py-4">
                  <div className="h-full w-full flex items-center">
                    <img className="w-[25px] h-[25px]" src={star} />
                  </div>
                  <div className="text-xl font-light text-gray-800">
                    Favorites
                  </div>
                </div>
              </Link>
            </div>
            <div id="log-out" onClick={handleLogout}>
              <div className="grid grid-cols-[60px_1fr] items-center hover:bg-black/10 rounded-xl px-3 py-4">
                <div className="h-full w-full flex items-center">
                  <img className="w-[25px] h-[25px]" src={logoutIcon} />
                </div>
                <div className="text-xl font-light text-gray-800">Log out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
