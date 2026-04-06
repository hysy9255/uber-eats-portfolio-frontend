import binIcon from "./bin.png";

interface TrashCanIconProps {
  className?: string;
  onClick: () => void;
}

const TrashCanIcon: React.FC<TrashCanIconProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
      hover:cursor-pointer
      flex items-center justify-center`}
    >
      <img className={className} src={binIcon} />
    </div>
  );
};

export default TrashCanIcon;
