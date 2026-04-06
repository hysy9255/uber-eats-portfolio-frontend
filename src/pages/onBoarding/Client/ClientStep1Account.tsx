import { Fragment } from "react/jsx-runtime";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import { ClientStep1RightPanel } from "../../../components/Panels/ClientRegistrationPanels";
import { CREATE_CLIENT_PAGE_STEPS } from "../../../constants/CreateClientPageSteps";
import { useFormContext } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import type {
  ClientOnBoardContext,
  ClientOnBoardingForm,
} from "../../../components/Layout/ClientOnBoardLayout";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import { useClientStep1Account } from "../../../hooks/useClientStep1Account";
import ClientStep1AccountInputs from "./ClientStep1AccountInputs";

const ClientStep1Account = () => {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<ClientOnBoardContext>();
  const { handleSubmit } = useFormContext<ClientOnBoardingForm>();
  const {
    onContinue,
    onClickRemoveProfile,
    onClickUploadProfile,
    handleClickCheckEmailAvailability,
    showEmailCheckMessage,
    profileImgPreview,
    pwd,
    emailCheck,
  } = useClientStep1Account();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_CLIENT_PAGE_STEPS} active={0} />
      <OnBoardHeadline
        title="Create your client account"
        subtitle="Use your email or phone to sign up."
      />
      <OnBoardDescription description={ClientStep1RightPanel} />
      <div className="mt-8 items-start">
        <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <ClientStep1AccountInputs
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
};

export default ClientStep1Account;
