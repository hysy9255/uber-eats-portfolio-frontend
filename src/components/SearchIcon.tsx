export function SearchIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 21l-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="10.8"
        cy="10.8"
        r="7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M21 21l-4.3-4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
