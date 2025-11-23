import React from "react";
import { useFormContext } from "react-hook-form";
import type { IDriverOnBoardingStep2Form } from "../pages/DriverOnboardingStep2Vehicle";

interface VehicleTypeSelectorProps {
  vehicleType: string;
  setVehicleType: (type: string) => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  vehicleType,
  setVehicleType,
}) => {
  const { register, setValue } = useFormContext<IDriverOnBoardingStep2Form>();

  const handleOnClick = (type: string) => {
    setVehicleType(type);
    setValue("vehicleType", type);
  };
  return (
    <div className="mt-2 inline-flex rounded-full ring-1 ring-slate-300 bg-white p-1 text-sm">
      <input {...register("vehicleType")} className="hidden"></input>
      <button
        type="button"
        // onClick={() => setVehicleType("car")}
        onClick={() => handleOnClick("car")}
        className={`px-3 py-1.5 rounded-full  ${
          vehicleType === "car"
            ? "bg-black text-white"
            : "text-slate-700 hover:bg-slate-100"
        } `}
      >
        Car
      </button>
      <button
        type="button"
        // onClick={() => setVehicleType("bike")}
        onClick={() => handleOnClick("bike")}
        className={`px-3 py-1.5 rounded-full  ${
          vehicleType === "bike"
            ? "bg-black text-white"
            : "text-slate-700 hover:bg-slate-100"
        } `}
      >
        Bike
      </button>
      <button
        type="button"
        // onClick={() => setVehicleType("scooter")}
        onClick={() => handleOnClick("scooter")}
        className={`px-3 py-1.5 rounded-full  ${
          vehicleType === "scooter"
            ? "bg-black text-white"
            : "text-slate-700 hover:bg-slate-100"
        } `}
      >
        Scooter
      </button>
    </div>
  );
};

export default VehicleTypeSelector;
