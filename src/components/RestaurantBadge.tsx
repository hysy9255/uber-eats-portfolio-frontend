import React from "react";

// const text1Size = "text-[6px] sm:text-[8px] md:text-[10px]";
// const text2Size = "text-[11px] sm:text-[13px] md:text-[15px]";

const text2Size = "text-[15px] lg:text-[13px] 2xl:text-[15px]";

const RestaurantBadge = () => {
  return (
    <div className="">
      <div className="px-3 flex justify-center items-center gap-2 py-1 bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 rounded-full">
        <div className="block lg:hidden 2xl:block"></div>
        <div className={`text-white ${text2Size} truncate`}>
          Free Delivery + Instant $1 Off
        </div>
      </div>
    </div>
  );
};

export default RestaurantBadge;
