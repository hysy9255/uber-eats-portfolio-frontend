import gear from "./gear.png";

interface GearIconProps {
  className?: string;
}

const GearIcon: React.FC<GearIconProps> = ({ className }) => {
  return <img src={gear} className={className} />;
};

export default GearIcon;
