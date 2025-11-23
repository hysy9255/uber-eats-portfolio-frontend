import React, { useEffect, useState } from "react";
import uberEatsLogo from "../../logos/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import hamburgerIcon from "../../icons/hamburgerIcon.png";
import defaultProfileImage from "../../images/profile/profile.png";
import notificationIcon from "../../icons/notification.png";
import shoppingCartIcon from "../../icons/shopping-cart.png";
import type { UserProfile } from "../../pages/Profile";
// import { getToken } from "../auth";
import { useAuth } from "../../AuthContext";

interface MainHeaderProps {
  // toggleSideBar: () => void;
}

const ClientMainHeader: React.FC<MainHeaderProps> = ({ toggleSideBar }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const { token } = useAuth();

  if (!token) throw new Error("No token");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:3002/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": token,
        },
      });
      const profile = await res.json();
      setUserProfile({
        role: profile.role,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        name: profile.name,
        profileImgUrl: profile.profileImgUrl,
      });
    };

    load();
  }, []);
  const navigate = useNavigate();
  const isCartTwoDigits = true;
  const cartCount = 0;
  const hasNewOrders = true;
  return (
    <div id="main-header" className="h-full flex items-center gap-x-5">
      <div
        className="h-14 w-14 flex justify-center 
        items-center rounded-full 
        hover:bg-slate-200 hover:bg-opacity-10 active:bg-slate-300 z-50"
        onClick={toggleSideBar}
      >
        <img
          src={hamburgerIcon}
          className="w-10 h-10 filter invert-[70%] brightness-50 "
          alt="hamburgerIcon"
        />
      </div>
      <div className="z-50">
        <Link to={`/restaurants`}>
          <img src={uberEatsLogo} className="w-24 md:w-52" alt="Nuber Eats" />
        </Link>
      </div>
      <div className="ml-auto flex gap-x-10 items-center ">
        <div
          id="cart"
          className="hover:cursor-pointer relative"
          // onClick={() => navigate("/checkout")}
        >
          <div
            className={`${
              !cartCount ? "hidden" : "block"
            } absolute -top-2 -right-3 w-5 h-5 border-2 ${
              isCartTwoDigits ? "text-[10px]" : "text-[12px]"
            }  border-green-400 bg-white rounded-full text-green-400 flex items-center justify-center`}
          >
            {cartCount}
          </div>
          <img
            alt="cartIcon"
            className="h-10 w-10"
            src={shoppingCartIcon}
          ></img>
        </div>
        <div
          id="noti"
          className=" hover:cursor-pointer relative "
          // onClick={() => {
          //   setHasNewOrders(false);
          //   navigate(`/restaurant/${restaurantId}/orders`);
          // }}
        >
          {hasNewOrders && (
            <span className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          )}{" "}
          <img
            alt="notification"
            className="h-12 w-12"
            src={notificationIcon}
          ></img>
        </div>
        <div
          id="profile"
          className="rounded-full hover:cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            alt="profileImage"
            className="h-10 w-10 rounded-full"
            src={userProfile?.profileImgUrl ?? defaultProfileImage}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ClientMainHeader;
