import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../../../utils/localDraft";
import {
  AccountTypeOptions,
  TaxClassificationOptions,
} from "../../types/constant.enums.type";
import { useForm } from "react-hook-form";
import WizardShell from "../../../components/Shells/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../../../constants/CreateDriverPageSteps";
import { DriverStep5RightPanel } from "../../../components/Panels/DriverRegistrationPanels";
import { driverOnBoardStep5DefaultValues } from "../../../constants/DefaultValues";
import {
  DRIVER_STEP5_KEY,
  type DriverOnBoardingStep5Form,
} from "../../../formDataTypes/onBoarding/driverOnBoardingForms.type";

export default function DriverOnboardingPayout() {
  const navigate = useNavigate();
  const defaultValues = loadDraft<DriverOnBoardingStep5Form>(
    DRIVER_STEP5_KEY,
    driverOnBoardStep5DefaultValues
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverOnBoardingStep5Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const onContinue = (data: DriverOnBoardingStep5Form) => {
    saveDraft(DRIVER_STEP5_KEY, data);
    navigate("/driver-on-board-step-6");
  };

  const onBack = () => {
    navigate("/driver-on-board-step-4");
  };
  return (
    <WizardShell
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Set up your payouts"
      subtitle="Get paid securely and on time."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={4}
      right={DriverStep5RightPanel}
    >
      <div className="space-y-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">
              Full name (as on bank account)
            </span>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Jane Marie Doe"
            />
            {errors.fullName?.message && (
              <div className="font-medium text-red-500">
                {errors.fullName?.message}
              </div>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">
              Routing number (9 digits)
            </span>
            <input
              {...register("routingNumber", {
                required: "Routing number is required",
              })}
              onInput={(e) => {
                const el = e.target as HTMLInputElement;
                el.value = el.value.replace(/\D/g, "").slice(0, 9);
              }}
              type="password"
              maxLength={9}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 tracking-widest outline-none"
              placeholder="•••••••••"
            />
            {errors.routingNumber?.message && (
              <div className="font-medium text-red-500">
                {errors.routingNumber?.message}
              </div>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">
              Account number (12 digits)
            </span>
            <input
              {...register("accountNumber", {
                required: "Account number is required",
              })}
              onInput={(e) => {
                const el = e.target as HTMLInputElement;
                el.value = el.value.replace(/\D/g, "").slice(0, 12);
              }}
              type="password"
              maxLength={12}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 tracking-widest outline-none"
              placeholder="••••••••••••"
            />
            {errors.accountNumber?.message && (
              <div className="font-medium text-red-500">
                {errors.accountNumber?.message}
              </div>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Account type</span>
            <select
              {...register("accountType", {
                required: "Account type is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none"
            >
              <option>{AccountTypeOptions.Checking}</option>
              <option>{AccountTypeOptions.Savings}</option>
            </select>
            {errors.accountType?.message && (
              <div className="font-medium text-red-500">
                {errors.accountType?.message}
              </div>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Tax classification</span>
            <select
              {...register("taxClassification", {
                required: "Tax classification is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none"
            >
              <option>{TaxClassificationOptions.Individual}</option>
              <option>{TaxClassificationOptions.LLC}</option>
              <option>{TaxClassificationOptions.Corporation}</option>
            </select>
            {errors.taxClassification?.message && (
              <div className="font-medium text-red-500">
                {errors.taxClassification?.message}
              </div>
            )}
          </label>

          <label className="mt-1 inline-flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Set as my default payout method
            </span>
          </label>
        </form>

        {/* Policy note */}
        <div className="rounded-xl bg-white/80 backdrop-blur ring-1 ring-slate-200 p-4 text-[12px] text-slate-600">
          By continuing, you agree to the{" "}
          <a className="underline" href="#">
            Payout Terms
          </a>{" "}
          and acknowledge the{" "}
          <a className="underline" href="#">
            Privacy Policy
          </a>
          . We do not store bank credentials; data is encrypted and processed
          securely.
        </div>
      </div>
    </WizardShell>
  );
}
