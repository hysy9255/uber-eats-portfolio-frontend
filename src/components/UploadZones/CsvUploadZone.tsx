import { useRef, useState } from "react";
import type { ImportResult } from "../../pages/OwnerOnboardingStep4Menu";

type Props = {
  // draftId: string;
  mode?: "append" | "replace";
  onUploaded?: (result: ImportResult) => void;
};

export default function CsvUploadzone({ mode = "append", onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
    setResetKey((k) => k + 1);
  };

  const upload = async (file: File) => {
    // (optional) quick guard for csv
    const isCsv =
      file.type === "text/csv" ||
      file.name.toLowerCase().endsWith(".csv") ||
      file.type === "application/vnd.ms-excel"; // some browsers use this
    if (!isCsv) {
      alert("Please choose a .csv file");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("mode", mode);

    const res = await fetch(
      `http://localhost:3002/owner/drafts/menu/import?mode=${mode}`,
      { method: "POST", body: fd }
    );
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const json = await res.json();
    onUploaded?.(json);
  };

  const handleChange = async (files?: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    try {
      await upload(file);
    } finally {
      resetInput(); // let the same file be chosen again next time
    }
  };

  return (
    <div
      className={`mt-4 h-36 rounded-xl border-2 border-dashed grid place-items-center text-sm cursor-pointer
        border-slate-300 bg-slate-50 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      role="button"
      tabIndex={0}
      aria-label="Upload CSV"
      // (optional) prevent accidental browser file-open on drop without enabling DnD
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <input
        key={resetKey}
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onClick={(e) => ((e.target as HTMLInputElement).value = "")}
        onChange={(e) => handleChange(e.target.files)}
      />
      <span className="text-slate-600">Click to upload a CSV</span>
    </div>
  );
}
