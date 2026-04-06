import { useRef, useState } from "react";
import { uploadImage } from "../../utils/uploadImg";
import PlusIcon from "../Icons/PlusIcon";
import DefaultRestaurantLogoImg from "../Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";
import { useForm } from "react-hook-form";

interface RestaurantLogoUploadZoneProps {
  accept?: string;
  value?: string | null;
}

const RestaurantLogoUploadZone: React.FC<RestaurantLogoUploadZoneProps> = ({
  accept = "image/*",
  value,
}) => {
  const isEditing = false;
  const inputRef = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const [preview, setPreview] = useState<string>();

  const methods = useForm<{ logo: string }>({
    mode: "onSubmit",
  });

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    const persistentUrl = await uploadImage(file);
    methods.setValue("logo", persistentUrl);
  };

  const openPicker = () => {
    if (isEditing !== undefined) {
      if (!isEditing) return;
    }
    inputRef.current?.click();
  };

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
    setResetKey((k) => k + 1); // ensure same file can be picked again
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    onSelectImageUpload(file);
    resetInput();
  };

  return (
    <div className="border flex flex-col items-center gap-2 w-60">
      <div className="border rounded-full overflow-hidden">
        <input
          key={resetKey}
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onClick={(e) => ((e.target as HTMLInputElement).value = "")}
          onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
        />
        {value ? (
          <img
            src={value}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            {isEditing ? (
              <div
                onClick={openPicker}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <PlusIcon />
                <div className="px-2 text-center text-sm text-slate-600">
                  Click here to upload
                </div>
                <div className="text-[10px] text-slate-500">
                  JPG, PNG, PDF · up to 10MB
                </div>
              </div>
            ) : (
              <div
                onClick={openPicker}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <DefaultRestaurantLogoImg />
              </div>
            )}
          </>
        )}
      </div>
      <button className="px-5 py-1 text-sm rounded-md border border-gray-300 bg-neutral-100/50 hover:cursor-pointer">
        Change logo
      </button>
    </div>
  );
};

export default RestaurantLogoUploadZone;
