import WizardShell from "../components/WizardShell";
import { useForm, FormProvider } from "react-hook-form";
import { DayHoursRow } from "../components/DayHoursRow";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/localDraft";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import {
  DAYS,
  defaultHours,
  OWNER_STEP3_KEY,
  type IOwnerOnBoardingStep3Form,
} from "./types/OwnerOnBoardingStep3Location.type";
import { OrderTypeOptions, PrepTimeOptions } from "./types/constant.enums.type";

export default function OwnerOnboardingLocation() {
  const navigate = useNavigate();

  const defaultValues = loadDraft<IOwnerOnBoardingStep3Form>(OWNER_STEP3_KEY, {
    streetAddress: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    hours: defaultHours,
    deliveryRadius: "5",
    prepTime: PrepTimeOptions.tenToFifteen,
    orderType: OrderTypeOptions.deliveryAndPickup,
  });

  const methods = useForm<IOwnerOnBoardingStep3Form>({
    mode: "onChange",
    defaultValues,
  });

  const onContinue = (data: IOwnerOnBoardingStep3Form) => {
    saveDraft(OWNER_STEP3_KEY, data);
    navigate("/owner-on-board-step-4");
  };

  const onBack = () => {
    navigate("/owner-on-board-step-2");
  };

  return (
    <WizardShell
      onContinue={methods.handleSubmit(onContinue)}
      onBack={onBack}
      title="Set up your location & hours"
      subtitle="Customers will see this on your store page."
      steps={CREATE_OWNER_PAGE_STEPS}
      active={2}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">Tips</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Use your main storefront address</li>
            <li>• Add delivery instructions if needed</li>
            <li>• Keep hours accurate to avoid cancellations</li>
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
            You can add multiple locations later from Settings.
          </div>
        </div>
      }
    >
      <FormProvider {...methods}>
        <form className="space-y-6">
          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Street address</span>
              <input
                {...methods.register("streetAddress", {
                  required: "Street address is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="123 Main St"
              />
              {methods.formState.errors.streetAddress?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.streetAddress?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">Suite / Unit</span>
              <input
                {...methods.register("unit", {
                  required: "Suite or unit is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="Suite 2"
              />
              {methods.formState.errors.unit?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.unit?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">City</span>
              <input
                {...methods.register("city", {
                  required: "City is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="New York"
              />
              {methods.formState.errors.city?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.city?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">State</span>
              <input
                {...methods.register("state", {
                  required: "State is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="NY"
              />
              {methods.formState.errors.state?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.state?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">ZIP</span>
              <input
                {...methods.register("zip", {
                  required: "Zip code is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="10002"
              />
              {methods.formState.errors.zip?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.zip?.message}
                </span>
              )}
            </label>
          </div>

          {/* Hours */}
          <div>
            <div className="text-sm font-medium">Hours</div>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center text-sm">
              {DAYS.map((day) => (
                <DayHoursRow key={day} day={day} />
              ))}
            </div>
          </div>

          {/* Delivery radius (UI only) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label>
              <span className="text-sm font-medium">Delivery radius (km)</span>
              <input
                {...methods.register("deliveryRadius", {
                  required: "Delivery radius is required",
                  min: { value: 1, message: "Must be at least 1 km" },
                })}
                type="number"
                min={1}
                step={1}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="5"
              />
              {methods.formState.errors.deliveryRadius?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.deliveryRadius?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">Prep time (avg)</span>
              <select
                {...methods.register("prepTime", {
                  required: "Prep time is required",
                  // validate: (v) => v !== "" || "Select a prep time",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none"
              >
                <option>{PrepTimeOptions.tenToFifteen}</option>
                <option>{PrepTimeOptions.fifteenToTwenty}</option>
                <option>{PrepTimeOptions.twentyToThirty}</option>
              </select>
              {methods.formState.errors.prepTime?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.prepTime?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">Order type</span>
              <select
                {...methods.register("orderType", {
                  required: "Order type is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none"
              >
                <option>{OrderTypeOptions.deliveryAndPickup}</option>
                <option>{OrderTypeOptions.deliveryOnly}</option>
                <option>{OrderTypeOptions.pickupOnly}</option>
              </select>
              {methods.formState.errors.orderType?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.orderType?.message}
                </span>
              )}
            </label>
          </div>
        </form>
      </FormProvider>
    </WizardShell>
  );
}
