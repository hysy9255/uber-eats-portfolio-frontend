interface BlankCircleIconProps {
  size?: number; // px
  className?: string;
  style?: React.CSSProperties;
}

const BlankCircleIcon: React.FC<BlankCircleIconProps> = ({
  size = 72,
  className,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${size} -${size} ${size * 2} ${size * 2}`}
      fill="none"
      className={className}
      aria-hidden="true"
      style={style}
    >
      {/* main circle */}
      <circle cx="0" cy="0" r={`${size}`} fill="#3ACF5E" />
      {/* subtle inner ring */}
      <circle cx="0" cy="0" r={`${size * 0.83}`} fill="#DEDCDE" />
    </svg>
  );
};

export default BlankCircleIcon;
