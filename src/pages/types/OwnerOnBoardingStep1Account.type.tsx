export interface IOwnerOnBoardingStep1Form {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImgUrl?: string;
}

export const OWNER_STEP1_KEY = "onboard.owner.step1";

export const OwnerStep1RightPanel = (
  <div>
    <p className="text-sm text-slate-700 font-medium">What you’ll need</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• A valid email address or mobile number</li>
      <li>• Your restaurant business information (next step)</li>
      <li>• Your restaurant business hours (later)</li>
      <li>• Your restaurant business menus (optional)</li>
    </ul>
    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Tip: You can add multiple addresses and switch during checkout.
    </div>
  </div>
);
