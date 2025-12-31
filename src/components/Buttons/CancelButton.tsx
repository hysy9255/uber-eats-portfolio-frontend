interface CancelButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`leading-none font-semibold text-xs
        bg-gray-100 text-gray-500 
        border border-gray-400 
        hover:cursor-pointer
        hover:bg-gray-200 active:bg-gray-300 ${className}`}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
