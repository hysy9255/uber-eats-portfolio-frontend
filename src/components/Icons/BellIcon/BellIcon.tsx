import bellImg from "./bell.png";

interface BellIconProps {
  children: React.ReactNode;
  className?: string;
}

const BellIcon: React.FC<BellIconProps> = ({ children, className }) => {
  return (
    <div className={className} style={{ backgroundImage: `url(${bellImg})` }}>
      {children}
    </div>
  );
};

export default BellIcon;
