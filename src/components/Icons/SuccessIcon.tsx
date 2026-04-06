type IconProps = {
  size?: number; // px
  className?: string;
  style?: React.CSSProperties;
};

const SuccessIcon: React.FC<IconProps> = ({ size = 72, className, style }) => {
  const p1 = { x: -0.3056 * size, y: 0.0278 * size };
  const p2 = { x: -0.0833 * size, y: 0.25 * size };
  const p3 = { x: 0.3611 * size, y: -0.1944 * size };

  const d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`;
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
      <circle
        cx="0"
        cy="0"
        r={`${size * 0.83}`}
        fill="#114F20"
        opacity="0.22"
      />

      {/* check mark */}
      <path
        d={d}
        stroke="white"
        strokeWidth={size * 0.16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SuccessIcon;
