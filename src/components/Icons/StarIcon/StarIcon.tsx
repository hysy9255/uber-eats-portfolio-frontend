import starIcon from "./star.png";

interface StarIconProps {
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className }) => {
  return <img src={starIcon} className={className} />;
};

export default StarIcon;
