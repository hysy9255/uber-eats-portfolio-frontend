import React from "react";
import { Link } from "react-router-dom";
// import noImgAvailable from "../../images/no_imgae.png";
import { useCart } from "../../ReactContext/cart/UseCart";
import NoImgAvailable from "../Images/NoImgAvailable/NoImgAvailable";

type DishCardProps = {
  restaurantId: string;
  dishId: string;
  name: string;
  price: number;
  descriptions: string;
  dishImgUrl?: string;
};

const DishCard: React.FC<DishCardProps> = ({
  restaurantId,
  dishId,
  name,
  price,
  descriptions,
  dishImgUrl,
}) => {
  const { cart } = useCart();
  const dishOnTheCart = cart.cartItems.find((item) => item.dishId === dishId);
  // h-[330px] w-[230px]
  return (
    <Link
      to={`/client/restaurants/${restaurantId}/dishes/${dishId}`}
      className={`
      
      relative select-none p-3 rounded-lg border 
      ${
        dishOnTheCart
          ? "bg-sky-100  border-sky-400"
          : "border-gray-400 hover:bg-sky-100/20"
      }
      `}
    >
      <div
        className={`absolute bottom-3 right-3 
         text-white font-bold text-[13px]
        rounded-full w-6 h-6 
        bg-sky-400 border border-sky-500
        flex items-center justify-center 
        ${dishOnTheCart ? "block" : "hidden"}
        `}
      >
        {dishOnTheCart?.quantity}
      </div>
      <div className="relative ">
        {dishImgUrl ? (
          <img
            className="object-cover rounded-lg aspect-[5/4]"
            // className="object-cover rounded-lg w-[206px] h-[150px]"
            src={dishImgUrl}
          />
        ) : (
          <div
            className="
              rounded-lg 
              aspect-[5/4]
              border border-gray-100 flex items-center justify-center"
          >
            <NoImgAvailable className="w-30 h-30" />
          </div>
        )}
        <div
          className="absolute bg-gray-50 font-bold 
                      rounded-md text-[10px] bottom-2 left-2 px-2 py-1"
        >
          Popular
        </div>
      </div>

      <div
        id="desc"
        className="flex flex-col 
          justify-center gap-1 
          py-2 
          "
      >
        <div
          id="name"
          className="font-bold text-lg text-nowrap overflow-hidden text-ellipsis"
        >
          {name}
        </div>
        <div id="description" className="text-slate-700 text-md line-clamp-3">
          {descriptions}
        </div>
        <div id="price" className="text-md font-medium">
          ${price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
