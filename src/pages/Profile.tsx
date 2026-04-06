import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../ReactContext/auth/UseAuth";
import ProfileContactComponent from "../components/ProfileContactComponent";
import ProfileAccountComponent from "../components/ProfileAccountComponent";
import ProfileSecurityComponent from "../components/ProfileSecurityComponent";
import {
  profileDescription1,
  profileDescription2,
} from "../constants/Description";
import ProfileImageEditModal from "../components/Modals/ProfileImageEditModal";
import InfoPageIntroSection from "../components/InfoPageIntroSection";
import ContactEditModal from "../components/Modals/ContactEditModal";
import PasswordEditModal from "../components/Modals/PasswordEditModal";
import type { UpdatePasswordForm } from "../formDataTypes/user/updatePasswordForm.type";
import type { UpdateProfileForm } from "../formDataTypes/user/updateProfileForm.type";

export const commonLayoutCss =
  "grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-4 text-[14px]";

const Profile = () => {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const { user, setUser: setUserProfile } = useAuth();

  const { token } = useAuth();
  if (!token) throw new Error("No token");

  const profileFormMethods = useForm<UpdateProfileForm>({
    mode: "onSubmit",
  });

  const securityFormMethods = useForm<UpdatePasswordForm>({
    mode: "onSubmit",
  });

  const { reset: resetPhone } = profileFormMethods;

  useEffect(() => {
    const load = () => {
      resetPhone({
        phoneNumber: user?.phoneNumber,
      });
    };

    load();
  }, [resetPhone, user]);

  const handleClickCloseModal = () => {
    setProfilePreview(null);
  };

  const [contactEditModalOpen, setContactEditModalOpen] =
    useState<boolean>(false);

  const [passwordEditModalOpen, setPasswordEditModalOpen] =
    useState<boolean>(false);

  return (
    <Fragment>
      <main
        className="p-2 mx-auto max-w-[950px]
        "
      >
        <InfoPageIntroSection
          mainHeader="Personal Information"
          mainDesc="Information about you and your preferences across Uber Eats services"
          secondHeader="Your profile info in Uber Eats services"
          secondDesc={profileDescription1}
        />
        <section className="grid gap-6">
          <FormProvider {...profileFormMethods}>
            <ProfileAccountComponent
              user={user}
              setProfilePreview={setProfilePreview}
            />
          </FormProvider>
          <ProfileContactComponent
            user={user}
            onClickEdit={() => setContactEditModalOpen(true)}
          />
          <ProfileSecurityComponent
            onClickEdit={() => setPasswordEditModalOpen(true)}
          />
        </section>
        <section className={` text-gray-600 py-10`}>
          {profileDescription2}
        </section>
      </main>

      {profilePreview && (
        <FormProvider {...profileFormMethods}>
          <ProfileImageEditModal
            profilePreview={profilePreview}
            onClickClose={handleClickCloseModal}
            setUserProfile={setUserProfile}
          />
        </FormProvider>
      )}
      {contactEditModalOpen && (
        <FormProvider {...profileFormMethods}>
          <ContactEditModal
            onClickClose={() => setContactEditModalOpen(false)}
            setUserProfile={setUserProfile}
          />
        </FormProvider>
      )}
      {passwordEditModalOpen && (
        <FormProvider {...securityFormMethods}>
          <PasswordEditModal
            closeModal={() => setPasswordEditModalOpen(false)}
          />
        </FormProvider>
      )}
    </Fragment>
  );
};

export default Profile;
