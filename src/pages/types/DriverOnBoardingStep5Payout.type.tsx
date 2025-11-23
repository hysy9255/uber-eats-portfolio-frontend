import type {
  AccountTypeOptions,
  TaxClassificationOptions,
} from "./constant.enums.type";

export interface IDriverOnBoardingStep5Form {
  fullName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: AccountTypeOptions;
  taxClassification: TaxClassificationOptions;
}

export const DRIVER_STEP5_KEY = "onboard.driver.step5";

export const DriverStep5RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">Payout tips</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• Name must match your bank account</li>
      <li>• Double-check routing and account numbers</li>
      <li>• You can change this later in Settings</li>
    </ul>
    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Some banks may take 1–2 business days to appear after verification.
    </div>
  </div>
);
