interface PhoneIconProps {
  size?: number; // px
  strokeWidth?: number;
  className?: string; // ex) "text-red-500"
}

export const PhoneIcon: React.FC<PhoneIconProps> = ({
  size = 28,
  strokeWidth = 2,
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
      d="M8.6 10.7c1.3 2.4 2.9 4 5.3 5.3l1.8-1.8c.3-.3.7-.4 1.1-.3 1.1.4 2.2.6 3.4.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.4 0 .8-.3 1.1L8.6 10.7Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
