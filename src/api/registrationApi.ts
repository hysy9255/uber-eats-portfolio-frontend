import type { RegisterClientDTO } from "../dto/RegisterClient.dto";
import type { RegisterDriverDTO } from "../dto/RegisterDriver.dto";
import type { RegisterOwnerDTO } from "../dto/RegisterOwner.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const registerClient = async (payload: RegisterClientDTO) => {
  const res = await fetch(`${API_BASE_URL}/registration/clients`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const registerOwner = async (payload: RegisterOwnerDTO) => {
  const res = await fetch(`${API_BASE_URL}/registration/owners`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const registerDriver = async (payload: RegisterDriverDTO) => {
  const res = await fetch(`${API_BASE_URL}/registration/drivers`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};
