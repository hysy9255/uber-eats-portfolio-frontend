type PinIconProps = {
  size?: number; // px
  strokeWidth?: number;
  className?: string; // ex) "text-red-500"
};

export const PinIcon: React.FC<PinIconProps> = ({
  size = 28,
  strokeWidth = 1.8,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="2.3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);
