import { Link } from "react-router-dom";
import { useCart } from "../../ReactContext/cart/UseCart";
import ShoppingBagIcon from "../Icons/ShoppingBagIcon/ShoppingBagIcon";

const CartHeader = () => {
  const { cart } = useCart();
  const number = cart.cartItems.length;

  return (
    <Link to="/cart">
      <div className="w-[35px] h-[35px] relative">
        <ShoppingBagIcon
          children={
            <div
              className={`${
                number === 0 ? "hidden" : "block"
              } text-white text-xs font-semibold`}
            >
              {number}
            </div>
          }
          className="
          absolute inset-0 bg-cover bg-center 
          flex items-center justify-center 
          hover:cursor-pointer"
        />
      </div>
    </Link>
  );
};

export default CartHeader;
