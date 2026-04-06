import { uploadImage } from "./uploadImg";

export const onClickUploadImg = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file.");
    e.target.value = "";
    return;
  }

  const url = URL.createObjectURL(file);
  setPreview(url);
  return await uploadImage(file);
};
