import homeIcon from "./home.png";

interface HomeIconProps {
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ className }) => {
  return <img src={homeIcon} className={className} />;
};

export default HomeIcon;
