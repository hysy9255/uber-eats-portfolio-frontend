import React, { useEffect, useState } from "react";
import defaultProfileImage from "../images/profile/profile.png";
import { Link } from "react-router-dom";
import uberEatsLogo from "../logos/logo.svg";
import { useForm } from "react-hook-form";
import { getToken } from "../auth";
import pencil from "../icons/pencil.png";
import { useAuth } from "../AuthContext";
// import { useIdentifyUserQuery } from "../../API/graphqls/authGraphQl";

interface IUpdatePassword {
  password: string;
  newPassword: string;
}

export type UserProfile = {
  role: string;
  email: string;
  phoneNumber: string;
  name: string;
  profileImgUrl: string;
};

const updatePassword = async (payload: {
  email: string;
  password: string;
  role: string;
}) => {
  const res = await fetch(`http://localhost:3002/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  // const token = getToken();
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
  }, [token]);

  // const [update, setUpdate] = useState(false);
  const update = true;

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { isValid },
  //   } = useForm<IUpdateAccountForm>({
  //     mode: "onChange",
  //   });

  return (
    <div id="main-frame" className="px-20 h-screen">
      <div
        id="secondary-header"
        className="pb-20 pt-20 flex items-center justify-center"
      >
        <Link to={`/restaurants`}>
          <img src={uberEatsLogo} className="w-64" alt="Nuber Eats"></img>
        </Link>
      </div>
      <div id="contents" className="flex flex-col items-center justify-center">
        <div
          id="profile-img"
          className="w-full flex justify-center items-center"
        >
          <img
            src={userProfile?.profileImgUrl ?? defaultProfileImage}
            className="w-52 h-52 border-2 border-black/20 rounded-full"
            alt="Profile"
          ></img>
        </div>
        <div
          id="info-box"
          className="w-full flex justify-center items-center py-10"
        >
          <div className={`${update ? "hidden" : "block"} `}>
            <div className="border-2 border-black/10 rounded-md lg:w-[700px] w-auto h-fit px-[24px]">
              <div className="py-[15px]">
                <div className="text-3xl font-light text-black/80">
                  Basic info
                </div>
                <div className="text-black/70">
                  Some info may be visible to other people
                </div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-[15px] text-[14px] ">
                <div>User Role</div>
                <div>{userProfile?.role}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-[15px] text-[14px] border-t-2 border-black/10">
                <div>Id</div>
                <div>{userProfile?.email}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-[15px] text-[14px] border-t-2 border-black/10">
                <div>Name</div>
                <div>{userProfile?.name}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-[15px] text-[14px] border-t-2 border-black/10">
                <div>Phone</div>
                <div>{userProfile?.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
        <form
          id="update-form"
          // onSubmit={handleSubmit(handleCreateAccountSubmit)}
          className={`grid gap-2 w-[600px] py-2 ${update ? "block" : "hidden"}`}
        >
          <div className="input border-2 py-2 pl-4">{userProfile?.name}</div>
          <div className="input border-2 py-2 pl-4">{userProfile?.email}</div>
          <div className="input border-2 py-2 pl-4">{userProfile?.role}</div>
          <input
            // {...register("email", {
            //   required: "Email is required",
            //   pattern:
            //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            // })}
            required
            name="phoneNumber"
            placeholder="phone number"
            className="input border-2 py-2 pl-4"
            defaultValue={userProfile?.phoneNumber ?? ""}
          />

          <input
            // {...register("password", {
            //   required: "Password is required",
            // })}
            required
            name="password"
            placeholder="password"
            className="input border-2 py-2 pl-4"
          />
          <input
            // {...register("password", {
            //   required: "Password is required",
            // })}
            required
            name="newPassword"
            placeholder="new password"
            className="input border-2 py-2 pl-4"
          />
          <div className="border-2 border-gray-200 p-3">
            <label className="font-semibold">New Profile Image</label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be the main representation of your profile.
            </p>
            <input
              // {...register("file", {
              //   required: "Image file is required",
              // })}
              type="file"
              accept="image/*"
            />
          </div>
          <button
            // className={`text-lg rounded-sm font-medium text-white py-4 transition-colors ${
            //   isValid
            //     ? "bg-lime-600 hover:bg-lime-700 active:bg-lime-800"
            //     : "bg-gray-300 pointer-events-none "
            // }`}

            className={`text-lg rounded-sm font-medium text-white py-4 transition-colors bg-lime-600 hover:bg-lime-700 active:bg-lime-800`}
          >
            Update
          </button>
        </form>
        <div id="info-update-button" className="w-full">
          <div className="flex flex-col justify-center items-center ">
            <div className="py-5">
              <div className="border-b-2 border-gray-300 w-[600px]"></div>
            </div>
            <div className="">Update user information?</div>

            <div
              onClick={() => setUpdate(!update)}
              className=" text-lime-600 hover:underline"
            >
              {update ? "Cancel" : "Update"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
