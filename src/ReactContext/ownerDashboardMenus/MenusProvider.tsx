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
import { UpdateDishDTO } from "../../dtos/dish/UpdateDishRequest.dto";
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

  const [menuList, setMenuList] = useState<Record<DishCategory, DishDTO[]>>();
  const [menuToEdit, setMenuToEdit] = useState<DishDTO>();
  const [menuToDelete, setMenuToDelete] = useState<DishDTO | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [addMenuSidebarOpen, setAddMenuSidebarOpen] = useState<boolean>(false);
  const [editMenuSidebarOpen, setEditMenuSidebarOpen] =
    useState<boolean>(false);

  const loadMenus = useCallback(async () => {
    const menus = await getDishes(restaurantId);
    setMenuList(() => filterMenussByCategory(menus));
  }, [restaurantId]);

  const handleCreateDish = async (data: CreateDishForm) => {
    const payload: CreateDishDTO = {
      ...data,
      price: Number(data.price),
    };
    await createDish(token, payload);
  };

  const handleUpdateDish = async (dishId: string, data: EditDishForm) => {
    const payload: UpdateDishDTO = new UpdateDishDTO({
      ...data,
      price: Number(data.price),
    });
    await updateDish(dishId, token, payload);
  };

  const handleDeleteDish = async (dishId: string) => {
    await deleteDish(dishId, token);
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
        showConfirmDelete,
        editMenuSidebarOpen,
        menuToEdit,
        setMenuToDelete,
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
