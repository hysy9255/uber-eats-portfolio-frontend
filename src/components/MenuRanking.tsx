interface MenuRankingProps {
  label: string;
  topMenus: string[];
}

const MenuRanking: React.FC<MenuRankingProps> = ({ label, topMenus }) => {
  return (
    <article className="border border-gray-300 rounded-md">
      <h3 className="text-md rounded-t-md border-b border-gray-300 bg-gray-100">
        <div className="px-3">{label}</div>
      </h3>

      {topMenus.map((menu, index) => {
        const lastOne = topMenus.length === index + 1;
        return (
          <div
            className={`text-sm hover:bg-gray-100 ${lastOne && "rounded-b-md"}`}
          >
            <div className="flex gap-x-2 items-center px-3 py-0.5">
              <p>{index + 1}</p>
              <p className="hover:underline hover:cursor-pointer">{menu}</p>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default MenuRanking;
