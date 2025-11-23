interface EllipsisButtonProps {
  onClick: () => void;
  pressed: boolean;
}

export const EllipsisButton: React.FC<EllipsisButtonProps> = ({
  onClick,
  pressed,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Open actions"
      className={`${
        pressed && "border"
      } hover:border border-gray-300 cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-md `}
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
        <circle cx="4" cy="10" r="1.4" />
        <circle cx="10" cy="10" r="1.4" />
        <circle cx="16" cy="10" r="1.4" />
      </svg>
    </button>
  );
};
