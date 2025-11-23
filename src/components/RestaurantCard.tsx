import React from "react";
// import coverImg from "../images/restaurants/Al_Prato.webp";
import { Link } from "react-router-dom";
import StarIcon from "../icons/star.png";
import RestaurantBadge from "./RestaurantBadge";

type RestaurantCardProps = {
  restaurantId: string;
  name: string;
  city: string;
  zip: string;
  prepTime: string;
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
    <Link to={`/restaurants/${restaurantId}`} className="">
      <div className="">
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
              <div className=" rounded-tr-lg overflow-hidden">
                <img
                  src={restaurantImgUrl2}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" rounded-br-lg overflow-hidden">
                <img
                  src={restaurantImgUrl3}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-0 translate-y-1/2">
            <RestaurantBadge />
          </div>
        </div>
        <div className="mt-5">
          <div className="text-xl font-bold text-nowrap">{name}</div>
          <div className="flex gap-x-2 items-center text-sm text-slate-700">
            <img className="w-[10px] h-[10px]" src={StarIcon} />
            <div>4.9 (808)</div>
            <div>
              • {orderType} • {prepTime}
            </div>
          </div>
          <div className="text-sm text-slate-500">
            {streetAddress}, {city}, {zip}
          </div>
        </div>
      </div>
    </Link>

    // <Link to={`/restaurants/${restaurantId}`}>
    //   <div className="flex flex-col">
    //     <div id="imgae-and-badge" className="pb-5 border-2 inline-flex w-fit">
    //       <div
    //         id="three-images-block"
    //         className="relative flex gap-x-[3px] border-2 border-red-400"
    //       >
    //         <div
    //           style={{ backgroundImage: `url(${restaurantImgUrl})` }}
    //           className="bg-cover bg-center w-[300px] h-[203px] rounded-l-lg rounded-r-xs"
    //         ></div>
    //         <div className="flex flex-col gap-y-[3px]">
    //           <div
    //             style={{ backgroundImage: `url(${restaurantImgUrl2})` }}
    //             className="bg-cover bg-center w-[100px] h-[100px] rounded-xs rounded-tr-lg"
    //           ></div>
    //           <div
    //             style={{ backgroundImage: `url(${restaurantImgUrl3})` }}
    //             className="bg-cover bg-center w-[100px] h-[100px] rounded-l-xs rounded-br-lg"
    //           ></div>
    //         </div>
    //         <div className="absolute bottom-0 translate-y-1/2 inset-x-12">
    //           <RestaurantBadge />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="pt-3">
    //       <div className="flex gap-x-2 items-baseline-last">
    //         <div className="text-xl font-bold">{name}</div>
    //         <div className="text-sm">{streetAddress}</div>
    //       </div>
    //       <div className="flex gap-x-2 items-center">
    //         <img className="w-[17px] h-[17px]" src={StarIcon} />
    //         <div>4.9 (808)</div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default RestaurantCard;
