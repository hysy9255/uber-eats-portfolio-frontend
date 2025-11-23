const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
