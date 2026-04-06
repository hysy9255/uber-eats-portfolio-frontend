import icon from "./shopping-cart.svg";

const CartIcon: React.FC<{ className: string }> = ({ className }) => {
  return <img className={className} src={icon} />;
};

export default CartIcon;
