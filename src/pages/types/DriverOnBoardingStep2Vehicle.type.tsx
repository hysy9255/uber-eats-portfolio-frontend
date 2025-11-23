export interface IDriverOnBoardingStep2Form {
  vehicleType: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
}

export const DRIVER_STEP2_KEY = "onboard.driver.step2";

export const DriverStep2RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">Requirements</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• Valid vehicle registration (if required)</li>
      <li>• Insurance that meets local regulations</li>
      <li>• Up-to-date vehicle details</li>
    </ul>
    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      You can switch to bike/scooter later if available in your city.
    </div>
  </div>
);
