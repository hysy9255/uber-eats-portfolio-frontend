import React, { Fragment } from "react";
import LeaveThisStepPopup from "../PopUps/LeaveThisStepPopup";

type WizardShellProps = {
  continueLabel?: string;
  onContinue?: () => void;
  onBack?: () => void;
  title: string;
  subtitle?: string;
  steps: string[];
  active: number;
  right?: React.ReactNode;
  children: React.ReactNode;
  onExitWithoutSaving?: () => void;
  onSaveAndExit?: () => void;
  showConfirm?: boolean;
  setShowConfirm?: React.Dispatch<React.SetStateAction<boolean>>;
  canContinue?: boolean;
};

export default function WizardShell({
  continueLabel = "Continue",
  onContinue,
  onBack,
  title,
  subtitle,
  steps,
  active,
  right,
  children,
  onExitWithoutSaving,
  showConfirm = false,
  setShowConfirm = () => {},
}: WizardShellProps) {
  const layoutWidth = "max-w-[900px] mx-auto";

  return (
    <Fragment>
      <main
        className={`${layoutWidth} px-6 lg:px-10 flex flex-col justify-center`}
      >
        <div className="z-30 bg-gray-50 py-4 -mx-6 lg:-mx-10">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 flex items-center justify-between gap-3">
            <ol className="flex flex-wrap items-center gap-4 text-sm">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border text-[12px] ${
                      i <= active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-500 border-slate-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`${
                      i <= active ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {s}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="mx-2 h-px w-8 bg-slate-200" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </div>

        <div className="h-fit mt-8 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-5">
          {right}
        </div>
        <div className="mt-8 items-start">
          <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
            {children}
          </section>
        </div>
        <div className="sticky bottom-0 mt-10 -mx-6 lg:-mx-10 bg-white/80 backdrop-blur border-t border-black/5">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 hover:cursor-pointer"
            >
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onContinue}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-black/90 hover:cursor-pointer"
              >
                {continueLabel}
              </button>
            </div>
          </div>
        </div>
      </main>

      {showConfirm && (
        <LeaveThisStepPopup
          setShowConfirm={setShowConfirm}
          onExitWithoutSaving={onExitWithoutSaving}
        />
      )}
    </Fragment>
  );
}
