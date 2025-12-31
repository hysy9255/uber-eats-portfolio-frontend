export interface ICustomerOnBoardingStep2Form {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
}

export const CUSTOMER_STEP2_KEY = "onboard.customer.step2";

export const CustomerStep2RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">Delivery tips</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• Add a gate code or call box if needed</li>
      <li>• Pin the map as close to your entrance as possible</li>
      <li>• Save a label to switch addresses quickly</li>
    </ul>

    <div className="mt-5">
      <div className="text-sm font-medium text-slate-700">Quick labels</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {["Home", "Work", "Friend’s", "Other"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);
