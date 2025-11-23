export function ReceiptIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h12v18l-3-1.5L12 21l-3-1.5L6 21V3Z" fill="currentColor" />
      <path
        d="M8.5 8.5H16M8.5 12H16M8.5 15.5H14"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 3h12v18l-3-1.5L12 21l-3-1.5L6 21V3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5H16M8.5 12H16M8.5 15.5H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
