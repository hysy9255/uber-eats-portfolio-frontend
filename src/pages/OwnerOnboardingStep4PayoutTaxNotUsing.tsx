import React from "react";
import WizardShell from "../components/WizardShell";

export default function OwnerOnboardingPayoutTax() {
  return (
    <WizardShell
      continueTo="/owner-on-board-step-5"
      backTo="/owner-on-board-step-3"
      title="Set up payouts & tax"
      subtitle="Add your business banking and tax details."
      steps={["Business", "Location & Hours", "Menu Setup", "Review"]}
      active={3}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">Notes</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Name must match your bank/account registration</li>
            <li>• We do not store bank credentials; data is tokenized</li>
            <li>• You can change payout schedule later</li>
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
            For faster onboarding, use Stripe/Adyen Connect if available in your
            region.
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Connect buttons (UI only) */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full ring-1 ring-slate-300 px-3 py-2 text-sm bg-white hover:bg-slate-50">
            Connect with Stripe
          </button>
          <button className="rounded-full ring-1 ring-slate-300 px-3 py-2 text-sm bg-white hover:bg-slate-50">
            Connect with PayPal
          </button>
        </div>

        {/* Business bank details */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Business account name</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Tuxedo Dining LLC"
            />
          </label>
          <label>
            <span className="text-sm font-medium">Routing number</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 tracking-widest outline-none"
              placeholder="•••••••••"
            />
          </label>
          <label>
            <span className="text-sm font-medium">Account number</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 tracking-widest outline-none"
              placeholder="••••••••••••"
            />
          </label>
          <label>
            <span className="text-sm font-medium">Account type</span>
            <select className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none">
              <option>Checking</option>
              <option>Savings</option>
            </select>
          </label>
          <label>
            <span className="text-sm font-medium">Payout schedule</span>
            <select className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
            </select>
          </label>
        </form>

        {/* Tax */}
        <div className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <h3 className="text-lg font-semibold">Tax information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label>
              <span className="text-sm font-medium">Tax classification</span>
              <select className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 text-slate-600 outline-none">
                <option>LLC</option>
                <option>Corporation</option>
                <option>Sole proprietorship</option>
              </select>
            </label>
            <label>
              <span className="text-sm font-medium">EIN / Tax ID</span>
              <input
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 tracking-widest outline-none"
                placeholder="••-•••••••"
              />
            </label>
            <label>
              <span className="text-sm font-medium">Country</span>
              <input
                className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
                placeholder="United States"
              />
            </label>
          </div>
          <label className="mt-4 inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              I certify that the information provided is accurate for tax
              purposes.
            </span>
          </label>
        </div>

        {/* Policy note */}
        <div className="rounded-xl bg-white/80 backdrop-blur ring-1 ring-slate-200 p-4 text-[12px] text-slate-600">
          By continuing, you agree to the{" "}
          <a className="underline" href="#">
            Payout Terms
          </a>{" "}
          and acknowledge the{" "}
          <a className="underline" href="#">
            Privacy Policy
          </a>
          . Banking details are encrypted and tokenized via our payments
          provider.
        </div>
      </div>
    </WizardShell>
  );
}
