import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AddressContext } from "./AddressContext";
import { getToken } from "../../auth";
import { viewMyDeliveryAddresses } from "../../api/clientApi";
import type { GetDeliveryAddressDTO } from "../../dto/GetDeliveryAddress.dto";
import { useAuth } from "../auth/UseAuth";
import { UserRole } from "../../constants/UserRoleEnum";

interface AddressProviderProps {
  children: ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const { loggedIn, user } = useAuth();

  const isClient = user?.role === UserRole.Client && loggedIn;

  const [addressList, setAddressList] = useState<GetDeliveryAddressDTO[]>();
  const [address, setAddress] = useState<GetDeliveryAddressDTO>();

  const token = getToken();

  const loadMyDeliveryAddresses = useCallback(async () => {
    if (!token) return;
    const data = await viewMyDeliveryAddresses(token);
    setAddressList(data);
    setAddress(data.find((d) => d.isDefault === true));
  }, [token]);

  useEffect(() => {
    if (!isClient) return;
    loadMyDeliveryAddresses();
  }, [loadMyDeliveryAddresses, isClient]);

  if (!isClient) return <>{children}</>;

  return (
    <AddressContext.Provider
      value={{
        addressList,
        address,
        loadMyDeliveryAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
