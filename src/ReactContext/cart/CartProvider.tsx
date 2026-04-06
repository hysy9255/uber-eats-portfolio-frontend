import { useCallback, useEffect, useState, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import { getRestaurantNameAndLogo } from "../../api/restaurantApi";

interface CartProviderProps {
  children: ReactNode;
}

export type CartItem = {
  dishId: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  dishImgUrl?: string;
};

export interface Cart {
  restaurantId: string | null;
  cartItems: CartItem[];
}

const initialCartState: Cart = {
  restaurantId: null,
  cartItems: [],
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : initialCartState;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    if (cart.restaurantId && cart.restaurantId !== item.restaurantId) {
      throw new Error(
        "You can only add items to the cart from same restaurant"
      );
    } else if (!cart.restaurantId) {
      setCart({
        restaurantId: item.restaurantId,
        cartItems: [item],
      });
    } else {
      const alreadyIntheCart = cart.cartItems.some(
        (elem) => elem.dishId === item.dishId
      );
      if (alreadyIntheCart) {
        addDishQuantity(item.dishId);
      } else {
        setCart((prev) => ({
          ...prev,
          cartItems: [...prev.cartItems, item],
        }));
      }
    }
  };

  const clearAndAddNewItem = (item: CartItem) => {
    setCart({
      restaurantId: item.restaurantId,
      cartItems: [item],
    });
  };

  const emptyCart = () => {
    setCart(initialCartState);
  };

  const addDishQuantity = (dishId: string) => {
    setCart((prev) => ({
      ...prev,
      cartItems: prev.cartItems.map((item) =>
        item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  const removeDishQuantity = (dishId: string) => {
    const decrementQuantityByOne = (prev: Cart) => {
      return {
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.dishId === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    };

    const isLastItem = cart.cartItems.length === 1;
    if (isLastItem) {
      const lastItem = cart.cartItems[0];
      if (lastItem.quantity === 1) {
        emptyCart();
      } else if (lastItem.quantity > 1)
        setCart((prev) => decrementQuantityByOne(prev));
      else {
        return;
      }
    } else {
      setCart((prev) => {
        const target = prev.cartItems.find((item) => item.dishId === dishId);
        if (!target) return prev;

        if (target.quantity === 1) {
          return {
            ...prev,
            cartItems: prev.cartItems.filter(
              (item) => item.dishId !== target.dishId
            ),
          };
        } else if (target.quantity > 1) {
          return decrementQuantityByOne(prev);
        } else {
          return { ...prev };
        }
      });
    }
  };

  const calculatTotalCost = () => {
    const totalCost = cart.cartItems.reduce(
      (acc, ct) => acc + ct.price * ct.quantity,
      0
    );
    return Number(totalCost.toFixed(2));
  };

  const [restaurantName, setRestaurantName] = useState<string>();
  const [restaurantLogo, setRestaurantLogo] = useState<string>();

  const loadRestaurantNameAndLogo = useCallback(async () => {
    if (cart.restaurantId) {
      const { restaurantName, restaurantLogo } = await getRestaurantNameAndLogo(
        cart.restaurantId
      );
      setRestaurantName(restaurantName);
      setRestaurantLogo(restaurantLogo);
    } else {
      setRestaurantName(undefined);
      setRestaurantLogo(undefined);
    }
  }, [cart.restaurantId]);

  useEffect(() => {
    loadRestaurantNameAndLogo();
  }, [loadRestaurantNameAndLogo]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        emptyCart,
        clearAndAddNewItem,
        addDishQuantity,
        removeDishQuantity,
        calculatTotalCost,
        restaurantName,
        restaurantLogo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
