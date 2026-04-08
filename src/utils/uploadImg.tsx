import { API_BASE_URL } from "../api/baseUrl";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());

  const { url } = await res.json();
  if (!url) throw new Error("Upload response missing 'url'");
  return url;
};
