import type { CreateDeliveryAddressDTO } from "../dto/CreateDeliveryAddress.dto";
import type { DeleteDeliveryAddressDTO } from "../dto/DeleteDeliveryAddress.dto";
import type { GetDeliveryAddressDTO } from "../dto/GetDeliveryAddress.dto";
import type { SetDefaultDeliveryAddressDTO } from "../dto/SetDefaultDeliveryAddress.dto";
import type { UpdateDeliveryAddressDTO } from "../dto/UpdateDeliveryAddress.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const viewMyDeliveryAddresses = async (
  token: string
): Promise<GetDeliveryAddressDTO[]> => {
  const res = await fetch(`${API_BASE_URL}/client/address`, {
    method: "GET",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
  });

  if (!res.ok) throw new Error("unauthorized");
  return await res.json();
};

export const setDefaultAddress = async (
  token: string,
  payload: SetDefaultDeliveryAddressDTO
) => {
  const res = await fetch(`${API_BASE_URL}/client/address/default`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("unauthorized");
};

export const updateDeliveryAddress = async (
  token: string,
  payload: UpdateDeliveryAddressDTO
) => {
  const res = await fetch(`${API_BASE_URL}/client/address`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("unauthorized");
};

export const addDeliveryAddress = async (
  token: string,
  payload: CreateDeliveryAddressDTO
) => {
  const res = await fetch(`${API_BASE_URL}/client/address`, {
    method: "POST",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("unauthorized");
};

export const deleteDeliveryAddress = async (
  token: string,
  payload: DeleteDeliveryAddressDTO
) => {
  const res = await fetch(`${API_BASE_URL}/client/address`, {
    method: "DELETE",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
};
