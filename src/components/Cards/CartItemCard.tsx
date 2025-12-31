import { useMemo } from "react";
import TrashCanButton from "../Buttons/IconBased/TrashCanButton/TrashCanButton";
import MinusButton from "../Buttons/IconBased/MinusButton/MinusButton";
import PlusButton from "../Buttons/IconBased/PlusButton/PlusButton";
import { useCart } from "../../ReactContext/cart/UseCart";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  dishId: string;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ dishId }) => {
  const { removeDishQuantity, addDishQuantity, cart } = useCart();

  const item = cart.cartItems.find((item) => item.dishId === dishId);
  if (!item) throw new Error("Item not found");

  const quantity = item.quantity;
  const price = item.price;
  const dishImg = item.dishImgUrl;
  const name = item.name;
  const desc = item.description;

  const incrementQuantity = () => {
    addDishQuantity(dishId);
  };
  const decrementQuantity = () => {
    removeDishQuantity(dishId);
  };

  const totalPrice = useMemo(() => {
    return price * quantity;
  }, [price, quantity]);

  return (
    <>
      <div id="product_detail" className="grid grid-cols-4 gap-x-3 ">
        <Link to={`/restaurants/${cart.restaurantId}/dishes/${dishId}`}>
          <img
            src={dishImg}
            className="col-span-1 aspect-[1/1] object-cover hover:cursor-pointer"
          />
        </Link>
        <div className="space-y-2 col-span-3">
          <div className="text-black text-sm">{name}</div>
          <div className="text-xs font-normal text-gray-500">{desc}</div>
        </div>
      </div>
      <div
        id="quantity"
        className="flex gap-x-2 justify-center items-center h-8"
      >
        {quantity === 1 ? (
          <TrashCanButton onClick={decrementQuantity} />
        ) : (
          <MinusButton onClick={decrementQuantity} />
        )}
        <div className="text-xs ring ring-gray-300 w-8 py-1 flex items-center justify-center ">
          {quantity}
        </div>
        <PlusButton onClick={incrementQuantity} />
      </div>
      <div id="price" className="text-xs h-8  flex items-center">
        {price}
      </div>
      <div id="total" className="text-x h-8  flex items-center">
        ${totalPrice}
      </div>
    </>
  );
};

export default CartItemCard;
