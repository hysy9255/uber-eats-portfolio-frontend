import { useRef, useState } from "react";

interface ImageUploadZoneSmallProps {
  index: number;
  accept?: string;
  className?: string;
  previewSrc?: string;
  onSelected?: (index: number, file: File) => void;
}

const ImageUploadZoneSmall: React.FC<ImageUploadZoneSmallProps> = ({
  index,
  accept = "image/*",
  className = "w-44 md:w-60",
  previewSrc,
  onSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const openPicker = () => inputRef.current?.click();

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
    onSelected?.(index, file);
    resetInput();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      onClick={openPicker}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      className={[
        "cursor-pointer transition",
        "border-slate-300 bg-slate-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        "overflow-hidden grid place-items-center relative",
        className,
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
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="preview"
          className="h-full w-full object-cover absolute inset-0"
        />
      ) : (
        <div className="bg-slate-100 grid place-items-center text-xs text-slate-500 hover:cursor-pointer">
          No Image
        </div>
      )}
    </div>
  );
};

export default ImageUploadZoneSmall;
