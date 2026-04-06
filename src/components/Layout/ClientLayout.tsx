import { type ReactNode } from "react";
import MainHeader from "../Headers/MainHeader";
import ClientSideBar from "../SideBars/ClientSideBar";
import { useGeneralSideBar } from "../../ReactContext/GeneralSideBar/UseGeneralSideBar";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { sideBarOpen } = useGeneralSideBar();

  const sideBarWidth = "w-[200px]";
  const xPadding = "px-2";

  return (
    <div className={`min-h-screen select-none`}>
      <MainHeader
        className={`fixed top-0 left-0 z-10 ${xPadding} w-full max-[1300px]:z-[50] z-[300]`}
      />
      <section className="h-[100vh] flex">
        {sideBarOpen && (
          <>
            {/* <div className="bg-black/50 fixed inset-0 z-400" /> */}
            <div className="bg-black/50 fixed inset-0 min-[1300px]:hidden z-[100]" />
            <ClientSideBar
              className={`fixed h-[100vh] ${xPadding} bg-white z-[200]`}
              sideBarWidth={sideBarWidth}
            />
            <div className={`${sideBarWidth} max-[1300px]:hidden block`} />
          </>
        )}

        <main className="flex-1 pt-[60px] overflow-y-auto">{children}</main>
      </section>
    </div>
  );
};

export default ClientLayout;
