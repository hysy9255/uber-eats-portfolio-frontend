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
  try {
    const res = await fetch(`${API_BASE_URL}/client/address/default`, {
      method: "PATCH",
      headers: { ...COMMON_HEADERS, "jwt-token": token },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.log("message:", data.message);
      throw new Error(data.error);
    }

    alert("배송지가 변경되었습니다");
  } catch (e) {
    alert(e);
  }
};

export const updateDeliveryAddress = async (
  token: string,
  payload: UpdateDeliveryAddressDTO
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/client/address`, {
      method: "PATCH",
      headers: { ...COMMON_HEADERS, "jwt-token": token },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.log("message:", data.message);
      throw new Error(data.error);
    }

    alert("주소가 변경되었습니다");
  } catch (e) {
    alert(e);
  }
};

export const addDeliveryAddress = async (
  token: string,
  payload: CreateDeliveryAddressDTO
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/client/address`, {
      method: "POST",
      headers: { ...COMMON_HEADERS, "jwt-token": token },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.log("message:", data.message);
      throw new Error(data.error);
    }
    alert("주소가 등록되었습니다");
  } catch (e) {
    alert(e);
  }
};

export const deleteDeliveryAddress = async (
  token: string,
  payload: DeleteDeliveryAddressDTO
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/client/address`, {
      method: "DELETE",
      headers: { ...COMMON_HEADERS, "jwt-token": token },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    alert("주소가 삭제되었습니다");
  } catch (e) {
    alert(e);
  }
};
