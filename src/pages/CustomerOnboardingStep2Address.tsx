import WizardShell from "../components/Shells/WizardShell";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/localDraft";
import { CREATE_CUSTOMER_PAGE_STEPS } from "../constants/CreateCustomerPageSteps";
import {
  CUSTOMER_STEP2_KEY,
  CustomerStep2RightPanel,
  type ICustomerOnBoardingStep2Form,
} from "./types/CustomerOnBoardingStep2Address.type";
import { customerOnBoardStep2DefaultValues } from "../constants/DefaultValues";
import { customInputCss } from "../constants/CustomInputCss";

export default function CustomerOnboardingAddress() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<ICustomerOnBoardingStep2Form>(
    CUSTOMER_STEP2_KEY,
    customerOnBoardStep2DefaultValues
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomerOnBoardingStep2Form>({
    mode: "onChange",
    defaultValues,
  });

  const onContinue = (data: ICustomerOnBoardingStep2Form) => {
    saveDraft(CUSTOMER_STEP2_KEY, data);
    navigate("/customer-on-board-step-3");
  };

  const onBack = () => {
    navigate("/customer-on-board-step-1");
  };

  return (
    <WizardShell
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Add your delivery address"
      subtitle="We’ll use this to find restaurants that deliver to you."
      steps={CREATE_CUSTOMER_PAGE_STEPS}
      active={1}
      right={CustomerStep2RightPanel}
    >
      <form onSubmit={handleSubmit(onContinue)} className="space-y-6">
        {/* Manual fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Street address</span>
            <input
              {...register("streetAddress", {
                required: "Street address is required",
              })}
              className={customInputCss}
              placeholder="123 Main St"
            />
            {errors.streetAddress?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.streetAddress?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">Apt / Unit</span>
            <input
              {...register("apt", {
                required: "Apt or unit is required",
              })}
              className={customInputCss}
              placeholder="Apt 5B"
            />
            {errors.apt?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.apt?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">City</span>
            <input
              {...register("city", {
                required: "City is required",
              })}
              className={customInputCss}
              placeholder="San Francisco"
            />
            {errors.city?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.city?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">State</span>
            <input
              {...register("state", {
                required: "State is required",
              })}
              className={customInputCss}
              placeholder="CA"
            />
            {errors.state?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.state?.message}
              </span>
            )}
          </label>
          <label>
            <span className="text-sm font-medium">ZIP</span>
            <input
              {...register("zip", {
                required: "Zip code is required",
              })}
              className={customInputCss}
              placeholder="94103"
            />
            {errors.zip?.message && (
              <span className="font-medium text-red-500 text-sm">
                {errors.zip?.message}
              </span>
            )}
          </label>
        </div>

        {/* Notes & options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2"></label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Set as default address
            </span>
          </label>
        </div>
      </form>
    </WizardShell>
  );
}
