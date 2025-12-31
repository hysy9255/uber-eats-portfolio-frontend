import React from "react";
import WizardShell from "../components/Shells/WizardShell";

export default function CustomerOnboardingStep3Payment() {
  return (
    <WizardShell
      continueTo="/customer-on-board-step-4"
      backTo="/customer-on-board-step-2"
      title="Add a payment method"
      subtitle="Your details are encrypted and stored securely."
      steps={["Account", "Address", "Payment", "Review"]}
      active={2}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">Security</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• PCI DSS compliant processing</li>
            <li>• Card numbers are never stored on our servers</li>
            <li>• Manage payment methods anytime</li>
          </ul>

          <div className="mt-5 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
            Tip: Set a default card to speed up checkout.
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Express pay (UI only) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full ring-1 ring-slate-300 px-3 py-2 text-sm bg-white hover:bg-slate-50"
          >
            <span className="text-lg"></span> Pay
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full ring-1 ring-slate-300 px-3 py-2 text-sm bg-white hover:bg-slate-50"
          >
            <span className="text-lg">G</span> Pay
          </button>
        </div>

        {/* Card form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Cardholder name</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="Jane Doe"
            />
          </label>

          <label className="md:col-span-2">
            <span className="text-sm font-medium">Card number</span>
            <div className="mt-1 flex h-11 items-center gap-2 rounded-xl ring-1 ring-slate-300 px-3">
              <svg
                className="h-5 w-5 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M2 11h20" />
              </svg>
              <input
                className="flex-1 bg-transparent outline-none"
                placeholder="1234 1234 1234 1234"
              />
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <span>VISA</span>•<span>MC</span>•<span>AMEX</span>
              </div>
            </div>
          </label>

          <label>
            <span className="text-sm font-medium">Expiry</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="MM / YY"
            />
          </label>
          <label>
            <span className="text-sm font-medium">CVC</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="●●●"
            />
          </label>
          <label>
            <span className="text-sm font-medium">ZIP / Postal code</span>
            <input
              className="mt-1 h-11 w-full rounded-xl ring-1 ring-slate-300 px-3 outline-none"
              placeholder="94103"
            />
          </label>
          <div className="md:col-span-1" />

          <label className="mt-1 inline-flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Save this card for future orders
            </span>
          </label>
          <label className="inline-flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              Set as default payment method
            </span>
          </label>
        </form>
      </div>
    </WizardShell>
  );
}
