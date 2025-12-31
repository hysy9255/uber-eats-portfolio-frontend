interface SubmitButtonProps {
  onClick: () => void;
  buttonName: string;
  className?: string;
  disabled?: boolean;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  buttonName,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`leading-none font-semibold text-xs 
        text-white
        
        border border-green-400 bg-green-600 
        hover:cursor-pointer
        hover:bg-green-700 active:bg-green-800 ${className}`}
    >
      {buttonName}
    </button>
  );
};

export default SubmitButton;
