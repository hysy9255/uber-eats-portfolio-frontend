// WizardShell.tsx — 공통 레이아웃/스텝퍼/액션바(UI 전용)
import React, { useEffect } from "react";
import LeaveThisStepPopup from "../LeaveThisStepPopup";
import { useLocation } from "react-router-dom";
import MainHeaderV2 from "../Headers/MainHeaderV2";
import LoginButton from "../Buttons/LoginButton";
import HelpHeader from "../Headers/HelpHeader";

type WizardShellProps = {
  continueLabel?: string;
  onContinue?: () => void;
  onBack?: () => void;
  title: string;
  subtitle?: string;
  steps: string[];
  active: number; // 0-based
  right?: React.ReactNode; // 사이드 도움말
  children: React.ReactNode; // 왼쪽 폼
  onExitWithoutSaving?: () => void; // clear + navigate back
  onSaveAndExit?: () => void;
  showConfirm?: boolean;
  setShowConfirm?: React.Dispatch<React.SetStateAction<boolean>>;
  canContinue?: boolean;
};

export default function WizardShellForDish({
  // canContinue = true,
  continueLabel = "Submit",
  onContinue,
  onBack,
  title,
  subtitle,
  right,
  children,
  onExitWithoutSaving,
  // onSaveAndExit,
  showConfirm = false,
  setShowConfirm = () => {},
}: WizardShellProps) {
  const { pathname } = useLocation();

  const layoutWidth = "max-w-[900px] mx-auto";
  // const layoutWidth2 = "max-w-screen-xl mx-auto";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <main
        className={`${layoutWidth} px-6 lg:px-10 min-h-[calc(100vh-64px)] flex flex-col justify-center`}
      >
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
        {/* <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start"> */}
        <div className="mt-8 items-start">
          {/* <section className="lg:col-span-3 rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8"> */}
          <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
            {children}
          </section>

          {/* <aside className="h-fit rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-5">
            {right}
          </aside> */}
        </div>

        {/* Bottom action bar (UI-only) */}
        <div className="sticky bottom-0 mt-10 -mx-6 lg:-mx-10 bg-white/80 backdrop-blur border-t border-black/5">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50"
            >
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                // disabled={!canContinue}
                onClick={onContinue}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-black/90"
              >
                {continueLabel}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Confirm modal */}
      {showConfirm && (
        <LeaveThisStepPopup
          setShowConfirm={setShowConfirm}
          onExitWithoutSaving={onExitWithoutSaving}
        />
      )}
    </div>
  );
}
