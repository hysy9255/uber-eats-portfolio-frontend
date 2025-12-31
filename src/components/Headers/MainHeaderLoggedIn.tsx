// MainHeaderLoggedIn.tsx
import React from "react";

export default function MainHeaderLoggedIn() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-screen-xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-semibold tracking-tight">
          Uber <span className="text-emerald-600">Eats</span>
        </div>

        {/* Center: Deliver to */}
        <button
          className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2
                     bg-black/5 hover:bg-black/10 transition text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Deliver to <span className="font-semibold">Mangwon</span>
        </button>

        {/* Right: Icons with dropdowns (hover/focus) */}
        <nav className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative group">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14v-3a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div
              className="invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                         group-focus-within:visible group-focus-within:opacity-100 group-focus-within:scale-100
                         transition absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg ring-1 ring-black/10 p-3"
              role="menu"
            >
              <div className="text-sm font-semibold mb-2">Notifications</div>
              <div className="space-y-2 text-sm">
                <div className="rounded-lg p-2 hover:bg-gray-50">
                  🍔 Order update • Your Taco Loco is being prepared.
                </div>
                <div className="rounded-lg p-2 hover:bg-gray-50">
                  🎟️ Promo • Free delivery + $1 off today.
                </div>
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="relative group">
            <button
              className="p-2 rounded-full hover:bg-gray-100 relative"
              aria-haspopup="menu"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 12.39A2 2 0 0 0 9.62 15H19a2 2 0 0 0 2-1.72L23 6H6" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-black text-white text-[10px] grid place-items-center">
                3
              </span>
            </button>
            <div
              className="invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                         group-focus-within:visible group-focus-within:opacity-100 group-focus-within:scale-100
                         transition absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg ring-1 ring-black/10 p-3"
              role="menu"
            >
              <div className="text-sm font-semibold mb-2">Your cart</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100"></div>
                  <div className="text-sm">
                    <div>Bulgogi Bowl</div>
                    <div className="text-slate-500">x1 • $10.90</div>
                  </div>
                  <div className="ml-auto font-medium">$10.90</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100"></div>
                  <div className="text-sm">
                    <div>Kimchi Fries</div>
                    <div className="text-slate-500">x2 • $4.50</div>
                  </div>
                  <div className="ml-auto font-medium">$9.00</div>
                </div>
              </div>
              <div className="mt-3 border-t pt-3 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">$19.90</span>
              </div>
              <div className="mt-2">
                <button className="w-full rounded-full bg-black text-white text-sm py-2">
                  Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="relative group">
            <button
              className="p-0.5 rounded-full ring-1 ring-black/10 overflow-hidden"
              aria-haspopup="menu"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/80"
                alt="Profile"
              />
            </button>
            <div
              className="invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                         group-focus-within:visible group-focus-within:opacity-100 group-focus-within:scale-100
                         transition absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/10 p-2"
              role="menu"
            >
              <ul className="text-sm">
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Orders
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Favorites
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Addresses
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Payments
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Coupons
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">Help</li>
                <li className="my-1 border-t" />
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50">
                  Settings
                </li>
                <li className="px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600">
                  Log out
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
