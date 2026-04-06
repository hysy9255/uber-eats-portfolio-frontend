import UberEatsLogo from "../UberEatsLogo";
import ProfileHeader from "./ProfileHeader";
import HamburgerHeader from "./HamburgerHeader";
import { useGeneralSideBar } from "../../ReactContext/GeneralSideBar/UseGeneralSideBar";

interface MainHeaderProps {
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ className }) => {
  const { setSideBarOpen } = useGeneralSideBar();
  return (
    <header
      className={`
        ${className}
        bg-white
        gap-x-6 h-[60px] 
        flex items-center justify-between`}
    >
      <article className="flex gap-x-1 shrink-0 items-center">
        <HamburgerHeader
          setSideBarOpen={setSideBarOpen}
          className="text-slate-900 hover:cursor-pointer"
        />
        <UberEatsLogo />
      </article>
      <ProfileHeader className="mx-3" />
    </header>
  );
};

export default MainHeader;
