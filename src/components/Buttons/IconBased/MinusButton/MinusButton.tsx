import minusIcon from "./minus-math.png";

interface MinusButtonProps {
  onClick: () => void;
}

const MinusButton: React.FC<MinusButtonProps> = ({ onClick }) => {
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
      <img className="w-2 h-2 " src={minusIcon} />
    </button>
  );
};

export default MinusButton;
