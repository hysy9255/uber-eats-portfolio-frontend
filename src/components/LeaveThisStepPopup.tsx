import React from "react";

type PopupProps = {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onExitWithoutSaving?: () => void;
};

const LeaveThisStepPopup = ({
  setShowConfirm,
  onExitWithoutSaving,
}: PopupProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* panel */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/10">
        <h2 className="text-lg font-semibold">Leave this step?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to exit? If you leave without saving, the
          information you typed will be lost.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              setShowConfirm(false);
              onExitWithoutSaving?.(); // exit w/o saving
            }}
            className="rounded-full px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50"
          >
            Exit without saving
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveThisStepPopup;
