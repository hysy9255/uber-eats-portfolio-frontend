import { API_BASE_URL, COMMON_HEADERS } from "./baseUrl";

export const parseDishCsv = async (mode: string, fd: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/owner/drafts/menu/import?mode=${mode}`,
    {
      method: "POST",
      body: fd,
    }
  );

  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return await res.json();
};

export const downloadDishCsvTemplate = async () => {
  const res = await fetch(`${API_BASE_URL}/owner/drafts/menu/template.csv`, {
    method: "GET",
    headers: COMMON_HEADERS,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "menu-template.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};
