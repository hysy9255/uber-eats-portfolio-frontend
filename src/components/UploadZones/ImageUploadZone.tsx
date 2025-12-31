import { useRef, useState } from "react";

export default function ImageUploadZone({
  label = "Click to upload an image",
  accept = "image/*",
  className = "w-44 md:w-60",
  previewSrc,
  onSelected,
}: {
  label?: string;
  accept?: string;
  className?: string;
  previewSrc?: string | null;
  onSelected?: (file: File) => void;
}) {
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
    onSelected?.(file);
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
        "border-2 border-dashed cursor-pointer transition",
        "border-slate-300 bg-slate-50 hover:bg-slate-100",
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
        <div>
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
}
