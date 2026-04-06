import AllRestaurantsIcon from "../components/Icons/ClientSideBar/AllRestaurantsIcon";
import CartIcon from "../components/Icons/ClientSideBar/CartIcon";
import DeliveryAddressIcon from "../components/Icons/ClientSideBar/DeliveryAddressIcon";
import OrdersIcon from "../components/Icons/ClientSideBar/OrdersIcon";
import { ClientSideBarTabTypes } from "./ClientSideBarTabEnums";

export enum AddOn {
  ORDERS = "ORDERS",
}

export type TabNode =
  | {
      kind: "item";
      key: ClientSideBarTabTypes;
      title: string;
      path: string;
      icon?: React.ReactNode;
    }
  | {
      kind: "group";
      key: AddOn;
      title: string;
      children: TabNode[];
      icon?: React.ReactNode;
    };

export const clientSidebarTabs: TabNode[] = [
  {
    kind: "item",
    key: ClientSideBarTabTypes.ALL_RESTAURANTS,
    title: "All Restaurants",
    path: "/client/restaurants",
    icon: <AllRestaurantsIcon className="w-5 " />,
  },
  {
    kind: "group",
    key: AddOn.ORDERS,
    title: "Orders",
    icon: <OrdersIcon className="w-5 " />,
    children: [
      {
        kind: "item",
        key: ClientSideBarTabTypes.ONGOING_ORDERS,
        title: "On Going",
        path: "/client/on-going-orders",
      },
      {
        kind: "item",
        key: ClientSideBarTabTypes.ORDER_HISTORY,
        title: "Order History",
        path: "/client/order-history",
      },
    ],
  },
  {
    kind: "item",
    key: ClientSideBarTabTypes.DELIVERY_ADDRESS,
    title: "Delivery Address",
    path: "/client/delivery-address",
    icon: <DeliveryAddressIcon className="w-5 " />,
  },
  {
    kind: "item",
    key: ClientSideBarTabTypes.CART,
    title: "Cart",
    path: "/client/cart",
    icon: <CartIcon className="w-5 " />,
  },
];
