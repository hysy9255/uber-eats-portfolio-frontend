import type { ReactNode } from "react";

interface GlobalLayoutProps {
  children: ReactNode;
  isRelative?: boolean;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  isRelative = true,
}) => {
  return (
    <div className={`px-3 select-none ${isRelative ?? "relative"}`}>
      {children}
    </div>
  );
};

export default GlobalLayout;
