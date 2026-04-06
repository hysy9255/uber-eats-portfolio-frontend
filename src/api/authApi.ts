import type { LoginRequestDTO } from "../dto/Login.request.dto";
import type { LoginResponseDTO } from "../dto/Login.response.dto";
import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const loginUser = async (
  payload: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorMsg = await res.json();
    throw new Error(errorMsg.message);
  }
  return await res.json();
};
