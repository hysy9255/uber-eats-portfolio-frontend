import { useState, type ReactNode } from "react";
import { GeneralSideBarContext } from "./GeneralSidebarContext";

interface GeneralSideBarProviderProps {
  children: ReactNode;
}

export const GeneralSideBarProvider: React.FC<GeneralSideBarProviderProps> = ({
  children,
}) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  return (
    <GeneralSideBarContext.Provider
      value={{
        sideBarOpen,
        setSideBarOpen,
      }}
    >
      {children}
    </GeneralSideBarContext.Provider>
  );
};
