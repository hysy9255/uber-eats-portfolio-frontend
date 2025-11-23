import React from "react";
import chineseTuxedo from "../images/restaurants/chinese_tuxedo.jpeg";
import dish1 from "../images/food/lobster.jpeg";
import dish2 from "../images/food/oyster.avif";

const BannerTwo = () => {
  const copy = {
    eyebrow: "Campout Season",
    headline: (
      <>
        $5 Off Juicy Lobster &
        <br />
        Creamy Oyster
        <br />
        at Chinese Tuxedo
      </>
    ),
    cta: "See details",
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
            src={chineseTuxedo}
            alt="Chinese Tuxedo"
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
          <div className="absolute z-40 top-1/2 -translate-y-1/2 -right-5 w-[400px] h-[400px] rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={dish1}
              alt="Lobster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute z-30 top-1/2 -translate-y-1/2 right-[300px] w-[400px] h-[400px] rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={dish2}
              alt="Lobster"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="block min-[475px]:hidden">
        <div className="relative h-[300px] overflow-hidden w-full">
          <img
            src={chineseTuxedo}
            alt="chineseTuxedo"
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
              <div>$5 Off</div>
              <div>on Creamy Oyster</div>
              <div>at Chinese Tuxedo</div>
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

export default BannerTwo;
