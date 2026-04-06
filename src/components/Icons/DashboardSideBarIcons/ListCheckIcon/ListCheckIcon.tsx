import listCheckIcon from "./list-check.png";

interface ListCheckIconProps {
  className?: string;
}

const ListCheckIcon: React.FC<ListCheckIconProps> = ({ className }) => {
  return <img src={listCheckIcon} className={className} />;
};

export default ListCheckIcon;
