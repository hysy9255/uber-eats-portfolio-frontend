export interface IOwnerOnBoardingStep2Form {
  logoImgUrl: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website: string;
  instagram: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
}

export const OWNER_STEP2_KEY = "onboard.owner.step2";

export const OwnerStep2RightPanel = (
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
