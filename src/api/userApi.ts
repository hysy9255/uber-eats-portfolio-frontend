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
  try {
    const res = await fetch(`${API_BASE_URL}/me`, {
      method: "PATCH",
      headers: {
        ...COMMON_HEADERS,
        "jwt-token": token,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.log("message:", data.message);
      throw new Error(data.error);
    }

    alert("정보가 수정되었습니다");
  } catch (e) {
    alert(e);
  }
};

export const updatePassword = async (
  token: string,
  payload: UpdatePasswordDTO
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/password`, {
      method: "PATCH",
      headers: { ...COMMON_HEADERS, "jwt-token": token },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.log("message:", data.message);
      throw new Error(data.message);
    }
    alert("비밀번호가 변경되었습니다");
  } catch (e) {
    alert(e);
  }
};
