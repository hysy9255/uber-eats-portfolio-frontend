import binIcon from "./bin.png";

interface TrashCanButtonProps {
  onClick: () => void;
}

const TrashCanButton: React.FC<TrashCanButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
          rounded-full w-5 h-5 
          hover:bg-gray-100 active:bg-gray-200
          hover:cursor-pointer 
          flex items-center justify-center
          "
    >
      <img className="w-2 h-2" src={binIcon} />
    </div>
  );
};

export default TrashCanButton;
