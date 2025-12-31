import React from "react";

const chips = [
  "Pickup",
  "Bakery",
  "Comfort Food",
  "Desserts",
  "Fast Food",
  "Italian",
  "Indian",
];

export default function SecondaryHeaderUI() {
  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3">
        {/* Search bar */}
        <div className="mx-auto max-w-3xl">
          <div className="h-12 w-full rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 px-4 flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search restaurants, dishes or stores"
              className="flex-1 bg-transparent outline-none placeholder-slate-400 text-[15px]"
            />
            <button className="rounded-full px-3 py-1.5 text-sm font-medium bg-black text-white">
              Search
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {chips.map((t, i) => (
            <button
              key={t}
              type="button"
              // 데모로 첫 번째 칩만 '선택됨' 상태 표기
              aria-pressed={i === 0}
              className="
                px-3 py-1 rounded-full text-sm select-none cursor-pointer
                border border-black/10 bg-white
                transition duration-150 ease-out
                hover:bg-gray-50 hover:border-black/20 hover:shadow-[0_1px_0_rgba(0,0,0,0.03)]
                active:scale-95 active:bg-gray-100
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1
                aria-pressed:bg-black aria-pressed:text-white aria-pressed:border-black aria-pressed:shadow-md
                aria-pressed:hover:bg-black
              "
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
