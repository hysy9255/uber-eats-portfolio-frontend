import WizardShell from "../components/Shells/WizardShell";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/localDraft";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import {
  DAYS,
  OWNER_STEP3_KEY,
  type Day,
  type IOwnerOnBoardingStep3Form,
} from "./types/OwnerOnBoardingStep3Location.type";
import { OrderTypeOptions, PrepTimeOptions } from "./types/constant.enums.type";
import { OperatingHoursSetupProvider } from "../ReactContext/operatingHoursSetup/OperatingHoursSetupProvider";
import { useEffect } from "react";
import Dropdown2 from "../components/Dropdowns/Dropdown2";
import { customInputCss } from "../constants/CustomInputCss";
import { ownerOnboardStep3DefaultValues } from "../constants/DefaultValues";
import DayHoursRow7 from "../components/Rows/DayHoursRow7";

const OwnerOnBoardingLocation = () => {
  const navigate = useNavigate();

  const defaultValues = loadDraft<IOwnerOnBoardingStep3Form>(
    OWNER_STEP3_KEY,
    ownerOnboardStep3DefaultValues
  );

  const methods = useForm<IOwnerOnBoardingStep3Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const onContinue = (data: IOwnerOnBoardingStep3Form) => {
    saveDraft(OWNER_STEP3_KEY, data);
    navigate("/owner-on-board-step-4");
  };

  const onBack = () => {
    navigate("/owner-on-board-step-2");
  };

  useEffect(() => {
    methods.register("hours", {
      validate: (hours) => {
        for (const day of Object.keys(hours) as Day[]) {
          const h = hours[day];

          if (h.closed || h.open24) continue;

          if (!h.open || !h.close)
            return "Please set opening and closing hours";
        }
        return true;
      },
    });
  }, [methods]);

  const [prepTime, orderType] = useWatch({
    control: methods.control,
    name: ["prepTime", "orderType"],
  });

  const setPrepTime = (prepTimeOption: PrepTimeOptions) => {
    methods.setValue("prepTime", prepTimeOption);
  };

  const setOrderType = (orderTypeOption: OrderTypeOptions) => {
    methods.setValue("orderType", orderTypeOption);
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
                className={customInputCss}
                placeholder="123 Main St"
              />
              {methods.formState.errors.streetAddress?.message && (
                <span className="font-medium text-red-500 text-sm">
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
                className={customInputCss}
                placeholder="Suite 2"
              />
              {methods.formState.errors.unit?.message && (
                <span className="font-medium text-red-500 text-sm">
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
                className={customInputCss}
                placeholder="New York"
              />
              {methods.formState.errors.city?.message && (
                <span className="font-medium text-red-500 text-sm">
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
                className={customInputCss}
                placeholder="NY"
              />
              {methods.formState.errors.state?.message && (
                <span className="font-medium text-red-500 text-sm">
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
                className={customInputCss}
                placeholder="10002"
              />
              {methods.formState.errors.zip?.message && (
                <span className="font-medium text-red-500 text-sm">
                  {methods.formState.errors.zip?.message}
                </span>
              )}
            </label>
          </div>

          {/* Hours */}
          <div className="">
            <div className="text-sm font-medium pb-3">Hours</div>
            <OperatingHoursSetupProvider>
              <div className="space-y-2">
                {DAYS.map((day) => (
                  <DayHoursRow7 key={day} day={day} />
                ))}
              </div>
            </OperatingHoursSetupProvider>
            {methods.formState.errors.hours?.message && (
              <span className="font-medium text-red-500 text-sm">
                {methods.formState.errors.hours.message}
              </span>
            )}
          </div>

          {/* Delivery radius (UI only) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <span className="text-sm font-medium">Delivery radius (km)</span>
              <input
                {...methods.register("deliveryRadius", {
                  required: "Delivery radius is required",
                  min: { value: 1, message: "Must be at least 1 km" },
                })}
                type="number"
                min={1}
                step={1}
                className={customInputCss}
                placeholder="5"
              />
              {methods.formState.errors.deliveryRadius?.message && (
                <span className="font-medium text-red-500 text-sm">
                  {methods.formState.errors.deliveryRadius?.message}
                </span>
              )}
            </div>
            <div>
              <span className="text-sm font-medium">Prep time (avg)</span>
              <Dropdown2
                options={[
                  PrepTimeOptions.tenToFifteen,
                  PrepTimeOptions.fifteenToTwenty,
                  PrepTimeOptions.twentyToThirty,
                ]}
                option={prepTime}
                setOption={setPrepTime}
              />
            </div>
            <div>
              <span className="text-sm font-medium">Order type</span>
              <Dropdown2
                options={[
                  OrderTypeOptions.deliveryAndPickup,
                  OrderTypeOptions.deliveryOnly,
                  OrderTypeOptions.pickupOnly,
                ]}
                option={orderType}
                setOption={setOrderType}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </WizardShell>
  );
};

export default OwnerOnBoardingLocation;
