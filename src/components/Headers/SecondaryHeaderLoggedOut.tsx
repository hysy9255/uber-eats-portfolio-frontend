// SecondaryHeaderLoggedOut.tsx
import React from "react";

export default function SecondaryHeaderLoggedOut() {
  return (
    // 메인 헤더 높이(16)만큼 아래에 고정
    <div className="sticky top-16 z-40 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3">
        {/* Search bar (UI-only) */}
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
          {[
            "Pickup",
            "Bakery",
            "Comfort Food",
            "Desserts",
            "Fast Food",
            "Italian",
            "Indian",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border border-black/10 bg-white text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
