import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "../../icons/star.png";

type RestaurantCardProps = {
  restaurantId: string;
  name: string;
  city: string;
  zip: string;
  prepTime: string;
  orderType: string;
  streetAddress: string;
  restaurantImgUrl: string | null;
  restaurantImgUrl2: string | null;
  restaurantImgUrl3: string | null;
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
    <Link to={`/restaurants/${restaurantId}`} className="">
      <div className="">
        <div className="relative">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-3 aspect-[3/2] rounded-l-lg overflow-hidden">
              <img
                src={restaurantImgUrl ?? undefined}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-1">
              <div className="rounded-tr-lg overflow-hidden aspect-[1/1]">
                <img
                  src={restaurantImgUrl2 ?? undefined}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-br-lg overflow-hidden aspect-[1/1]">
                <img
                  src={restaurantImgUrl3 ?? undefined}
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
            <img className="w-[10px] h-[10px]" src={StarIcon} />
            <div>4.9 (808)</div>
            <div>
              • {orderType} • {prepTime}
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
