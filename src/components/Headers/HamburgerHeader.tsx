const HamburgerHeader = () => {
  const size = 28;
  const strokeWidth = 2.5;
  const className = "text-slate-900",
    gap = 6;
  return (
    <div
      className="h-8 w-8 flex justify-center items-center 
      rounded-full hover:bg-slate-200 hover:bg-opacity-10
      active:bg-slate-300"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        className={className}
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <line x1="5" y1={8} x2="23" y2={8} />
        <line x1="5" y1={8 + gap} x2="23" y2={8 + gap} />
        <line x1="5" y1={8 + 2 * gap} x2="23" y2={8 + 2 * gap} />
      </svg>
    </div>
  );
};

export default HamburgerHeader;
