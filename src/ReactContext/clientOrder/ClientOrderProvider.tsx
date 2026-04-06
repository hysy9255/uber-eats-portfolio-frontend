import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ClientOrderContext } from "./ClientOrderContext";
import { useAuth } from "../auth/UseAuth";
import { UserRole } from "../../constants/UserRoleEnum";
import { useParams } from "react-router-dom";
import type { GetOrderForClientDTO } from "../../dto/GetOrderForClient.dto";
import { getOrderForClient } from "../../api/orderApi";

interface ClientOrderProviderProps {
  children: ReactNode;
}

export const ClientOrderProvider: React.FC<ClientOrderProviderProps> = ({
  children,
}) => {
  const { loggedIn, user, token } = useAuth();
  const isClient = user?.role === UserRole.Client && loggedIn;
  const [order, setOrder] = useState<GetOrderForClientDTO>();
  const { orderId } = useParams<{ orderId: string }>();

  const loadOrderData = useCallback(async () => {
    if (!orderId || !token) return;
    const result = await getOrderForClient(token, orderId);
    setOrder(result);
  }, [token, orderId]);

  useEffect(() => {
    if (!isClient) return;
    loadOrderData();
  }, [loadOrderData, isClient]);

  if (!isClient) return <>{children}</>;

  return (
    <ClientOrderContext.Provider
      value={{
        order,
      }}
    >
      {children}
    </ClientOrderContext.Provider>
  );
};
