import React from "react";

type IconProps = {
  size?: number; // px
  className?: string;
};

export const SuccessBadgeIcon: React.FC<IconProps> = ({
  size = 120,
  className,
}) => {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.62)}
      viewBox="0 0 360 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* confetti (left) */}
      <rect
        x="58"
        y="52"
        width="10"
        height="22"
        rx="5"
        transform="rotate(-20 58 52)"
        fill="#55C7A4"
      />
      <rect
        x="82"
        y="38"
        width="10"
        height="22"
        rx="5"
        transform="rotate(18 82 38)"
        fill="#F4C84A"
      />
      <rect
        x="108"
        y="52"
        width="10"
        height="22"
        rx="5"
        transform="rotate(-10 108 52)"
        fill="#5BA8FF"
      />

      {/* confetti (right) */}
      <rect
        x="282"
        y="52"
        width="10"
        height="22"
        rx="5"
        transform="rotate(20 282 52)"
        fill="#55C7A4"
      />
      <rect
        x="256"
        y="38"
        width="10"
        height="22"
        rx="5"
        transform="rotate(-18 256 38)"
        fill="#F4C84A"
      />
      <rect
        x="232"
        y="52"
        width="10"
        height="22"
        rx="5"
        transform="rotate(10 232 52)"
        fill="#5BA8FF"
      />

      {/* main circle */}
      <circle cx="180" cy="110" r="72" fill="#39B66A" />
      {/* subtle inner ring */}
      <circle cx="180" cy="110" r="60" fill="#2FA85F" opacity="0.22" />

      {/* check mark */}
      <path
        d="M155 112.5l15.5 15.5L210 88.5"
        stroke="white"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
