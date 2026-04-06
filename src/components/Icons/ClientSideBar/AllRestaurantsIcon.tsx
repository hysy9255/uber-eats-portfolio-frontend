import icon from "./restaurant.svg";
const AllRestaurantsIcon: React.FC<{ className: string }> = ({ className }) => {
  return <img className={className} src={icon} />;
};

export default AllRestaurantsIcon;
