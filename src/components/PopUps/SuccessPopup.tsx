import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
};

export default function SuccessDialog({
  open,
  title = "Account created",
  message,
  onConfirm,
}: Props) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-[min(92vw,440px)] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/10"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-full bg-black px-4 py-2 text-white hover:bg-black/90 active:translate-y-px"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
