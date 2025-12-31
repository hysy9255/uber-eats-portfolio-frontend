import type {
  ProfileDTO,
  UpdatePasswordForm,
  UpdateProfileForm,
} from "../pages/Profile";
import type { ICreateCustomer } from "../pages/types/CustomerOnBoardingStep3Review.type";
import type { ICreateOwner } from "../pages/types/OwnerOnBoardingStep5Review.type";

const API_BASE_URL = "http://localhost:3002/users";
const COMMON_HEADERS = {
  "Content-Type": "application/json",
};

export const checkEmailAvailability = async (email: string) => {
  const res = await fetch(`${API_BASE_URL}/exists?email=${email}`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
};

export const getMyProfile = async (token: string): Promise<ProfileDTO> => {
  const res = await fetch(`${API_BASE_URL}/me`, {
    headers: { ...COMMON_HEADERS, "jwt-token": token },
  });
  if (!res.ok) throw new Error("unauthorized");
  return await res.json();
};

export const createOwner = async (payload: ICreateOwner) => {
  const res = await fetch(`${API_BASE_URL}/owners`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const createCustomer = async (payload: ICreateCustomer) => {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
};

export const updateMyProfile = async (
  token: string,
  payload: UpdateProfileForm
) => {
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
  payload: UpdatePasswordForm
) => {
  const res = await fetch(`${API_BASE_URL}/password`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "jwt-token": token },
    body: JSON.stringify({
      password: payload.currentPassword,
      newPassword: payload.newPassword,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
};
