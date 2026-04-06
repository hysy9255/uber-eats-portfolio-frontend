import icon from "./document.svg";

const OrdersIcon: React.FC<{ className: string }> = ({ className }) => {
  return <img className={className} src={icon} />;
};

export default OrdersIcon;
