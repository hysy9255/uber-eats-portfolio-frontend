import icon from "./user.svg";

const UserIcon: React.FC<{ className: string }> = ({ className }) => {
  return <img className={className} src={icon} />;
};

export default UserIcon;
