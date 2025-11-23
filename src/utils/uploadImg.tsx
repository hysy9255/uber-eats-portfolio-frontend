export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:3002/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());

  const { url } = await res.json();
  if (!url) throw new Error("Upload response missing 'url'");
  return url;
};
