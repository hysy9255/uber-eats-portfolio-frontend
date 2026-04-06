import { Outlet } from "react-router-dom";
import { ClientOrderProvider } from "../../ReactContext/clientOrder/ClientOrderProvider";

const ClientOrderLayout = () => {
  return (
    <ClientOrderProvider>
      <Outlet />
    </ClientOrderProvider>
  );
};

export default ClientOrderLayout;
