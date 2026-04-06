import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ReactContext/auth/UseAuth";
import { UserRole } from "../../constants/UserRoleEnum";
import UberEatsLogo from "../UberEatsLogo";
import HamburgerHeader from "../Headers/HamburgerHeader";
import SideBarInfoText from "../SideBarInfoText";
import { useState } from "react";
import LogoutWarningModal from "../Modals/LogoutWarningModal";
import { useGeneralSideBar } from "../../ReactContext/GeneralSideBar/UseGeneralSideBar";

interface SideBarShellProps {
  children: React.ReactNode;
  className?: string;
  sideBarWidth: string;
}

const SideBarShell: React.FC<SideBarShellProps> = ({
  children,
  className,
  sideBarWidth,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSideBarOpen } = useGeneralSideBar();

  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

  const handleClickLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div
        className={`${className} ${sideBarWidth} text-sm flex flex-col justify-between`}
      >
        <section>
          <article className="flex gap-x-1 shrink-0 items-center h-[60px]">
            <HamburgerHeader
              setSideBarOpen={setSideBarOpen}
              className="text-slate-900 hover:cursor-pointer"
            />
            <UberEatsLogo />
          </article>
          <div className="pt-2">
            <article className="border-b border-gray-300 pb-5">
              {children}
            </article>
            <article className="pt-5">
              <div
                onClick={() => {
                  if (user.role === UserRole.Client) {
                    navigate("/client/profile");
                  }
                  if (user.role === UserRole.Owner) {
                    navigate("/dashboard/profile");
                  }
                }}
                className={`hover:cursor-pointer rounded-md py-2 pl-3 text-gray-700`}
              >
                <div className="flex gap-x-1">
                  <div>View Profile</div>
                </div>
              </div>
              <div
                onClick={() => setLogoutModalOpen(true)}
                className={`hover:cursor-pointer rounded-md py-2 pl-3 text-gray-700`}
              >
                <div className="flex gap-x-1">
                  <div>Log Out</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <SideBarInfoText className="text-gray-400 text-xs p-3" />
      </div>
      {logoutModalOpen && (
        <LogoutWarningModal
          onClickCancel={() => setLogoutModalOpen(false)}
          onClickLogoutAnyway={() => handleClickLogout()}
        />
      )}
    </>
  );
};

export default SideBarShell;
