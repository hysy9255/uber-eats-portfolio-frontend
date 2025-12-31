import { useRef, useState } from "react";
import PencilButton from "../Buttons/IconBased/PencilButton/PencilButton";
import RoundBorderXMarkButton from "../Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";
import { uploadImage } from "../../utils/uploadImg";
import PlusIcon from "../Icons/PlusIcon";
import {
  blackBackgroundCrossIconCloseStyle,
  blueBackgroundPencilIconEditStyle,
} from "../../tailwindcss/styleConstants";
import DefaultRestaurantLogoImg from "../Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";

interface RestaurantLogoUploadZoneProps {
  accept?: string;
  sizeClass?: string;
  isEditing?: boolean;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

const RestaurantLogoUploadZone: React.FC<RestaurantLogoUploadZoneProps> = ({
  accept = "image/*",
  sizeClass = "w-44 md:w-60",
  isEditing,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    onChange?.(url);
    const persistentUrl = await uploadImage(file);
    onChange?.(persistentUrl);
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
    <div className="flex items-center justify-center py-3 relative">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload image"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        className={[
          "rounded-full",
          `${
            isEditing
              ? "border-blue-300 border-4 cursor-pointer bg-slate-50 hover:bg-slate-100"
              : "border-slate-300 border-4"
          }`,
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
          "aspect-square overflow-hidden grid place-items-center",
          "transition duration-300",
          sizeClass,
        ].join(" ")}
      >
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
          <>
            <img
              src={value}
              alt="preview"
              className="h-full w-full object-cover"
            />
            {isEditing && (
              <>
                <PencilButton
                  className={`absolute bottom-5 right-5 w-8 h-8 ${blueBackgroundPencilIconEditStyle}`}
                  onClick={openPicker}
                />
                <RoundBorderXMarkButton
                  className={`absolute top-5 right-5 w-8 h-8 ${blackBackgroundCrossIconCloseStyle}`}
                  onClick={() => onChange?.(null)}
                />
              </>
            )}
          </>
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
    </div>
  );
};

export default RestaurantLogoUploadZone;
