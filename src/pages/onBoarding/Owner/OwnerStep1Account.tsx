import { Fragment } from "react/jsx-runtime";
import OnBoardSteps from "../../../components/OnBoardSteps";
import { CREATE_OWNER_PAGE_STEPS } from "../../../constants/CreateOwnerPageSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import { OwnerStep1RightPanel } from "../../../components/Panels/OwnerRegistrationPanels";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import { useOutletContext } from "react-router-dom";
import type {
  OwnerOnBoardContext,
  OwnerOnBoardingForm,
} from "../../../components/Layout/OwnerOnBoardLayout";
import { useFormContext } from "react-hook-form";
import { useOwnerStep1Account } from "../../../hooks/useOwnerStep1Account";
import OwnerStep1AcountInputs from "../Client/OwnerStep1AcountInputs";

export default function OwnerStep1Account() {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<OwnerOnBoardContext>();
  const { handleSubmit } = useFormContext<OwnerOnBoardingForm>();

  const {
    onContinue,
    onClickRemoveProfile,
    onClickUploadProfile,
    handleClickCheckEmailAvailability,
    showEmailCheckMessage,
    profileImgPreview,
    pwd,
    emailCheck,
  } = useOwnerStep1Account();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_OWNER_PAGE_STEPS} active={0} />
      <OnBoardHeadline
        title="Create your owner account"
        subtitle="Use your email or phone to sign up."
      />
      <OnBoardDescription description={OwnerStep1RightPanel} />
      <div className="mt-8 items-start">
        <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <OwnerStep1AcountInputs
              onClickRemoveProfile={onClickRemoveProfile}
              onClickUploadProfile={onClickUploadProfile}
              handleClickCheckEmailAvailability={
                handleClickCheckEmailAvailability
              }
              showEmailCheckMessage={showEmailCheckMessage}
              profileImgPreview={profileImgPreview}
              pwd={pwd}
              emailCheck={emailCheck}
            />
            <label className="mt-1 inline-flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">
                Send me deals and promotions
              </span>
            </label>
          </form>
        </section>
      </div>
      <OnBoardStepNavigation
        onBack={() => setShowConfirm(true)}
        onExit={() => setShowConfirm(true)}
        onContinue={handleSubmit(onContinue)}
        continueLabel="Continue"
      />
      {showConfirm && (
        <LeaveThisStepPopup setShowConfirm={setShowConfirm} onExit={onExit} />
      )}
    </Fragment>
  );
}
