import React from "react";
import { Link } from "react-router-dom";
import noImgAvailable from "../images/no_imgae.png";

type DishCardProps = {
  restaurantId: string;
  dishId: string;
  name: string;
  price: number;
  dishImgUrl: string;
};

const DishCardForDishPage: React.FC<DishCardProps> = ({
  restaurantId,
  dishId,
  name,
  price,
  dishImgUrl,
}) => {
  return (
    <Link to={`/restaurants/${restaurantId}/dishes/${dishId}`}>
      <div className="w-[200px] ">
        <div className="relative">
          {dishImgUrl ? (
            <img
              className="object-cover rounded-md aspect-[1/1]"
              src={dishImgUrl}
            />
          ) : (
            <img
              className="object-contain rounded-md aspect-[1/1] border"
              src={noImgAvailable}
            />
          )}
          <div
            className="absolute bg-gray-50 font-bold 
                      rounded-md text-[10px] bottom-1.5 left-1.5 px-1 py-0.5"
          >
            Popular
          </div>
        </div>

        <div id="desc" className="">
          <div id="name" className="font-bold text-sm ">
            {name}
          </div>
          <div id="price" className="text-xs ">
            ${price}.00
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DishCardForDishPage;
