import { Outlet } from "react-router-dom";
import { CartProvider } from "../../ReactContext/cart/CartProvider";
import { AddressProvider } from "../../ReactContext/address/AddressProvider";
import { ClientSideBarProvider } from "../../ReactContext/clientSideBar/ClientSideBarProvider";
import ClientLayout from "../Layout/ClientLayout";

const ClientPageShell = () => {
  return (
    <CartProvider>
      <AddressProvider>
        <ClientSideBarProvider>
          <ClientLayout>
            <Outlet />
          </ClientLayout>
        </ClientSideBarProvider>
      </AddressProvider>
    </CartProvider>
  );
};

export default ClientPageShell;
