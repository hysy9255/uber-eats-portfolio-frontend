import icon from "./book-alt.svg";

const DeliveryAddressIcon: React.FC<{ className: string }> = ({
  className,
}) => {
  return <img className={className} src={icon} />;
};

export default DeliveryAddressIcon;
