import { useEffect, useState } from "react";
import defaultProfileImage from "../images/profile/profile.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext";
import { formatPhone } from "../utils/formatPhone";
// import NewHeader from "../components/MainHeader/NewHeader";
import InfoImg from "../logos/infoImg.png";
import MainHeaderV2 from "../components/MainHeaderV2";
import LoginButton from "../components/LoginButton";
import SearchBar from "../components/SearchBar";
import ProfileHeader from "../components/ProfileHeader";
import CartHeader from "../components/CartHeader";
import AlarmHeader from "../components/AlarmHeader";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserProfile = {
  role: string;
  email: string;
  phoneNumber: string;
  name: string;
  profileImgUrl: string;
};

type PhoneForm = { phoneNumber: string };

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { token } = useAuth();
  if (!token) throw new Error("No token");

  const [editingPhone, setEditingPhone] = useState(false);
  const [editingPwd, setEditingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

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

  const {
    register,
    handleSubmit: handlePhoneSubmit,
    // setValue,
    // reset,
    formState: { isSubmitting, isDirty },
  } = useForm<PhoneForm>({
    defaultValues: { phoneNumber: userProfile?.phoneNumber },
  });

  const onSavePhone = handlePhoneSubmit(async ({ phoneNumber }) => {
    const res = await fetch("http://localhost:3002/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": token!,
      },
      body: JSON.stringify({ phoneNumber }),
    });
    if (!res.ok) {
      return;
    }
    setUserProfile((u) => (u ? { ...u, phoneNumber } : u));
    setEditingPhone(false);
  });

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { isSubmitting: pwdSaving, errors: pwdErrors },
    watch: watchPwd,
  } = useForm<PasswordForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSavePassword = handlePwdSubmit(
    async ({ currentPassword, newPassword }) => {
      try {
        const res = await fetch("http://localhost:3002/users/password", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "jwt-token": token! },
          body: JSON.stringify({
            password: currentPassword,
            newPassword,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Unknown error");
        }
        setPwdMsg({ type: "ok", text: "Password updated successfully." });
        resetPwd();
        setEditingPwd(false);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        setPwdMsg({ type: "err", text: message });
      }
    }
  );

  // const rail = "mx-auto max-w-screen-2xl px-6 lg:px-10";
  const rail = "mx-auto max-w-screen-xl px-6";
  return (
    <>
      {/* <NewHeader /> */}
      <MainHeaderV2
        layoutWidth={rail}
        // hamburger={<HamburgerHeader />}
        signIn={<LoginButton />}
        searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <main className="max-w-screen-xl mx-auto px-6 pt-15">
        <div className="flex flex-col items-center justify-center gap-2">
          <label className="text-3xl">Personal Info</label>
          <p>Info about you and your preferences across Uber Eats services</p>
        </div>
        <div className="flex items-center justify-center gap-2 my-10">
          <div className="flex flex-col gap-2">
            <label className="text-3xl">
              Your profile info in Uber Eats services
            </label>
            <p>
              Personal info and options to manage it. You can make some of this
              info, like your contact details, visible to others so they can
              reach you easily. You can also see a summary of your profiles.
            </p>
          </div>
          <img src={InfoImg} className="w-[360px] h-[128px]"></img>
        </div>
        <div className="grid gap-6">
          {/* Account (읽기 전용) */}
          <div className="border-2 border-black/10 rounded-md p-6">
            <div className="mb-4">
              <div className="text-3xl font-light text-black/80">Account</div>
              <div className="text-black/60">These fields can’t be edited.</div>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-y-4 text-[14px]">
              <div>Profile Picture</div>
              <div className="flex">
                <img
                  id="profile-img"
                  src={userProfile?.profileImgUrl ?? defaultProfileImage}
                  className="w-20 h-20 border-2 border-black/20 rounded-full object-cover"
                  alt="Profile"
                ></img>
              </div>

              <div>Name</div>
              <input
                className="border rounded px-3 py-2 bg-gray-50 text-gray-700"
                readOnly
                value={userProfile?.name}
              />
              <div>Email</div>
              <input
                className="border rounded px-3 py-2 bg-gray-50 text-gray-700"
                readOnly
                value={userProfile?.email}
              />
              <div>Role</div>
              <input
                className="border rounded px-3 py-2 bg-gray-50 text-gray-700"
                readOnly
                value={userProfile?.role}
              />
            </div>
          </div>
          {/* Contact (전화번호 편집 가능) */}
          <div className="border-2 border-black/10 rounded-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-light text-black/80">Contact</div>
                <div className="text-black/60">
                  You can update your phone number.
                </div>
              </div>
              {!editingPhone && (
                <button
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                  onClick={() => setEditingPhone(true)}
                >
                  Edit
                </button>
              )}
            </div>

            <form
              onSubmit={onSavePhone}
              className="grid grid-cols-[200px_1fr] gap-y-4 text-[14px]"
            >
              <label>Phone</label>
              {editingPhone ? (
                <div className="flex items-center gap-3">
                  <input
                    type="tel"
                    className="border rounded px-3 py-2 flex-1"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^[0-9\-\s()+]{6,20}$/,
                      value: formatPhone(userProfile?.phoneNumber),
                    })}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      setEditingPhone(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className={`px-3 py-2 rounded text-white ${
                      isSubmitting || !isDirty
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-lime-600 hover:bg-lime-700"
                    }`}
                  >
                    {isSubmitting ? "Saving…" : "Save"}
                  </button>
                </div>
              ) : (
                <input
                  className="border rounded px-3 py-2 bg-gray-50 text-gray-700"
                  readOnly
                  value={formatPhone(userProfile?.phoneNumber)}
                />
              )}
            </form>
          </div>

          {/* Security (password update) */}
          <div className="border-2 border-black/10 rounded-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-light text-black/80">
                  Security
                </div>
                <div className="text-black/60">Change your password.</div>
              </div>

              {!editingPwd && (
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    setPwdMsg(null);
                    setEditingPwd(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>

            {pwdMsg && (
              <div
                className={`mb-3 text-sm ${
                  pwdMsg.type === "ok" ? "text-green-700" : "text-red-600"
                }`}
              >
                {pwdMsg.text}
              </div>
            )}

            {editingPwd ? (
              <form
                onSubmit={onSavePassword}
                className="grid grid-cols-[200px_1fr] gap-y-4 text-[14px]"
              >
                <label className="self-center">Current password</label>
                <div>
                  <input
                    type="password"
                    autoComplete="current-password"
                    className="w-full border rounded px-3 py-2"
                    {...registerPwd("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {pwdErrors.currentPassword && (
                    <div className=" text-sm text-red-600">
                      {pwdErrors.currentPassword.message?.toString()}
                    </div>
                  )}
                </div>

                <label className="self-center">New password</label>
                <div>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="w-full border rounded px-3 py-2"
                    {...registerPwd("newPassword", {
                      required: "New password is required",
                      minLength: { value: 4, message: "At least 4 characters" },
                    })}
                  />
                  {pwdErrors.newPassword && (
                    <div className="text-sm text-red-600">
                      {pwdErrors.newPassword.message?.toString()}
                    </div>
                  )}
                </div>

                <label className="self-center">Confirm new password</label>
                <div>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="w-full border rounded px-3 py-2"
                    {...registerPwd("confirmNewPassword", {
                      required: "Confirm password is required",
                      validate: (val) =>
                        val === watchPwd("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  {pwdErrors.confirmNewPassword && (
                    <div className="text-sm text-red-600">
                      {pwdErrors.confirmNewPassword.message?.toString()}
                    </div>
                  )}
                </div>

                {/* spacer */}
                <div />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      resetPwd();
                      setEditingPwd(false);
                      setPwdMsg(null);
                    }}
                    disabled={pwdSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-3 py-2 rounded text-white ${
                      pwdSaving
                        ? "bg-gray-300"
                        : "bg-lime-600 hover:bg-lime-700"
                    }`}
                    disabled={pwdSaving}
                  >
                    {pwdSaving ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-[200px_1fr] gap-y-4 text-[14px]">
                <div>Password</div>
                <input
                  className="border rounded px-3 py-2 bg-gray-50 text-gray-700"
                  readOnly
                  value={"****"}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className={`${rail}  text-gray-600 py-10 px-10`}>
        Only you can see your settings. You might also want to review your
        settings for Maps, Search, or whichever Google services you use most.
        Google keeps your data private, safe, and secure. Learn more
      </footer>
    </>
  );
};

export default Profile;
