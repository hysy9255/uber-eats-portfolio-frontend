import carIcon from "./car.png";

interface CarIconProps {
  className?: string;
}

const CarIcon: React.FC<CarIconProps> = ({ className }) => {
  return <img className={className} src={carIcon} />;
};

export default CarIcon;
