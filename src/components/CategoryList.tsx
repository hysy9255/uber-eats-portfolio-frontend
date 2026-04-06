import { useState } from "react";

const chips = [
  "All",
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

const CategoryList = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="overflow-x-auto scroll-px-4">
      <div className="w-max mx-auto flex flex-nowrap gap-2 px-4 py-[12px]">
        {chips.map((t, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === selected}
            onClick={() => {
              setSelected(i);
            }}
            className="
            text-nowrap
            px-3 py-1 rounded-full text-sm select-none cursor-pointer
            border border-black/10 bg-white
            transition duration-150 ease-out
            hover:bg-gray-50 hover:border-black/20 hover:shadow-[0_1px_0_rgba(0,0,0,0.03)]
            active:scale-95 active:bg-gray-100
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1
            aria-pressed:bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 aria-pressed:text-white aria-pressed:shadow-md
            aria-pressed:hover:bg-black 
            aria-pressed:border-0"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
