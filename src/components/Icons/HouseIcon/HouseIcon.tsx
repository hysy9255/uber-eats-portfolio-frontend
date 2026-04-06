import houseIcon from "./house.png";

interface HouseIconProps {
  className?: string;
}

const HouseIcon: React.FC<HouseIconProps> = ({ className }) => {
  return <img src={houseIcon} className={className} />;
};

export default HouseIcon;
