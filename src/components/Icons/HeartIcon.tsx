export function HeartIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-8-5.2-8-10.3A4.7 4.7 0 0 1 8.9 5c1.5 0 2.7.7 3.1 1.6C12.4 5.7 13.6 5 15.1 5A4.7 4.7 0 0 1 20 9.7C20 14.8 12 20 12 20Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-8-5.2-8-10.3A4.7 4.7 0 0 1 8.9 5c1.5 0 2.7.7 3.1 1.6C12.4 5.7 13.6 5 15.1 5A4.7 4.7 0 0 1 20 9.7C20 14.8 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
