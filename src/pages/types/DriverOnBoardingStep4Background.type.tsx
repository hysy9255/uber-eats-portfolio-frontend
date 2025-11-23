export interface IDriverOnBoardingStep4Form {
  legalFullName: string;
  last4SSN: string;
}

export const DRIVER_STEP4_KEY = "onboard.driver.step4";


export const DriverStep4RightPanel = (
  <div>
  <p className="text-sm font-medium text-slate-700">What we verify</p>
  <ul className="mt-3 space-y-2 text-sm text-slate-600">
    <li>• Identity and driving record (where applicable)</li>
    <li>• Possible disqualifying offenses per local rules</li>
    <li>• Address history (if required)</li>
  </ul>
  <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
    Your consent is required to proceed. This will not affect your
    credit score.
  </div>
</div>
);
