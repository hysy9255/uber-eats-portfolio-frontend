export const ClientStep1RightPanel = (
  <div>
    <p className="text-sm text-slate-700 font-medium">What you’ll need</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• A valid email address or mobile number</li>
      <li>• Your delivery address (next step)</li>
      <li>• A payment method (later)</li>
    </ul>
    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Tip: You can add multiple addresses and switch during checkout.
    </div>
  </div>
);

export const ClientStep2RightPanel = (
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

export const ClientStep3RightPanel = (
  <div>
    <p className="text-sm font-medium text-slate-700">What happens next</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li>• You can edit these details anytime from your profile</li>
      <li>• We’ll suggest nearby restaurants based on your address</li>
    </ul>
    <div className="mt-5 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
      Tip: Turn on notifications to get order updates in real time.
    </div>
  </div>
);
