import React from "react";
import { useNavigate } from "react-router-dom";
import NoImgAvailable from "../Images/NoImgAvailable/NoImgAvailable";

type DishCardProps = {
  restaurantId: string;
  dishId: string;
  name: string;
  price: number;
  dishImgUrl?: string;
};

const DishCardForDishPage: React.FC<DishCardProps> = ({
  restaurantId,
  dishId,
  name,
  price,
  dishImgUrl,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/client/restaurants/${restaurantId}/dishes/${dishId}`);
    window.location.reload();
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex-none w-[100px] hover:cursor-pointer"
    >
      <div className="relative">
        {dishImgUrl ? (
          <img
            className="object-cover rounded-md aspect-[1/1]"
            src={dishImgUrl}
          />
        ) : (
          // <img
          //   className="object-contain rounded-md aspect-[1/1] border"
          //   src={noImgAvailable}
          // />
          <NoImgAvailable className="object-contain rounded-md aspect-[1/1] border" />
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
  );
};

export default DishCardForDishPage;
