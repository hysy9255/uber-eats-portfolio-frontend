import { createContext } from "react";
// import type { CartItem } from "../../pages/DishPage";
import type { Cart, CartItem } from "./CartProvider";

type CartContextValue = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  emptyCart: () => void;
  addDishQuantity: (dishId: string) => void;
  removeDishQuantity: (dishId: string) => void;
  calculatTotalCost: () => number;
  clearAndAddNewItem: (item: CartItem) => void;
  restaurantName?: string;
  restaurantLogo?: string;
};

export const CartContext = createContext<CartContextValue | null>(null);
