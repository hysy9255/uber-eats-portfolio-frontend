import React from "react";
import samsen from "../images/restaurants/samsen.jpg";
import dish from "../images/food/wagyu-beef-stir-fried.jpg";

const BannerOne = () => {
  const copy = {
    eyebrow: "Weekend Special",
    headline: (
      <>
        Save $5
        <br />
        On Crispy Chicken
        <br />
        at Samsen
      </>
    ),
    cta: "Order now",
  };

  const copyTextSize = {
    eyebrow: "text-md",
    headline: "text-3xl",
    cta: "text-md",
  };

  const horizontalPosition = "left-20";

  return (
    <>
      <div className="hidden min-[475px]:block">
        <div className="relative h-[300px] overflow-hidden w-full">
          <img
            src={samsen}
            alt="Samsen"
            className="w-full h-full object-cover"
          />

          {/* Subtle left-to-right gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          {/* Copy block */}
          <div
            className={`z-50 absolute ${horizontalPosition} bottom-15 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]`}
          >
            <p className={`${copyTextSize.eyebrow} opacity-90`}>
              {copy.eyebrow}
            </p>
            <h3
              className={`${copyTextSize.headline} font-extrabold leading-tight`}
            >
              {copy.headline}
            </h3>
            <button
              className={`mt-2 px-3 py-1 rounded-full bg-white text-black ${copyTextSize.cta} font-semibold shadow-sm`}
            >
              {copy.cta}
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-5 w-[400px] h-[400px] rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={dish}
              alt="fried-rice"
              className="w-full h-full object-cover object-[35%_50%]"
            />
          </div>
        </div>
      </div>
      <div className="block min-[475px]:hidden">
        <div className="relative h-[300px] overflow-hidden w-full">
          <img
            src={samsen}
            alt="samsen"
            className="w-full h-full object-cover"
          />

          {/* Subtle left-to-right gradient for readability */}
          {/* <div className="absolute inset-3 bg-gradient-to-r from-black/60 via-black/20 to-transparent " /> */}
          <div className="absolute inset-3 bg-black/30 border border-gray-300" />

          {/* Copy block */}
          <div
            className={`absolute inset-3 flex flex-col gap-3 border-white items-center justify-center z-50 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]`}
          >
            <p className={`${copyTextSize.eyebrow} opacity-90`}>
              {copy.eyebrow}
            </p>
            <h3
              className={`${copyTextSize.headline} font-extrabold leading-tight text-center`}
            >
              <div>Save $5</div>
              <div>on Crispy Chicken</div>
              <div>at Samsen</div>
            </h3>
            <button
              className={`mt-2 px-3 py-1 rounded-full bg-white text-black ${copyTextSize.cta} font-semibold shadow-sm`}
            >
              {copy.cta}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerOne;
