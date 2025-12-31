import { XMarkIcon } from "./XMarkIcon";

interface RoundBorderXMarkButtonProps {
  className?: string;
  onClick?: () => void;
}

const RoundBorderXMarkButton: React.FC<RoundBorderXMarkButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-full w-6 h-6 
        flex items-center justify-center
        hover:cursor-pointer
        border
        ${className}
        `}
    >
      <XMarkIcon className="text-gray-400 w-4 h-4 font-extrabold" />
    </div>
  );
};

export default RoundBorderXMarkButton;
