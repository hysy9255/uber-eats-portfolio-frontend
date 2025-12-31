import { useState } from "react";
import WizardShell from "../components/Shells/WizardShell";
import { Link, useNavigate } from "react-router-dom";

import { loadDraft } from "../utils/localDraft";
import SuccessDialog from "../components/SuccessPopup";
import { CREATE_CUSTOMER_PAGE_STEPS } from "../constants/CreateCustomerPageSteps";
import // type ICustomerOnBoardingStep1Form,
"./types/CustomerOnBoardingStep1Account.type";
import {
  CUSTOMER_STEP2_KEY,
  type ICustomerOnBoardingStep2Form,
} from "./types/CustomerOnBoardingStep2Address.type";
import {
  CustomerStep3RightPanel,
  type ICreateCustomer,
} from "./types/CustomerOnBoardingStep3Review.type";
import {
  STEP1_KEY,
  type IOnBoardingStep1Form,
} from "./types/OnBoardingStep1Account.type";
import {
  commonAccountOnBoardStep1DefaultValues,
  customerOnBoardStep2DefaultValues,
} from "../constants/DefaultValues";
import { UserRole } from "../constants/UserRoleEnum";
import { createCustomer } from "../api/userApi";

export default function CustomerOnboardingReview() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateCustomertSubmit = async (data: ICreateCustomer) => {
    try {
      await createCustomer(data);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const onContinue = () => {
    handleCreateCustomertSubmit({
      email: account.email,
      password: account.password,
      role: UserRole.Client,
      firstName: account.firstName,
      lastName: account.lastName,
      phoneNumber: account.phoneNumber,
      deliveryAddress: `${deliveryAddress.streetAddress}, ${deliveryAddress.apt}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zip}`,
      profileImgUrl:
        account.profileImgUrl === "" ? null : account.profileImgUrl,
    });
  };

  const onBack = () => {
    navigate("/customer-on-board-step-2");
  };

  const account = loadDraft<IOnBoardingStep1Form>(
    STEP1_KEY,
    commonAccountOnBoardStep1DefaultValues
  );

  const deliveryAddress = loadDraft<ICustomerOnBoardingStep2Form>(
    CUSTOMER_STEP2_KEY,
    customerOnBoardStep2DefaultValues
  );

  return (
    <WizardShell
      continueLabel="Create account"
      onContinue={onContinue}
      onBack={onBack}
      title="Review and confirm"
      subtitle="Make sure everything looks good before you finish."
      steps={CREATE_CUSTOMER_PAGE_STEPS}
      active={3}
      right={CustomerStep3RightPanel}
    >
      <div className="space-y-6">
        {/* Account summary */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Account</h3>
            <Link to={"/customer-on-board-step-1"}>
              <button
                type="button"
                className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
              >
                Edit
              </button>
            </Link>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">First name</dt>
              <dd className="text-slate-900">{account.firstName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Last name</dt>
              <dd className="text-slate-900">{account.lastName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone number</dt>
              <dd className="text-slate-900">{account.phoneNumber}</dd>
            </div>
          </dl>
        </section>

        {/* Address summary */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Delivery address</h3>
            <Link to={"/customer-on-board-step-2"}>
              <button
                type="button"
                className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
              >
                Edit
              </button>
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-900">
            {/* 123 Main St, Apt 5B, San Francisco, CA 94103 */}
            {deliveryAddress.streetAddress}, {deliveryAddress.apt},{" "}
            {deliveryAddress.city}, {deliveryAddress.state}{" "}
            {deliveryAddress.zip}
          </p>
        </section>

        {/* Agreements */}
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
    </WizardShell>
  );
}
