import WizardShell from "../components/WizardShell";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/localDraft";
import { CREATE_CUSTOMER_PAGE_STEPS } from "../constants/CreateCustomerPageSteps";
import {
  CUSTOMER_STEP2_KEY,
  CustomerStep2RightPanel,
  type ICustomerOnBoardingStep2Form,
} from "./types/CustomerOnBoardingStep2Address.type";

export default function CustomerOnboardingAddress() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<ICustomerOnBoardingStep2Form>(
    CUSTOMER_STEP2_KEY,
    {
      streetAddress: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      deliveryNotes: "",
    }
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
        {/* Search / geocode UI (mock) */}
        <div>
          <label className="text-sm font-medium">Find address</label>
          <div className="mt-2 flex h-12 items-center gap-2 rounded-xl ring-1 ring-slate-300 px-3">
            <svg
              className="h-5 w-5 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="flex-1 bg-transparent outline-none"
              placeholder="Search by street, city, or postal code"
            />
            <button
              type="button"
              className="rounded-full bg-black px-3 py-1.5 text-sm font-medium text-white"
            >
              Search
            </button>
          </div>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            Use current location
          </button>
        </div>

        {/* Manual fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Street address</span>
            <input
              {...register("streetAddress", {
                required: "Street address is required",
              })}
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="123 Main St"
            />
            {errors.streetAddress?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Apt 5B"
            />
            {errors.apt?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="San Francisco"
            />
            {errors.city?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="CA"
            />
            {errors.state?.message && (
              <span className="font-medium text-red-500">
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
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="94103"
            />
            {errors.zip?.message && (
              <span className="font-medium text-red-500">
                {errors.zip?.message}
              </span>
            )}
          </label>
        </div>

        {/* Notes & options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">
              Delivery notes (optional)
            </span>
            <textarea
              className="mt-1 w-full rounded-xl ring-1 ring-slate-300 px-3 py-2 outline-none"
              rows={3}
              placeholder="Gate code, building, elevator instructions…"
              {...register("deliveryNotes", {
                // optional field; validate only if provided
                setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                maxLength: { value: 300, message: "Up to 300 characters" },
              })}
            />
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Set as default address
            </span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Leave at door by default
            </span>
          </label>
        </div>
      </form>
    </WizardShell>
  );
}
