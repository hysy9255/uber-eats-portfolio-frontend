import { createContext } from "react";
import type { EditDishForm } from "../../formDataTypes/dish/editDishForm.type";
import type { DishDTO } from "../../dtos/Dish.dto";
import type { CreateDishForm } from "../../formDataTypes/dish/createDishForm.type";
import type { DishCategory } from "../../constants/DishCategoryEnums";

type MenusContextValue = {
  loadMenus: () => Promise<void>;
  handleCreateDish: (data: CreateDishForm) => Promise<void>;
  handleUpdateDish: (dishId: string, data: EditDishForm) => Promise<void>;
  // handleDeleteDish: () => Promise<void>;
  handleDeleteDish: (dishId: string) => Promise<void>;
  handleClickEditButton: (menu: DishDTO) => void;
  handleClickDeleteButton: (menu: DishDTO) => void;
  menuList: DishDTO[];
  menuList2?: Record<DishCategory, DishDTO[]>;
  showConfirmDelete: boolean;
  editMenuSidebarOpen: boolean;
  menuToEdit?: DishDTO;
  menuToDelete: DishDTO | null;
  setShowConfirmDelete: (value: boolean) => void;
  addMenuSidebarOpen: boolean;
  setAddMenuSidebarOpen: (value: boolean) => void;
  setEditMenuSidebarOpen: (value: boolean) => void;
};

export const MenusContext = createContext<MenusContextValue | null>(null);
