import type { DishCategory } from "../../../constants/DishCategoryEnums";
import { useMenus } from "../../../ReactContext/ownerDashboardMenus/UseMenus";

interface MenuDashboardHeaderProps {
  className?: string;
}

const MenuDashboardHeader: React.FC<MenuDashboardHeaderProps> = ({
  className,
}) => {
  const { menuList, setAddMenuSidebarOpen } = useMenus();
  if (!menuList) return null;

  let totalMenuCount = 0;

  for (const category of Object.keys(menuList) as DishCategory[]) {
    totalMenuCount += menuList[category].length;
  }

  return (
    <h3 className={`flex justify-between items-center ${className}`}>
      <div className="text-lg font-semibold flex gap-2">
        <div>Menus </div>
        <div className="text-slate-600">({totalMenuCount})</div>
      </div>
      <button
        className="rounded-sm border border-gray-300 text-sm text-gray-700 font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer"
        onClick={() => setAddMenuSidebarOpen(true)}
      >
        + Add Menu
      </button>
    </h3>
  );
};

export default MenuDashboardHeader;
