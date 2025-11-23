import React from "react";
import UberEatsLogo from "./UberEatsLogo";
import { useAuth } from "../AuthContext";

type MainHeader2Props = {
  layoutWidth: string;
  signIn?: React.ReactNode;
  hamburger?: React.ReactNode;
  profile?: React.ReactNode;
  cart?: React.ReactNode;
  alarm?: React.ReactNode;
  searchBar?: React.ReactNode;
  help?: React.ReactNode;
  useHelp?: boolean;
  sticky?: boolean;
};

const MainHeaderV2: React.FC<MainHeader2Props> = ({
  // layoutWidth,
  hamburger,
  profile,
  signIn,
  cart,
  alarm,
  searchBar,
  help,
  sticky,
}) => {
  const { loggedIn } = useAuth();

  return (
    <header
      className={`
        ${sticky ? "sticky top-0 z-40" : ""}
        bg-white/90 backdrop-blur border-b border-black/5 
        gap-x-6 gap-y-3 py-3 h-[56px] 
        flex items-center justify-between flex-wrap sm:flex-nowrap`}
    >
      <article className="flex gap-2 shrink-0 ">
        {hamburger}
        <UberEatsLogo navigatesTo="/" />
      </article>

      <article className="order-2 sm:order-3 shrink-0 flex items-center gap-2  px-3">
        {/* {alarm}
        {cart} */}
        {loggedIn ? (
          <>
            {alarm} {cart} {profile}
          </>
        ) : (
          signIn
        )}
        {help}
      </article>

      {searchBar && (
        <article className="order-3 sm:order-2 flex-[0_1_60rem] ">
          {searchBar}
        </article>
      )}
    </header>
  );
};

export default MainHeaderV2;
