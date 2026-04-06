type IconProps = {
  size?: number;
  className?: string;
};

const BlackStarIcon: React.FC<IconProps> = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.938 5.953 6.57.955-4.754 4.633 1.122 6.544L12 17.49l-5.876 3.095 1.122-6.544-4.754-4.633 6.57-.955L12 2.5z" />
    </svg>
  );
};

export default BlackStarIcon;
