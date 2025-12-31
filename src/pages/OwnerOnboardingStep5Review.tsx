import WizardShell from "../components/Shells/WizardShell";
import { useNavigate } from "react-router-dom";
import { clearDraft, loadDraft } from "../utils/localDraft";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import { formatAddress } from "../utils/formatAddress";
import { formatHoursShort } from "../utils/formatHoursShort";
import { useState } from "react";
import SuccessDialog from "../components/SuccessPopup";
import { type IOwnerOnBoardingStep1Form } from "./types/OwnerOnBoardingStep1Account.type";
import type { ICreateOwner } from "./types/OwnerOnBoardingStep5Review.type";
import {
  OWNER_STEP2_KEY,
  type IOwnerOnBoardingStep2Form,
} from "./types/OwnerOnBoardingStep2Business.type";
import {
  OWNER_STEP3_KEY,
  type IOwnerOnBoardingStep3Form,
} from "./types/OwnerOnBoardingStep3Location.type";
import {
  OWNER_STEP4_KEY,
  type IOwnerOnBoardingStep4Form,
} from "./types/OwnerOnBoardingStep4Menu.type";
import {
  commonAccountOnBoardStep1DefaultValues,
  ownerOnboardStep2DefaultValues,
  ownerOnboardStep3DefaultValues,
  ownerOnboardStep4DefaultValues,
} from "../constants/DefaultValues";
import { STEP1_KEY } from "./types/OnBoardingStep1Account.type";
import { UserRole } from "../constants/UserRoleEnum";
import { createOwner } from "../api/userApi";

export default function OwnerOnboardingReview() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const step1 = loadDraft<IOwnerOnBoardingStep1Form>(
    STEP1_KEY,
    commonAccountOnBoardStep1DefaultValues
  );

  const step2 = loadDraft<IOwnerOnBoardingStep2Form>(
    OWNER_STEP2_KEY,
    ownerOnboardStep2DefaultValues
  );

  const step3 = loadDraft<IOwnerOnBoardingStep3Form>(
    OWNER_STEP3_KEY,
    ownerOnboardStep3DefaultValues
  );

  const addressLine = formatAddress(step3);
  const hoursLine = formatHoursShort(step3.hours);

  const step4 = loadDraft<IOwnerOnBoardingStep4Form>(
    OWNER_STEP4_KEY,
    ownerOnboardStep4DefaultValues
  );

  const onBack = () => navigate("/owner-on-board-step-4");

  const handleCreateOwnerSubmit = async (data: ICreateOwner) => {
    try {
      await createOwner(data);
      clearDraft(STEP1_KEY);
      clearDraft(OWNER_STEP2_KEY);
      clearDraft(OWNER_STEP3_KEY);
      clearDraft(OWNER_STEP4_KEY);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const onContinue = () => {
    handleCreateOwnerSubmit({
      userInfo: {
        profileImgUrl: step1.profileImgUrl === "" ? null : step1.profileImgUrl,
        name: `${step1.firstName} ${step1.lastName}`,
        phoneNumber: step1.phoneNumber,
        email: step1.email,
        password: step1.password,
        role: UserRole.Owner,
      },
      business: {
        logo: step2.logoImgUrl === "" ? null : step2.logoImgUrl,
        lbn: step2.lbn,
        dba: step2.dba,
        cuisineType: step2.cuisineType,
        storePhone: step2.storePhone,
        businessEmail: step2.businessEmail,
        website: step2.website,
        instagram: step2.instagram,
        mainImgUrl: step2.mainImgUrl,
        sub1ImgUrl: step2.sub1ImgUrl,
        sub2ImgUrl: step2.sub2ImgUrl,
        bannerImgUrl: step2.bannerImgUrl,
      },
      locationAndHours: {
        streetAddress: step3.streetAddress,
        unit: step3.unit,
        city: step3.city,
        state: step3.state,
        zip: step3.zip,
        hours: step3.hours,
        deliveryRadius: step3.deliveryRadius,
        prepTime: step3.prepTime,
        orderType: step3.orderType,
      },
      menus: {
        items: step4.items.map((it) => ({
          dishImgUrl: it.imagePreview === "" ? null : it.imagePreview,
          name: it.name,
          category: it.category,
          price: it.price,
          description: it.description,
        })),
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
      steps={CREATE_OWNER_PAGE_STEPS}
      active={4}
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
              onClick={() => navigate("/owner-on-board-step-1")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="text-slate-900">
                {step1.firstName} {step1.lastName}
              </dd>
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
        {/* Business */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Business</h3>
            {/* 클릭 시 해당 스텝으로 이동 */}
            <button
              type="button"
              onClick={() => navigate("/owner-on-board-step-2")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Legal business name</dt>
              <dd className="text-slate-900">{step2.lbn || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">DBA</dt>
              <dd className="text-slate-900">{step2.dba || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Store phone</dt>
              <dd className="text-slate-900">{step2.storePhone || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Business email</dt>
              <dd className="text-slate-900">{step2.businessEmail || "—"}</dd>
            </div>
          </dl>
        </section>

        {/* Location & Hours */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Location & Hours</h3>
            <button
              type="button"
              onClick={() => navigate("/owner-on-board-step-3")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-900">
            {addressLine || "Address not provided"}
          </p>
          <p className="mt-1 text-sm text-slate-600">{hoursLine}</p>
          <div className="mt-2 text-[12px] text-slate-500">
            {step3.orderType} • Prep: {step3.prepTime} • Delivery radius:{" "}
            {step3.deliveryRadius} km
          </div>
        </section>

        {/* Menu */}
        <section className="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              type="button"
              onClick={() => navigate("/owner-on-board-step-4")}
              className="text-sm font-medium text-emerald-700 hover:underline hover:cursor-pointer"
            >
              Edit
            </button>
          </div>

          {step4.items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No menu items added (you can publish and add them later).
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-900">
              {step4.items.map((it, idx) => (
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

        {/* Agreements (로컬 상태나 RHF가 필요한 경우 나중에 연결 가능) */}
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
      </div>
      <SuccessDialog
        open={showSuccess}
        message="Your account was created successfully. Please log in to continue."
        onConfirm={() => navigate("/login", { replace: true })}
      />
    </WizardShell>
  );
}
