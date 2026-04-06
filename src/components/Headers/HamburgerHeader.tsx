interface HamburgerHeaderProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  gap?: number;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerHeader: React.FC<HamburgerHeaderProps> = ({
  size = 20,
  strokeWidth = 2.5,
  className = "text-slate-900",
  gap = 6,
  setSideBarOpen,
}) => {
  return (
    <div
      onClick={() => setSideBarOpen((prev) => !prev)}
      className="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 12"
        fill="none"
        className={className}
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <line x1="0" y1={0} x2="18" y2={0} />
        <line x1="0" y1={0 + gap} x2="18" y2={0 + gap} />
        <line x1="0" y1={0 + 2 * gap} x2="18" y2={0 + 2 * gap} />
      </svg>
    </div>
  );
};

export default HamburgerHeader;
