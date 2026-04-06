import type { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
  isRelative?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  isRelative,
}) => {
  return (
    <div className={`px-3 select-none ${isRelative ?? "relative"}`}>
      <section className="flex gap-x-5">
        <div className="w-full">{children}</div>
      </section>
    </div>
  );
};

export default PublicLayout;
