import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../../../utils/localDraft";
import { useForm } from "react-hook-form";
import WizardShell from "../../../components/Shells/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../../../constants/CreateDriverPageSteps";
import { DriverStep4RightPanel } from "../../../components/Panels/DriverRegistrationPanels";
import { driverOnBoardStep4DefaultValues } from "../../../constants/DefaultValues";
import {
  DRIVER_STEP4_KEY,
  type DriverOnBoardingStep4Form,
} from "../../../formDataTypes/onBoarding/driverOnBoardingForms.type";

export default function DriverOnboardingBackground() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<DriverOnBoardingStep4Form>(
    DRIVER_STEP4_KEY,
    driverOnBoardStep4DefaultValues
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverOnBoardingStep4Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const onBack = () => {
    navigate("/driver-on-board-step-3");
  };

  const onContinue = (data: DriverOnBoardingStep4Form) => {
    saveDraft(DRIVER_STEP4_KEY, data);
    navigate("/driver-on-board-step-5");
  };
  return (
    <WizardShell
      onBack={onBack}
      onContinue={handleSubmit(onContinue)}
      title="Background check consent"
      subtitle="We use a third-party service to complete your screening."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={3}
      right={DriverStep4RightPanel}
    >
      <form className="space-y-6">
        {/* Legal name / last 4 (UI-only placeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Legal full name</span>
            <input
              {...register("legalFullName", {
                required: "Legal full name is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Jane Marie Doe"
            />
            {errors.legalFullName?.message && (
              <span className="font-medium text-red-500">
                {errors.legalFullName?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Last 4 SSN (US)</span>
            <input
              {...register("last4SSN", {
                required: "Last 4 SSN is required",
              })}
              type="password"
              maxLength={4}
              inputMode="numeric"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/\D/g, "");
              }}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="••••"
            />
            {errors.last4SSN?.message && (
              <span className="font-medium text-red-500">
                {errors.last4SSN?.message}
              </span>
            )}
          </label>
        </div>

        <div className="rounded-xl ring-1 ring-slate-200 p-4">
          <div className="text-sm font-medium">
            Confirm your current address
          </div>
          <p className="mt-1 text-sm text-slate-600">
            123 Main St, Apt 5B, San Francisco, CA 94103
          </p>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            Edit address
          </button>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm">
              I consent to a background check and authorize the collection and
              processing of my information for this purpose.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm">
              I acknowledge that results may affect my eligibility to deliver
              per local regulations.
            </span>
          </label>
        </div>

        <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-4 text-[12px] text-slate-600">
          By continuing, you agree to the{" "}
          <a className="underline" href="#">
            Disclosure
          </a>{" "}
          and{" "}
          <a className="underline" href="#">
            Authorization
          </a>
          , and confirm you’ve read the{" "}
          <a className="underline" href="#">
            Summary of Rights
          </a>
          .
        </div>
      </form>
    </WizardShell>
  );
}
