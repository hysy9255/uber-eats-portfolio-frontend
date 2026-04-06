import NoImgAvailable from "../Images/NoImgAvailable/NoImgAvailable";
import type { DishDTO } from "../../dtos/Dish.dto";
import { useMenus } from "../../ReactContext/ownerDashboardMenus/UseMenus";
import { PencilIcon } from "../Buttons/IconBased/PencilButton/PencilIcon";

interface MenuRowProps {
  menu: DishDTO;
  tableColumnCss: string;
  className?: string;
}

const MenuRow: React.FC<MenuRowProps> = ({
  menu,
  tableColumnCss,
  className,
}) => {
  const { handleClickEditButton, handleClickDeleteButton } = useMenus();
  return (
    <div
      className={`${className} bg-stone-50 rounded-md border border-gray-100 py-2 px-5 grid ${tableColumnCss} gap-x-3 `}
    >
      <div className="text-sm text-gray-700 font-medium  flex items-center">
        {menu.category}
      </div>
      {menu.dishImgUrl ? (
        <img
          className="w-20 h-20 rounded-md object-cover"
          src={menu.dishImgUrl}
        />
      ) : (
        <NoImgAvailable className="w-20 h-20" />
      )}

      <div className="text-sm text-gray-700 font-medium  flex items-center">
        {menu.name}
      </div>
      <div className="text-sm text-gray-700 font-medium h-[80px] flex items-center">
        <span className="line-clamp-4">{menu.description}</span>
      </div>
      <div className="flex items-center justify-end text-sm text-gray-700 font-medium">
        $ {menu.price.toFixed(2)}
      </div>
      <div className="flex items-center justify-start">
        {menu.availability ? (
          <div className="flex items-center justify-center font-medium rounded-sm px-3 py-1 bg-green-500 text-white w-full mx-5 border border-green-300 text-xs">
            Available
          </div>
        ) : (
          <div className="flex items-center justify-center font-medium rounded-sm px-3 py-1 bg-gray-300 text-gray-700 w-full mx-5 border border-gray-300 text-xs">
            Unavailable
          </div>
        )}
      </div>
      <div className=" flex gap-1 items-center ">
        <button
          onClick={() => {
            handleClickEditButton(menu);
          }}
          className="flex items-center gap-x-1 font-medium rounded-md px-3 py-1 hover:cursor-pointer text-blue-800 bg-gray-100 border border-gray-500"
        >
          <PencilIcon className="w-3 h-3" />
          <div className="text-xs">Edit</div>
        </button>
        <button
          onClick={() => {
            handleClickDeleteButton(menu);
          }}
          className="text-xs rounded-md text-red-700 bg-gray-100 border border-gray-500 px-3 py-1 font-medium hover:cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuRow;
