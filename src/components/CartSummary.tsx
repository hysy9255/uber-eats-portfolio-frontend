import { Link } from "react-router-dom";
import DefaultRestaurantLogoImg from "./Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";
import { useCart } from "../ReactContext/cart/UseCart";
import CartTable from "./CartTable";

const CartSummary = () => {
  const { cart, restaurantName, restaurantLogo } = useCart();

  return (
    <section className="py-10 px-5">
      <article className="flex justify-between items-end border-b-2 border-gray-200 pb-5">
        {restaurantName ? (
          <Link to={`/restaurants/${cart.restaurantId}`}>
            <div className="flex gap-2 hover:cursor-pointer">
              {restaurantLogo ? (
                <img
                  className={`w-5 h-5 self-center object-contain rounded-full`}
                  src={restaurantLogo}
                />
              ) : (
                <DefaultRestaurantLogoImg className="w-5 h-5 rounded-full border border-gray-400" />
              )}
              <h1 className="font-semibold text-xl leading-none">
                {restaurantName}
              </h1>
            </div>
          </Link>
        ) : (
          <h1 className="font-semibold text-xl leading-none ">Shopping Cart</h1>
        )}

        <div className="font-semibold text-lg leading-none ">
          {cart.cartItems.length} Items
        </div>
      </article>
      <CartTable />
      <article className="flex justify-end">
        {cart.restaurantId && (
          <Link to={`/client/restaurants/${cart.restaurantId}`}>
            <button
              className="
          text-blue-500 bg-white
          border border-blue-500
          rounded-full px-3 py-1 text-xs font-semibold
          hover:cursor-pointer"
            >
              ADD MENU
            </button>
          </Link>
        )}
      </article>
    </section>
  );
};

export default CartSummary;
