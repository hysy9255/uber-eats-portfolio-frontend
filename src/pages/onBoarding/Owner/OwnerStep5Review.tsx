import { useNavigate, useOutletContext } from "react-router-dom";
import { formatAddress } from "../../../utils/formatAddress";
import { formatHoursShort } from "../../../utils/formatHoursShort";
import { CREATE_OWNER_PAGE_STEPS } from "../../../constants/CreateOwnerPageSteps";
import SuccessDialog from "../../../components/PopUps/SuccessPopup";
import { useOwnerStep5Review } from "../../../hooks/useOwnerStep5Review";
import type { ClientOnBoardContext } from "../../../components/Layout/ClientOnBoardLayout";
import { OwnerStep5RightPanel } from "../../../components/Panels/OwnerRegistrationPanels";
import { Fragment } from "react/jsx-runtime";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";

const OwnerStep5Review = () => {
  const navigate = useNavigate();
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<ClientOnBoardContext>();

  const { data, onBack, showSuccess, onContinue } = useOwnerStep5Review();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_OWNER_PAGE_STEPS} active={4} />
      <OnBoardHeadline
        title="Review and confirm"
        subtitle="Make sure everything looks good before you finish."
      />
      <OnBoardDescription description={OwnerStep5RightPanel} />
      <div className="mt-8 space-y-6">
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Account</h3>
            <button
              type="button"
              onClick={() => navigate("/on-board/owner/step1")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="text-slate-900">
                {data.step1.firstName} {data.step1.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="text-slate-900">{data.step1.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone number</dt>
              <dd className="text-slate-900">{data.step1.phoneNumber}</dd>
            </div>
          </dl>
        </section>
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Business</h3>
            <button
              type="button"
              onClick={() => navigate("/on-board/owner/step2")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Legal business name</dt>
              <dd className="text-slate-900">{data.step2.lbn || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">DBA</dt>
              <dd className="text-slate-900">{data.step2.dba || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Store phone</dt>
              <dd className="text-slate-900">{data.step2.storePhone || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Business email</dt>
              <dd className="text-slate-900">
                {data.step2.businessEmail || "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Location & Hours</h3>
            <button
              type="button"
              onClick={() => navigate("/on-board/owner/step3")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-900">
            {formatAddress(data.step3)}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {formatHoursShort(data.step3.hours)}
          </p>
          <div className="mt-2 text-[12px] text-slate-500">
            {data.step3.orderType} • Prep: {data.step3.prepTime} • Delivery
            radius: {data.step3.deliveryRadius} km
          </div>
        </section>

        {/* Menu */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              type="button"
              onClick={() => navigate("/on-board/owner/step4")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>

          {data.step4.items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No menu items added (you can publish and add them later).
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-900">
              {data.step4.items.map((it, idx) => (
                <li key={idx}>
                  {it.name} — ${Number(it.price || 0).toFixed(2)}
                  {it.category ? (
                    <span className="text-slate-500"> · {it.category}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-1 text-[12px] text-slate-500">
            Images and categories can be edited after publishing.
          </p>
        </section>

        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <h3 className="text-lg font-semibold">Agreements</h3>
          <div className="mt-3 space-y-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm">
                I agree to the{" "}
                <a className="underline" href="#">
                  Restaurant Terms
                </a>{" "}
                and{" "}
                <a className="underline" href="#">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm">
                I certify that the provided information is accurate and up to
                date.
              </span>
            </label>
          </div>
        </section>
        <SuccessDialog
          open={showSuccess}
          message="Your account was created successfully. Please log in to continue."
          onConfirm={() => navigate("/login", { replace: true })}
        />
      </div>
      <OnBoardStepNavigation
        onBack={onBack}
        onExit={() => setShowConfirm(true)}
        onContinue={onContinue}
        continueLabel="Create account"
      />

      {showConfirm && (
        <LeaveThisStepPopup setShowConfirm={setShowConfirm} onExit={onExit} />
      )}
    </Fragment>
  );
};

export default OwnerStep5Review;
