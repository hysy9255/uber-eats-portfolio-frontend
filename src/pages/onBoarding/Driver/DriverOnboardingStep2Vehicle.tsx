import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loadDraft, saveDraft } from "../../../utils/localDraft";
import WizardShell from "../../../components/Shells/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../../../constants/CreateDriverPageSteps";
import VehicleTypeSelector from "../../../components/VehicleTypeSelector";
import { DriverStep2RightPanel } from "../../../components/Panels/DriverRegistrationPanels";
import { driverOnBoardStep2DefaultValues } from "../../../constants/DefaultValues";
import {
  DRIVER_STEP2_KEY,
  type DriverOnBoardingStep2Form,
} from "../../../formDataTypes/onBoarding/driverOnBoardingForms.type";

export default function DriverOnboardingVehicle() {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/driver-on-board-step-1");
  };

  const [vehicleType, setVehicleType] = useState("car");

  const defaultValues = loadDraft<DriverOnBoardingStep2Form>(
    DRIVER_STEP2_KEY,
    driverOnBoardStep2DefaultValues
  );

  const methods = useForm<DriverOnBoardingStep2Form>({
    mode: "onChange",
    defaultValues,
  });

  const onContinue = (data: DriverOnBoardingStep2Form) => {
    saveDraft(DRIVER_STEP2_KEY, data);
    navigate("/driver-on-board-step-3");
  };

  return (
    <WizardShell
      onContinue={methods.handleSubmit(onContinue)}
      onBack={onBack}
      title="Add your vehicle"
      subtitle="Choose how you plan to deliver and enter your vehicle details."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={1}
      right={DriverStep2RightPanel}
    >
      <FormProvider {...methods}>
        <form className="space-y-6">
          <div>
            <div className="text-sm font-medium">Vehicle type</div>
            <VehicleTypeSelector
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Make & model</span>
              <input
                {...methods.register("model", {
                  required: "Vehicle model is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="Toyota Prius"
              />
              {methods.formState.errors.model?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.model?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">Year</span>
              <input
                {...methods.register("year", {
                  required: "Vehicle year is required",
                  min: { value: 1980, message: "Year must be 1980 or newer" },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Year can't be in the future",
                  },
                })}
                type="number"
                inputMode="numeric"
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="2020"
              />
              {methods.formState.errors.year?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.year?.message}
                </span>
              )}
            </label>
            <label>
              <span className="text-sm font-medium">Color</span>
              <input
                {...methods.register("color", {
                  required: "Vehicle color is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="Blue"
              />
              {methods.formState.errors.color?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.color?.message}
                </span>
              )}
            </label>
            <label className="md:col-span-2">
              <span className="text-sm font-medium">License plate</span>
              <input
                {...methods.register("licensePlate", {
                  required: "License plate is required",
                })}
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 uppercase tracking-wide outline-none"
                placeholder="7ABC123"
              />
              {methods.formState.errors.licensePlate?.message && (
                <span className="font-medium text-red-500">
                  {methods.formState.errors.licensePlate?.message}
                </span>
              )}
            </label>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">
                Commercial insurance
              </span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">
                I use this vehicle exclusively for deliveries
              </span>
            </label>
          </div>
        </form>
      </FormProvider>
    </WizardShell>
  );
}
