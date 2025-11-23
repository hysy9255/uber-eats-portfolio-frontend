// MainHeaderLoggedOut.tsx
import React from "react";
import { Link } from "react-router-dom";

const chips = [
  "Pickup",
  "Bakery",
  "Comfort Food",
  "Desserts",
  "Fast Food",
  "Italian",
  "Indian",
  "Pickup",
  "Bakery",
  "Comfort Food",
  "Desserts",
  "Fast Food",
  "Italian",
  "Indian",
];

export const MainHeaderLoggedOut: React.FC<{ xpadding: string }> = ({
  xpadding,
}) => {
  return (
    // <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
    // <header className="sticky top-0 z-50 bg-blue-700 backdrop-blur">
    // <div className="flex items-center justify-between">
    <div
      className={`flex flex-col sticky top-0 z-50 bg-white/90 backdrop-blur ${xpadding} `}
    >
      <div className="flex items-center h-[65px] gap-2">
        {/* Left: Logo */}
        <div className="text-3xl font-semibold tracking-tight shrink-0">
          Uber <span className="text-emerald-600">Eats</span>
        </div>

        {/* Elastic left gutter: shrinks first */}
        <div className="flex-1 border-2" />

        {/* Search bar */}
        {/* <div className="mx-auto max-w-7xl border-2"> */}
        <div className="min-w-0 flex-[0_1_60rem] hidden sm:block">
          <div className="h-[40px] w-full rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 px-4 flex items-center gap-2">
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
          </div>
        </div>

        {/* Elastic left gutter: shrinks first */}
        <div className="flex-1" />

        {/* Right: Search icon + auth */}
        <nav className="flex items-center shrink-0">
          <Link to={"/login"}>
            <a
              className="ml-1 rounded-full px-3 py-1.5 text-sm font-medium bg-black text-white"
              href="#"
            >
              Sign In
            </a>
          </Link>
        </nav>
      </div>

      {/* Search bar */}
      {/* <div className="min-w-0 flex-[0_1_60rem]"> */}
      <div className="block sm:hidden mb-2">
        <div className="h-[40px] w-full rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 px-4 flex items-center gap-2">
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
        </div>
      </div>

      {/* <div>
        <div className="flex flex-wrap gap-2 justify-center py-[12px]">
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
      </div> */}
      <div className="overflow-x-auto scroll-px-4">
        {/* Category chips */}
        <div className="w-max mx-auto flex flex-nowrap gap-2 px-4 py-[12px]">
          {chips.map((t, i) => (
            <button
              key={t}
              type="button"
              // 데모로 첫 번째 칩만 '선택됨' 상태 표기
              aria-pressed={i === 0}
              className="
                text-nowrap
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
    // </header>
  );
};
