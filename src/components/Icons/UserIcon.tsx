type UserIconProps = {
  size?: number;
  className?: string; // ex) "text-slate-300"
};

export const UserIcon: React.FC<UserIconProps> = ({ size = 28, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 12a4.25 4.25 0 1 0-4.25-4.25A4.25 4.25 0 0 0 12 12Z" />
    <path d="M4.5 20.25c0-3.2 3.2-5.5 7.5-5.5s7.5 2.3 7.5 5.5c0 .4-.3.75-.75.75H5.25c-.45 0-.75-.35-.75-.75Z" />
  </svg>
);
