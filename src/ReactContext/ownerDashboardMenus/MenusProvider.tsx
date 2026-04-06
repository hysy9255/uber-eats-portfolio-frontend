import { useCallback, useState, type ReactNode } from "react";
import { MenusContext } from "./MenusContext";
import {
  createDish,
  deleteDish,
  getDishes,
  updateDish,
} from "../../api/dishApi";
import { getRestaurantId, getToken } from "../../auth";
import type { DishDTO } from "../../dtos/Dish.dto";
import type { EditDishForm } from "../../formDataTypes/dish/editDishForm.type";
import type { CreateDishDTO } from "../../dtos/dish/CreateDish.dto";
import type { CreateDishForm } from "../../formDataTypes/dish/createDishForm.type";
import type { UpdateDishDTO } from "../../dtos/dish/UpdateDishRequest.dto";
import { filterMenussByCategory } from "../../utils/filterMenusByCategory";
import { DishCategory } from "../../constants/DishCategoryEnums";

interface MenusProviderProps {
  children: ReactNode;
}

export const MenusProvider: React.FC<MenusProviderProps> = ({ children }) => {
  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }
  const restaurantId = getRestaurantId();

  const [menuList, setMenuList] = useState<DishDTO[]>([]);
  const [menuList2, setMenuList2] = useState<Record<DishCategory, DishDTO[]>>();
  const [menuToEdit, setMenuToEdit] = useState<DishDTO>();
  const [menuToDelete, setMenuToDelete] = useState<DishDTO | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [addMenuSidebarOpen, setAddMenuSidebarOpen] = useState<boolean>(false);
  const [editMenuSidebarOpen, setEditMenuSidebarOpen] =
    useState<boolean>(false);

  const loadMenus = useCallback(async () => {
    const menus = await getDishes(restaurantId, token);
    setMenuList(menus);
    setMenuList2(() => filterMenussByCategory(menus));
  }, [restaurantId, token]);

  const handleCreateDish = async (data: CreateDishForm) => {
    const payload: CreateDishDTO = {
      ...data,
      price: data.price ?? 0,
    };
    await createDish(token, payload);
    await loadMenus();
  };

  const handleUpdateDish = async (dishId: string, data: EditDishForm) => {
    const payload: UpdateDishDTO = {
      ...data,
    };
    await updateDish(dishId, token, payload);
    await loadMenus();
  };

  const handleDeleteDish = async (dishId: string) => {
    await deleteDish(dishId, token);
    setMenuList((prev) => prev.filter((item) => item.dishId !== dishId));
    setShowConfirmDelete(false);
    setMenuToDelete(null);
  };

  const handleClickEditButton = (menu: DishDTO) => {
    setMenuToEdit(menu);
    setEditMenuSidebarOpen(true);
  };

  const handleClickDeleteButton = (menu: DishDTO) => {
    setMenuToDelete(menu);
    setShowConfirmDelete(true);
  };

  return (
    <MenusContext.Provider
      value={{
        loadMenus,
        handleCreateDish,
        handleUpdateDish,
        handleDeleteDish,
        handleClickEditButton,
        handleClickDeleteButton,
        menuList,
        menuList2,
        showConfirmDelete,
        editMenuSidebarOpen,
        menuToEdit,
        menuToDelete,
        setShowConfirmDelete,
        addMenuSidebarOpen,
        setAddMenuSidebarOpen,
        setEditMenuSidebarOpen,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
