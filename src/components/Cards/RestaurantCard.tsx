import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "../Icons/StarIcon/StarIcon";

type RestaurantCardProps = {
  restaurantId: string;
  name: string;
  city: string;
  zip: string;
  prepTime: number;
  orderType: string;
  streetAddress: string;
  restaurantImgUrl: string;
  restaurantImgUrl2: string;
  restaurantImgUrl3: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantId,
  name,
  city,
  zip,
  streetAddress,
  orderType,
  prepTime,
  restaurantImgUrl,
  restaurantImgUrl2,
  restaurantImgUrl3,
}) => {
  return (
    <Link to={`/client/restaurants/${restaurantId}`}>
      <div>
        <div className="relative">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-3 aspect-[3/2] rounded-l-lg overflow-hidden">
              <img
                src={restaurantImgUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-1">
              <div className="rounded-tr-lg overflow-hidden aspect-[1/1]">
                <img
                  src={restaurantImgUrl2}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-br-lg overflow-hidden aspect-[1/1]">
                <img
                  src={restaurantImgUrl3}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-md font-bold text-nowrap">{name}</div>
          <div className="flex gap-x-2 items-center text-xs text-slate-700">
            <StarIcon className="w-[10px] h-[10px]" />
            <div>4.9 (808)</div>
            <div>
              • {orderType} • {prepTime} mins
            </div>
          </div>
          <div className="text-xs text-slate-500">
            {streetAddress}, {city}, {zip}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
