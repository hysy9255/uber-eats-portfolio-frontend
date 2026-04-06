import icon from "./user-logout.svg";

const UserLogoutIcon: React.FC<{ className: string }> = ({ className }) => {
  return <img className={className} src={icon} />;
};

export default UserLogoutIcon;
