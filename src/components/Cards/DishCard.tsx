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
  dishImgUrl: string;
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

  return (
    <Link to={`/restaurants/${restaurantId}/dishes/${dishId}`}>
      <div
        className="
        grid grid-cols-10 gap-3 
        min-[1000px]:grid-cols-1 
        min-[1000px]:gap-0 
        select-none
        "
      >
        <div className="relative col-span-4">
          {dishImgUrl ? (
            <img
              className="object-cover rounded-2xl aspect-[5/4]"
              src={dishImgUrl}
            />
          ) : (
            <div
              className="
              rounded-2xl aspect-[5/4]
              border border-gray-100 flex items-center justify-center"
            >
              {/* <img className="w-30 h-30" src={noImgAvailable} /> */}
              <NoImgAvailable className="w-30 h-30" />
            </div>
          )}

          <div
            className="absolute bg-gray-50 font-bold 
                      rounded-md text-[10px] bottom-2.5 left-2.5 px-1 py-0.5 
                      min-[1000px]:rounded-lg min-[1000px]:text-[13px] 
                      min-[1000px]:bottom-3 min-[1000px]:left-3 
                      min-[1000px]:px-2 min-[1000px]:py-1"
          >
            Popular
          </div>
          <div
            className={`absolute top-2 right-2
            bg-blue-400 text-white
            rounded-full w-8 h-8 ring
            flex items-center justify-center 
            ${dishOnTheCart ? "block" : "hidden"}
            `}
          >
            {dishOnTheCart?.quantity}
          </div>
        </div>

        <div
          id="desc"
          className="flex flex-col 
          justify-center gap-1 
          py-2 col-span-6 
          "
        >
          <div
            id="name"
            className="font-bold text-lg text-nowrap overflow-hidden text-ellipsis"
          >
            {name}
          </div>
          <div id="description" className="text-slate-700 text-md ">
            {descriptions}
          </div>
          <div id="price" className="text-lg">
            ${price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
