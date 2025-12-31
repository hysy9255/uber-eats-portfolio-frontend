import logOutImg from "./logout.png";

interface LogOutIconProps {
  className?: string;
}

const LogOutIcon: React.FC<LogOutIconProps> = ({ className }) => {
  return <img className={className} src={logOutImg} />;
};

export default LogOutIcon;
