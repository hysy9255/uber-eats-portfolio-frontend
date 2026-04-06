import { Fragment } from "react";
import OnBoardSteps from "../../../components/OnBoardSteps";
import { CREATE_CLIENT_PAGE_STEPS } from "../../../constants/CreateClientPageSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import { ClientStep3RightPanel } from "../../../components/Panels/ClientRegistrationPanels";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import SuccessDialog from "../../../components/PopUps/SuccessPopup";
import { useNavigate, useOutletContext } from "react-router-dom";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import { useClientStep3Review } from "../../../hooks/useClientStep3Review";
import type { ClientOnBoardContext } from "../../../components/Layout/ClientOnBoardLayout";

const ClientStep3Review = () => {
  const navigate = useNavigate();
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<ClientOnBoardContext>();

  const { onBack, onContinue, data, showSuccess } = useClientStep3Review();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_CLIENT_PAGE_STEPS} active={2} />
      <OnBoardHeadline
        title="Review and confirm"
        subtitle="Make sure everything looks good before you finish."
      />
      <OnBoardDescription description={ClientStep3RightPanel} />
      <div className="mt-8 items-start">
        <div className="space-y-6">
          <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Account</h3>
              <button
                type="button"
                onClick={() => navigate("/on-board/client/step1")}
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
              <h3 className="text-lg font-semibold">Delivery address</h3>
              <button
                type="button"
                onClick={() => navigate("/on-board/client/step2")}
                className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-900">
              {data.step2.streetAddress}, {data.step2.apt}, {data.step2.city},{" "}
              {data.step2.state} {data.step2.zip}
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
                  I agree to Uber Eats’{" "}
                  <a href="/legal/terms" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/legal/privacy" className="underline">
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
                  Send me deals and promotions by email.
                </span>
              </label>
            </div>
          </section>
        </div>
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

export default ClientStep3Review;
