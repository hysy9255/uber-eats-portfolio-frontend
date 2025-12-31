import { useRef, useState } from "react";
import PencilButton from "../Buttons/IconBased/PencilButton/PencilButton";
import RoundBorderXMarkButton from "../Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";
import { uploadImage } from "../../utils/uploadImg";
import {
  blackBackgroundCrossIconCloseStyle,
  blueBackgroundPencilIconEditStyle,
} from "../../tailwindcss/styleConstants";

interface RhfImageUploadZone3rops {
  label?: string;
  accept?: string;
  sizeClass?: string;
  isEditing?: boolean;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

const RhfImageUploadZone: React.FC<RhfImageUploadZone3rops> = ({
  label = "Click to upload an image",
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
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      className={[
        "rounded-xl",
        `${
          isEditing
            ? "border-blue-300 border-4 cursor-pointer bg-slate-50 hover:bg-slate-100"
            : "border-slate-300 border-4"
        }`,
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        "overflow-hidden grid place-items-center relative",
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
            className="h-full w-full object-cover absolute inset-0"
          />
          {isEditing && (
            <>
              <PencilButton
                className={`${blueBackgroundPencilIconEditStyle} absolute bottom-2 right-2 w-8 h-8 `}
                onClick={openPicker}
              />
              <RoundBorderXMarkButton
                className={`${blackBackgroundCrossIconCloseStyle} absolute top-2 right-2 w-8 h-8`}
                onClick={() => onChange?.(null)}
              />
            </>
          )}
        </>
      ) : (
        <div
          onClick={openPicker}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <svg
            className="mx-auto h-8 w-8 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <div className="px-2 text-center text-sm text-slate-600">{label}</div>
          <div className="text-[12px] text-slate-500">
            JPG, PNG, PDF · up to 10MB
          </div>
        </div>
      )}
    </div>
  );
};

export default RhfImageUploadZone;
