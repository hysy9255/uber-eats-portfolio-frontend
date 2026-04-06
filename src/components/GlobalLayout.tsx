import { useState, type ReactNode } from "react";
import MainHeader from "./Headers/MainHeader";
import { useClientSideBar } from "../ReactContext/clientSideBar/UseClientSideBar";
import ClientSideBar from "./SideBars/ClientSideBar";
import { useAuth } from "../ReactContext/auth/UseAuth";
import { UserRole } from "../constants/UserRoleEnum";
import OwnerSidebar from "./SideBars/OwnerSidebar";

interface GlobalLayoutProps {
  children: ReactNode;
  isRelative?: boolean;
}

export const ClientGlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  isRelative = true,
}) => {
  const { sideBarOpen, setSideBarOpen } = useClientSideBar();
  const { user } = useAuth();

  if (!user) return;
  return (
    <div className={`px-3 select-none ${isRelative ?? "relative"}`}>
      <MainHeader setSideBarOpen={setSideBarOpen} />
      <section className="flex gap-x-5">
        {sideBarOpen && user.role === UserRole.Client && (
          <div className="max-[1200px]:hidden">
            <ClientSideBar />
          </div>
        )}
        {sideBarOpen && user.role === UserRole.Owner && (
          <div className="max-[1200px]:hidden">
            <OwnerSidebar />
          </div>
        )}

        <div className="w-full">{children}</div>
      </section>
    </div>
  );
};

const OwnerGlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  isRelative = true,
}) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const { user } = useAuth();

  if (!user) return;
  return (
    <div className={`px-3 select-none ${isRelative ?? "relative"}`}>
      <MainHeader setSideBarOpen={setSideBarOpen} />
      <section className="flex gap-x-5">
        {sideBarOpen && user.role === UserRole.Owner && (
          <div className="max-[1200px]:hidden">
            <OwnerSidebar />
          </div>
        )}

        <div className="w-full">{children}</div>
      </section>
    </div>
  );
};

const LoggedOutGlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  isRelative = true,
}) => {
  return (
    <div className={`px-3 select-none ${isRelative ?? "relative"}`}>
      <section className="flex gap-x-5">
        <div className="w-full">{children}</div>
      </section>
    </div>
  );
};

const GlobalLayoutWrapper: React.FC<GlobalLayoutProps> = ({
  children,
  isRelative = true,
}) => {
  const { user } = useAuth();
  return (
    <>
      {
        user &&
          user.role === UserRole.Client &&
          // <CartProvider>
          // <AddressProvider>
          // <ClientSideBarProvider>

          children

        // </ClientSideBarProvider>
        // </AddressProvider>
        // </CartProvider>
      }
      {user && user.role === UserRole.Owner && (
        <OwnerGlobalLayout isRelative={isRelative}>
          {children}
        </OwnerGlobalLayout>
      )}
      {!user && (
        <LoggedOutGlobalLayout isRelative={isRelative}>
          {children}
        </LoggedOutGlobalLayout>
      )}
    </>
  );
};

export default GlobalLayoutWrapper;
