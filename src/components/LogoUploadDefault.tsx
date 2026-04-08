import { useRef, useState } from "react";
import CameraIcon from "./Icons/CameraIcon/CameraIcon";

const LogoUpload = () => {
  const [preview, setPreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    // const uploadedUrl = await uploadImage(file);
    e.target.value = "";
  };

  return (
    <div className="border min-h-[calc(100vh-60px)]">
      <div className="flex flex-col  items-center gap-3 border">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeLogo}
        />
        <div className="border-2 border-gray-300 w-30 h-30 flex items-center justify-center rounded-full">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-gray-500">No Logo Image</div>
          )}
        </div>
        <button
          type="button"
          onClick={openFilePicker}
          className="rounded border border-gray-300 flex items-center px-5 py-1 gap-1 text-xs bg-gray-50 hover:bg-gray-200/50 active:bg-gray-200/80 hover:cursor-pointer"
        >
          <CameraIcon className="w-5 h-5" />
          <span>Change Logo</span>
        </button>
      </div>
    </div>
  );
};

export default LogoUpload;
