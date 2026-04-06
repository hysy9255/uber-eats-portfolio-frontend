import { Link } from "react-router-dom";
import { useCart } from "../ReactContext/cart/UseCart";
import MinusButton from "./Buttons/IconBased/MinusButton/MinusButton";
import PlusButton from "./Buttons/IconBased/PlusButton/PlusButton";
import TrashCanButton from "./Buttons/IconBased/TrashCanButton/TrashCanButton";

const CartTable = () => {
  const { removeDishQuantity, addDishQuantity, cart } = useCart();

  const incrementQuantity = (dishId: string) => {
    addDishQuantity(dishId);
  };
  const decrementQuantity = (dishId: string) => {
    removeDishQuantity(dishId);
  };
  return (
    <table className="w-full text-gray-600 text-xs">
      <colgroup>
        <col className="w-[52%]" />
        <col className="w-[14%]" />
        <col className="w-[18%]" />
        <col className="w-[16%]" />
      </colgroup>
      <thead>
        <tr className="">
          <th className="text-left p-3 ">PRODUCT DETAILS</th>
          <th className="text-left p-3 ">PRICE</th>
          <th className="text-center p-3 ">QUANTITY</th>
          <th className="text-left p-3 ">TOTAL</th>
        </tr>
      </thead>

      <tbody>
        {cart.cartItems.map((item, index) => (
          <tr key={index}>
            <td className="p-3">
              <div className="flex gap-3">
                <Link
                  className="shrink-0"
                  to={`/client/restaurants/${cart.restaurantId}/dishes/${item.dishId}`}
                >
                  <img
                    src={item.dishImgUrl}
                    className="w-25 h-25 aspect-[1/1] object-cover hover:cursor-pointer rounded-sm"
                  />
                </Link>
                <div className="space-y-1">
                  <div className="text-black text-sm font-semibold">
                    {item.name}
                  </div>
                  <div className="text-xs font-normal text-gray-500 max-[950px]:line-clamp-3">
                    {item.description}
                  </div>
                </div>
              </div>
            </td>
            <td className="p-3 align-top text-sm">
              <div>${item.price.toFixed(2)}</div>
            </td>
            <td className="p-3 align-top text-sm">
              <div className="flex gap-3 justify-center items-center">
                {item.quantity === 1 ? (
                  <TrashCanButton
                    onClick={() => decrementQuantity(item.dishId)}
                  />
                ) : (
                  <MinusButton onClick={() => decrementQuantity(item.dishId)} />
                )}
                <div className="">{item.quantity}</div>
                <PlusButton onClick={() => incrementQuantity(item.dishId)} />
              </div>
            </td>
            <td className="p-3 align-top">
              <div className="text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
