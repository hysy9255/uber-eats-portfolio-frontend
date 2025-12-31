// OwnerOnboardingLocation.tsx (UI-only)
import React from "react";
import WizardShell from "../components/Shells/WizardShell";

export default function OwnerOnboardingLocation() {
  return (
    <WizardShell
      title="Set up your location & hours"
      subtitle="Customers will see this information on your store page."
      steps={[
        "Business",
        "Location & Hours",
        "Menu Setup",
        "Payout & Tax",
        "Review",
      ]}
      active={1}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">Tips</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Use your main storefront address</li>
            <li>• Add delivery instructions if needed</li>
            <li>• Keep hours accurate to avoid cancellations</li>
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
            You can add multiple locations later from Settings.
          </div>
        </div>
      }
    >
      <form className="space-y-6">
        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Street address</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="123 Main St"
            />
          </label>
          <label>
            <span className="text-sm font-medium">Suite / Unit</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Apt 5B"
            />
          </label>
          <label>
            <span className="text-sm font-medium">City</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="San Francisco"
            />
          </label>
          <label>
            <span className="text-sm font-medium">State</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="CA"
            />
          </label>
          <label>
            <span className="text-sm font-medium">ZIP</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="94103"
            />
          </label>
        </div>

        {/* Hours (simple grid UI) */}
        <div>
          <div className="text-sm font-medium">Hours</div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <React.Fragment key={d}>
                <div className="md:col-span-1 text-slate-600">{d}</div>
                <input
                  className="md:col-span-3 h-10 rounded-xl ring-1 ring-slate-300 px-3"
                  placeholder="10:00 AM"
                />
                <input
                  className="md:col-span-3 h-10 rounded-xl ring-1 ring-slate-300 px-3"
                  placeholder="9:00 PM"
                />
              </React.Fragment>
            ))}
          </div>
          <label className="mt-3 inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Closed on public holidays
            </span>
          </label>
        </div>
      </form>
    </WizardShell>
  );
}
