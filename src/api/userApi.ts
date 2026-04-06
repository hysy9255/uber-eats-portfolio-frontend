import type { checkEmailAvailabilityQueryDTO } from "../dto/CheckEmailAvailability.query.dto";
import type { checkEmailAvailabilityResponseDTO } from "../dto/CheckEmailAvailability.response.dto";
import type { UpdatePasswordDTO } from "../dto/UpdatePassword.dto";
import type { UpdateUserDTO } from "../dto/UpdateUser.dto";
import type { UserDTO } from "../dto/User.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const checkEmailAvailability = async ({
  email,
}: checkEmailAvailabilityQueryDTO): Promise<checkEmailAvailabilityResponseDTO> => {
  const res = await fetch(`${API_BASE_URL}/exists?email=${email}`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getMe = async (token: string): Promise<UserDTO> => {
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
  });

  if (!res.ok) throw new Error("unauthorized");
  return await res.json();
};

export const updateMe = async (token: string, payload: UpdateUserDTO) => {
  const res = await fetch(`${API_BASE_URL}/me`, {
    method: "PATCH",
    headers: {
      ...COMMON_HEADERS,
      "jwt-token": token,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const updatePassword = async (
  token: string,
  payload: UpdatePasswordDTO
) => {
  const res = await fetch(`${API_BASE_URL}/password`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorMsg = await res.json();
    throw new Error(errorMsg.message);
  }
};
