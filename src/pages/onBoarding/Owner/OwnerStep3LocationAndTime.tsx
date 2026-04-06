import { Fragment } from "react";
import { CREATE_OWNER_PAGE_STEPS } from "../../../constants/CreateOwnerPageSteps";
import { OwnerStep3RightPanel } from "../../../components/Panels/OwnerRegistrationPanels";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import OwnerStep3LocationAndTimeInputs from "./OwnerStep3LocationAndTimeInputs";
import { useOwnerStep3LocationAndTime } from "../../../hooks/useOwnerStep3LocationAndTime";
import type {
  OwnerOnBoardContext,
  OwnerOnBoardingForm,
} from "../../../components/Layout/OwnerOnBoardLayout";
import { useOutletContext } from "react-router-dom";
import { useFormContext } from "react-hook-form";

const OwnerStep3LocationAndTime = () => {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<OwnerOnBoardContext>();
  const { onBack, onContinue } = useOwnerStep3LocationAndTime();
  const { handleSubmit } = useFormContext<OwnerOnBoardingForm>();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_OWNER_PAGE_STEPS} active={2} />
      <OnBoardHeadline
        title="Set up your location & hours"
        subtitle="Customers will see this on your store page."
      />
      <OnBoardDescription description={OwnerStep3RightPanel} />
      <div className="mt-8 items-start">
        <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
          <form className="grid grid-cols-2 gap-4 ">
            <OwnerStep3LocationAndTimeInputs />
          </form>
        </section>
      </div>
      <OnBoardStepNavigation
        onBack={onBack}
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

export default OwnerStep3LocationAndTime;
