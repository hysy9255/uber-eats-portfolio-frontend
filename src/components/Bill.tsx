import { Link } from "react-router-dom";
import { useCart } from "../ReactContext/cart/UseCart";

const Bill = () => {
  const { cart, calculatTotalCost } = useCart();
  return (
    <div className=" w-full p-3 rounded-lg flex flex-col gap-y-3 sticky top-30 bg-white border border-gray-300 shadow-md">
      <div className="text-xl font-bold ">Your cart</div>
      <div className="">{cart.cartItems.length} items</div>
      <div className="space-y-2">
        {cart.cartItems.map((item) => (
          <div className="flex justify-between gap-x-4">
            <Link
              to={`/restaurants/${cart.restaurantId}/dishes/${item.dishId}`}
            >
              <div className="leading-none hover:cursor-pointer hover:underline">
                {item.name} ({item.quantity})
              </div>
            </Link>

            <div className="leading-none">${item.price}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-between">
        <div>Subtotal</div>
        <div>${calculatTotalCost()}</div>
      </div>

      <Link to={"/cart"}>
        <div className="bg-black text-gray-200 py-3 rounded-md flex items-center justify-center">
          View Cart
        </div>
      </Link>
    </div>
  );
};

export default Bill;
