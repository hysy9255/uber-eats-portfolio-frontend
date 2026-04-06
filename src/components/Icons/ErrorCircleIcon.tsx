type Props = {
  className?: string;
};

export function ErrorCircleIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="g" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="55%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>

      <circle cx="20" cy="20" r="18" fill="url(#g)" filter="url(#shadow)" />

      <rect x="18.2" y="9" width="3.6" height="17" rx="1.8" fill="#fff" />
      <circle cx="20" cy="30" r="2.4" fill="#fff" />
    </svg>
  );
}
