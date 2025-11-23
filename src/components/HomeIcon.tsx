export function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 3 10v10a1 1 0 0 0 1 1h6v-6h4v6h6a1 1 0 0 0 1-1V10l-9-7Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 20v-8.5L12 5 4 11.5V20a1 1 0 0 0 1 1h5v-6h4v6h5a1 1 0 0 0 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
