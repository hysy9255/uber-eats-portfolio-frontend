import { useCallback, useEffect, useState } from "react";
import { type MenuList } from "../constants/MockOrdersData";
import DeleteThisMenuPopup from "../components/DeleteThisMenuPopup";
import AddMenuSidebar, {
  type CreateDishFormData,
} from "../components/AddMenuSidebar";
import { getRestaurantId, getToken } from "../auth";
import EditMenuSidebar, {
  type EditDishFormData,
} from "../components/EditMenuSidebar";
import { createDish, deleteDish, updateDish, getDishes } from "../api/dishApi";

const OwnerDashboardMenus = () => {
  const [menuList, setMenuList] = useState<MenuList[]>([]);
  const [menuToDelete, setMenuToDelete] = useState<MenuList | null>(null);
  const [menuToEdit, setMenuToEdit] = useState<MenuList | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [addMenuSidebarOpen, setAddMenuSidebarOpen] = useState<boolean>(false);
  const [editMenuSidebarOpen, setEditMenuSidebarOpen] =
    useState<boolean>(false);

  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }
  const restaurantId = getRestaurantId();

  const loadMenus = useCallback(async () => {
    const menus = await getDishes(restaurantId, token);
    setMenuList(menus);
  }, [restaurantId, token]);

  useEffect(() => {
    loadMenus();
  }, [restaurantId, token, loadMenus]);

  const handleCreateDish = async (data: CreateDishFormData) => {
    const createDishPayload = { items: [data] };
    try {
      await createDish(token, createDishPayload);
      await loadMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDish = async (data: EditDishFormData) => {
    if (!menuToEdit?.dishId) return;
    try {
      await updateDish(menuToEdit?.dishId, token, data);
      await loadMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDish = async () => {
    if (!menuToDelete?.dishId) return;
    try {
      await deleteDish(menuToDelete.dishId, token);
      setMenuList((prev) =>
        prev.filter((item) => item.dishId !== menuToDelete.dishId)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmDelete(false);
      setMenuToDelete(null);
    }
  };

  const handleClickEditButton = (menu: MenuList) => {
    setMenuToEdit(menu);
    setEditMenuSidebarOpen(true);
  };

  const handleClickDeleteButton = (menu: MenuList) => {
    setMenuToDelete(menu);
    setShowConfirmDelete(true);
  };

  return (
    <div className="p-[10px] flex flex-col gap-3">
      <h3 className="flex justify-between items-center">
        <div className="text-lg font-semibold flex gap-2">
          <div>Menus </div>
          <div className="text-slate-600">(34)</div>
        </div>
        <button
          className="rounded-sm border border-gray-300 text-sm text-gray-700 font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => setAddMenuSidebarOpen(true)}
        >
          + Add Menu
        </button>
      </h3>

      <article className="border border-gray-300 rounded-md">
        <h3 className="bg-gray-100 rounded-t-md border-b border-gray-300 text-sm font-medium">
          <div className="py-1 px-3 grid grid-cols-[1fr_100px_100px_100px] gap-3">
            <div className="">Name</div>
            <div className="">Price</div>
            <div className="">Availability</div>
            <div className="">Actions</div>
          </div>
        </h3>

        <div className="h-[440px] overflow-y-auto cursor-pointer">
          {menuList.map((menu, index) => (
            <div
              className={`py-1 px-3 grid grid-cols-[1fr_100px_100px_100px] gap-3 ${
                menuList.length === index + 1 && "rounded-b-md"
              } hover:bg-gray-100 border-b border-gray-100`}
            >
              <div>{menu.name}</div>
              <div>$ {menu.price}.00</div>
              <div className="flex items-center justify-start">
                {!menu.availability ? (
                  <div className="flex items-center justify-center w-[90px] h-[25px] rounded-sm px-2 py-1 text-sm bg-green-500 text-white">
                    Available
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-[90px] h-[25px] rounded-sm px-2 py-1 text-sm bg-gray-300 text-gray-700">
                    Unavailable
                  </div>
                )}
              </div>
              <div className=" flex gap-3 items-center">
                <div
                  className="hover:underline"
                  onClick={() => {
                    handleClickEditButton(menu);
                  }}
                >
                  Edit
                </div>
                <div
                  className="hover:underline text-red-700"
                  onClick={() => {
                    handleClickDeleteButton(menu);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
      {showConfirmDelete && (
        <DeleteThisMenuPopup
          menuToDelete={menuToDelete ? menuToDelete.name : ""}
          onClickCancel={() => {
            setShowConfirmDelete(false);
          }}
          onClickDeleteOk={handleDeleteDish}
        />
      )}
      {addMenuSidebarOpen && (
        <AddMenuSidebar
          closeSideBar={() => setAddMenuSidebarOpen(false)}
          handleCreateDish={handleCreateDish}
        />
      )}
      {editMenuSidebarOpen && (
        <EditMenuSidebar
          // closeSideBar={() => setEditMenuSidebarOpen(false)}
          onClose={() => setEditMenuSidebarOpen(false)}
          menuToEdit={menuToEdit}
          handleUpdateDish={handleUpdateDish}
        />
      )}
    </div>
  );
};

export default OwnerDashboardMenus;
