import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearDraft, loadDraft } from "../../../utils/localDraft";
import {
  commonAccountOnBoardStep1DefaultValues,
  driverOnBoardStep2DefaultValues,
  driverOnBoardStep3DefaultValues,
  driverOnBoardStep4DefaultValues,
  driverOnBoardStep5DefaultValues,
} from "../../../constants/DefaultValues";
import { UserRole } from "../../../constants/UserRoleEnum";
import WizardShell from "../../../components/Shells/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../../../constants/CreateDriverPageSteps";
import SuccessDialog from "../../../components/PopUps/SuccessPopup";
import { registerDriver } from "../../../api/registrationApi";
import {
  STEP1_KEY,
  type OnBoardingStep1Form,
} from "../../../formDataTypes/onBoarding/onBoardingStep1Form.type";
import {
  DRIVER_STEP2_KEY,
  DRIVER_STEP3_KEY,
  DRIVER_STEP4_KEY,
  DRIVER_STEP5_KEY,
  type DriverOnBoardingStep2Form,
  type DriverOnBoardingStep3Form,
  type DriverOnBoardingStep4Form,
  type DriverOnBoardingStep5Form,
} from "../../../formDataTypes/onBoarding/driverOnBoardingForms.type";
import type { RegisterDriverForm } from "../../../formDataTypes/register/registerDriverForm.type";

export default function DriverOnboardingReview() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const step1 = loadDraft<OnBoardingStep1Form>(
    STEP1_KEY,
    commonAccountOnBoardStep1DefaultValues
  );

  const step2 = loadDraft<DriverOnBoardingStep2Form>(
    DRIVER_STEP2_KEY,
    driverOnBoardStep2DefaultValues
  );

  const step3 = loadDraft<DriverOnBoardingStep3Form>(
    DRIVER_STEP3_KEY,
    driverOnBoardStep3DefaultValues
  );

  const step4 = loadDraft<DriverOnBoardingStep4Form>(
    DRIVER_STEP4_KEY,
    driverOnBoardStep4DefaultValues
  );

  const step5 = loadDraft<DriverOnBoardingStep5Form>(
    DRIVER_STEP5_KEY,
    driverOnBoardStep5DefaultValues
  );

  const onBack = () => navigate("/driver-on-board-step-5");

  const handleCreateDriverSubmit = async (data: RegisterDriverForm) => {
    try {
      await registerDriver({
        ...data,
      });
      clearDraft(STEP1_KEY);
      clearDraft(DRIVER_STEP2_KEY);
      clearDraft(DRIVER_STEP3_KEY);
      clearDraft(DRIVER_STEP4_KEY);
      clearDraft(DRIVER_STEP5_KEY);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const onContinue = () => {
    handleCreateDriverSubmit({
      user: {
        profileImgUrl: step1.profileImgUrl,
        firstName: step1.firstName,
        lastName: step1.lastName,
        phoneNumber: step1.phoneNumber,
        email: step1.email,
        password: step1.password,
        role: UserRole.Driver,
      },
      vehicleInfo: {
        ...step2,
      },
      documents: {
        license: step3.licenseImgUrl,
        insurance: step3.insuranceImgUrl,
        additionalNotes:
          step3.additionalNotes === "" ? null : step3.additionalNotes,
      },
    });
  };

  return (
    <WizardShell
      continueLabel="Create account"
      onContinue={onContinue}
      onBack={onBack}
      title="Review and confirm"
      subtitle="Make sure everything looks good before you publish your store."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={5}
      right={
        <div>
          <p className="text-sm font-medium text-slate-700">After submission</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• We’ll verify your details (may take 1–2 business days)</li>
            <li>• You can edit most fields later in Settings</li>
            <li>• You’ll get notified when your store is live</li>
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[12px] text-slate-600">
            Turn on notifications to receive status updates in real time.
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Account summary */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Account</h3>
            <button
              type="button"
              onClick={() => navigate("/driver-on-board-step-1")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="text-slate-900">
                {step1.firstName} {step1.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Role</dt>
              <dd className="text-slate-900">Driver</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="text-slate-900">{step1.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone number</dt>
              <dd className="text-slate-900">{step1.phoneNumber}</dd>
            </div>
          </dl>
        </section>
        {/* Vehicle */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Vehicle</h3>
            <button
              type="button"
              onClick={() => navigate("/driver-on-board-step-2")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Vehicle Type</dt>
              <dd className="text-slate-900">{step2.vehicleType || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Model</dt>
              <dd className="text-slate-900">{step2.model || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Year</dt>
              <dd className="text-slate-900">{step2.year || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Color</dt>
              <dd className="text-slate-900">{step2.color || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">License plate</dt>
              <dd className="text-slate-900">{step2.licensePlate || "—"}</dd>
            </div>
          </dl>
        </section>

        {/* Doc */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Documents</h3>
            <button
              type="button"
              onClick={() => navigate("/driver-on-board-step-3")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="md:col-span-1">
              <dt className="text-slate-500">License</dt>
              <img
                src={step3.licenseImgUrl}
                alt="preview"
                className="w-80 h-50 object-cover rounded-xl"
              />
            </div>
            <div className="md:col-span-1">
              <dt className="text-slate-500">Insurance</dt>
              <img
                src={step3.insuranceImgUrl}
                alt="preview"
                className="w-80 h-50 object-cover rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Background</h3>
            <button
              type="button"
              onClick={() => navigate("/driver-on-board-step-4")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Legal full name</dt>
              <dd className="text-slate-900">{step4.legalFullName || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Last 4 SSN</dt>
              <dd className="text-slate-900">
                {step4.last4SSN ? step4.last4SSN.replace(/./g, "•") : "—"}
              </dd>
            </div>
          </dl>
        </section>

        {/* Payout */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Payout</h3>
            <button
              type="button"
              onClick={() => navigate("/driver-on-board-step-5")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Name on the account</dt>
              <dd className="text-slate-900">{step5.fullName || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Routing number</dt>
              <dd className="text-slate-900">
                {step5.routingNumber
                  ? step5.routingNumber.replace(/./g, "•")
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Account number</dt>
              <dd className="text-slate-900">
                {step5.accountNumber
                  ? step5.accountNumber.replace(/./g, "•")
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Account type</dt>
              <dd className="text-slate-900">{step5.accountType || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Tax classification</dt>
              <dd className="text-slate-900">
                {step5.taxClassification || "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
      <SuccessDialog
        open={showSuccess}
        message="Your account was created successfully. Please log in to continue."
        onConfirm={() => navigate("/login", { replace: true })}
      />
    </WizardShell>
  );
}
