import React from "react";
// import AddToCartIcon from "../icons/addToCartIcon.svg";
import { Link } from "react-router-dom";
import noImgAvailable from "../images/no_imgae.png";

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
  return (
    <Link to={`/restaurants/${restaurantId}/dishes/${dishId}`}>
      <div className="grid grid-cols-10 gap-3 lg:grid-cols-1 lg:gap-0 select-none">
        <div className="relative col-span-4 lg:col-span-1">
          {dishImgUrl ? (
            <img
              className="object-cover rounded-2xl aspect-[5/4] lg:aspect-[5/4]"
              src={dishImgUrl}
            />
          ) : (
            <img
              className="object-contain rounded-2xl aspect-[5/4] lg:aspect-[5/4] border"
              src={noImgAvailable}
            />
          )}

          <div
            className="absolute bg-gray-50 font-bold 
                      rounded-md text-[10px] bottom-1.5 left-1.5 px-1 py-0.5 
                      lg:rounded-lg lg:text-[13px] lg:bottom-3 lg:left-3 lg:px-2 lg:py-1"
          >
            Popular
          </div>
        </div>

        <div
          id="desc"
          className="flex flex-col justify-center gap-1 sm:gap-0 py-2 col-span-6 lg:col-span-1"
        >
          <div id="name" className="font-bold text-sm sm:text-lg">
            {name}
          </div>
          <div id="description" className="text-slate-700 text-xs sm:text-md ">
            {descriptions}
          </div>
          <div id="price" className="text-xs sm:text-lg">
            ${price}
          </div>
        </div>
      </div>
    </Link>
    // <Link to={`/restaurants/${restaurantId}/dishes/${dishId}`}>
    //   <div className="flex items-center md:gap-10 border shadow-lg bg-white rounded-md h-[50px] sm:h-[100px] md:h-[250px]">
    //     <div id="dish-info" className="flex-1">
    //       <div className="flex flex-col md:gap-2 h-full justify-center px-5 md:px-10">
    //         <div className="text-xs sm:text-sm md:text-3xl font-medium line-clamp-1">
    //           {name}
    //         </div>
    //         <div className="text-xs sm:text-sm md:text-3xl font-medium">
    //           ${price}
    //         </div>
    //         <div className="text-sm  md:text-xl  line-clamp-2 text-slate-600">
    //           {descriptions}
    //         </div>
    //       </div>
    //     </div>

    //     <div
    //       id="dish-image"
    //       className="relative w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] md:w-[250px] md:h-[250px] p-[10px] md:p-[30px]"
    //     >
    //       <img
    //         alt="dish"
    //         src={dishImgUrl}
    //         className="object-cover rounded-md w-full h-full"
    //       />
    //       <div className="absolute flex items-center justify-center bg-white rounded-full h-6 w-6 md:h-12 md:w-12 right-1 bottom-1 md:bottom-2 md:right-2">
    //         <img src={AddToCartIcon} className="w-3 h-3 md:w-6 md:h-6" />
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default DishCard;
