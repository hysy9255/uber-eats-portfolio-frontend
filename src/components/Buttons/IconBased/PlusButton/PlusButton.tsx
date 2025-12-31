import plusIcon from "./plus-math.png";

interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        text-gray-700
        bg-white 
        rounded-full w-5 h-5 leading-none
        hover:bg-gray-100 active:bg-gray-200
        hover:cursor-pointer 
        flex items-center justify-center
        "
    >
      <img className="w-2 h-2 " src={plusIcon} />
    </button>
  );
};

export default PlusButton;
