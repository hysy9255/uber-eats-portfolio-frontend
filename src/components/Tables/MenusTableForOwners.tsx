import { Fragment } from "react/jsx-runtime";
import { useMenus } from "../../ReactContext/ownerDashboardMenus/UseMenus";
import MenuDashboardTableColumns from "../Columns/MenuDashboardTableColumns";
import MenuRow from "../Rows/MenuRow";

interface MenusTableForOwnersProps {
  className?: string;
}

const MenusTableForOwners: React.FC<MenusTableForOwnersProps> = ({
  className,
}) => {
  const { menuList2 } = useMenus();

  const tableColumnCss = "grid-cols-[80px_80px_1fr_300px_100px_150px_150px]";

  if (!menuList2) return null;
  return (
    <article className={`rounded-md ${className}`}>
      <MenuDashboardTableColumns
        tableColumnCss={tableColumnCss}
        className="sticky top-0"
      />
      {/* <div className="h-[590px] overflow-y-auto"> */}
      <div className="">
        {Object.entries(menuList2).map(([cat, menus], index) => (
          <Fragment key={index}>
            <div className="text-gray-500 text-sm font-semibold py-2 px-5">
              {cat} ({menus.length})
            </div>

            {menus.map((menu, index) => (
              <MenuRow
                key={index}
                menu={menu}
                tableColumnCss={tableColumnCss}
                className={`${menus.length > index + 1 ? "mb-2" : "mb-0"}`}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </article>
  );
};

export default MenusTableForOwners;
