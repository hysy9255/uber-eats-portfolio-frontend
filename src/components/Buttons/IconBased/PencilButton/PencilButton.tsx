import { PencilIcon } from "./PencilIcon";

interface PencilButtonProps {
  className?: string;
  onClick?: () => void;
}

const PencilButton: React.FC<PencilButtonProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={` 
            rounded-full w-5 h-5 flex items-center justify-center 
            border  
            hover:cursor-pointer
            ${className}
            `}
    >
      <PencilIcon className="w-3 h-3 " />
    </div>
  );
};

export default PencilButton;
