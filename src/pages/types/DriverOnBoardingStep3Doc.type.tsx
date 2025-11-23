export interface IDriverOnBoardingStep3Form {
  licenseImgUrl: string;
  insuranceImgUrl: string;
  additionalNotes?: string;
}

export const DRIVER_STEP3_KEY = "onboard.driver.step3";

export const DriverStep3RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">Document checklist</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• Driver’s license (front & back)</li>
      <li>• Proof of insurance</li>
      <li>• Vehicle registration (if required)</li>
    </ul>
    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Accepted formats: JPG, PNG, PDF · Max 10MB each
    </div>
  </div>
);
