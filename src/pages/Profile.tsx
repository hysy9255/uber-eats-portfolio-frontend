import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InfoImg from "../logos/infoImg.png";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import LoginButton from "../components/Buttons/LoginButton";
import ProfileHeader from "../components/Headers/ProfileHeader";
import CartHeader from "../components/Headers/CartHeader";
import AlarmHeader from "../components/Headers/AlarmHeader";
import GlobalLayout from "../components/GlobalLayout";
import { getMyProfile } from "../api/userApi";
import { useAuth } from "../ReactContext/auth/UseAuth";

import ProfileContactComponent from "../components/ProfileContactComponent";
import ProfileAccountComponent from "../components/ProfileAccountComponent";
import ProfileSecurityComponent from "../components/ProfileSecurityComponent";
import type { ProfileDTO } from "../api/DTOs";

import {
  profileDescription1,
  profileDescription2,
} from "../constants/Description";
import ProfileImageEditModal from "../components/Modals/ProfileImageEditModal";

export type UpdatePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserProfile = ProfileDTO;

export type UpdateProfileForm = { phoneNumber: string; profileImgUrl: string };

export const commonLayoutCss =
  "grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-4 text-[14px]";

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const { token } = useAuth();
  if (!token) throw new Error("No token");

  const contactFormMethods = useForm<UpdateProfileForm>({
    mode: "onSubmit",
  });

  const securityFormMethods = useForm<UpdatePasswordForm>({
    mode: "onSubmit",
  });

  const { reset: resetPhone } = contactFormMethods;

  useEffect(() => {
    if (profilePreview) setModalOpen(true);
  }, [profilePreview]);

  useEffect(() => {
    const load = async () => {
      const profile = await getMyProfile(token);
      setUserProfile({
        role: profile.role,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        name: profile.name,
        profileImgUrl: profile.profileImgUrl,
      });

      resetPhone({
        phoneNumber: profile.phoneNumber,
      });
    };

    load();
  }, [token, resetPhone]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <GlobalLayout>
      <MainHeaderV2
        signIn={<LoginButton />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <main
        className="py-2 
                    w-[100px] mx-auto
                    min-[460px]:w-[410px]
                    min-[700px]:w-[650px]
                    min-[1000px]:w-[950px]
                    "
      >
        <section className="flex flex-col items-center justify-center gap-2">
          <label className="text-2xl font-semibold">Personal Information</label>
          <p>
            Information about you and your preferences across Uber Eats services
          </p>
        </section>
        <section className="grid gap-x-2 gap-y-4 my-10 min-[700px]:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2 order-2 min-[700px]::order-1">
            <label className="text-2xl font-semibold">
              Your profile info in Uber Eats services
            </label>
            <p>{profileDescription1}</p>
          </div>
          <div className="flex items-center justify-center order-1 min-[700px]:order-2">
            <img src={InfoImg} className="w-[360px] h-[128px]"></img>
          </div>
        </section>

        <section className="grid gap-6">
          <ProfileAccountComponent
            userProfile={userProfile}
            setProfilePreview={setProfilePreview}
          />
          <FormProvider {...contactFormMethods}>
            <ProfileContactComponent userProfile={userProfile} />
          </FormProvider>
          <FormProvider {...securityFormMethods}>
            <ProfileSecurityComponent />
          </FormProvider>
        </section>
        <section className={` text-gray-600 py-10`}>
          {profileDescription2}
        </section>
      </main>

      {modalOpen && profilePreview && (
        <ProfileImageEditModal
          profilePreview={profilePreview}
          onClickClose={handleClickCloseModal}
        />
      )}

      {/* <ProfileImageEditModal /> */}
    </GlobalLayout>
  );
};

export default Profile;
