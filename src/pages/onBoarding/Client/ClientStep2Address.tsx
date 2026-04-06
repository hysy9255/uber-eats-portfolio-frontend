import { Fragment } from "react/jsx-runtime";
import { CREATE_CLIENT_PAGE_STEPS } from "../../../constants/CreateClientPageSteps";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import { ClientStep2RightPanel } from "../../../components/Panels/ClientRegistrationPanels";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import { useOutletContext } from "react-router-dom";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import type {
  ClientOnBoardContext,
  ClientOnBoardingForm,
} from "../../../components/Layout/ClientOnBoardLayout";
import { useClientStep2Address } from "../../../hooks/useClientStep2Address";
import ClientStep2AddressInputs from "./ClientStep2AddressInputs";
import { useFormContext } from "react-hook-form";

const ClientStep2Address = () => {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<ClientOnBoardContext>();
  const { handleSubmit } = useFormContext<ClientOnBoardingForm>();
  const { alias, setAlias, onContinue, onBack } = useClientStep2Address();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_CLIENT_PAGE_STEPS} active={1} />
      <OnBoardHeadline
        title="Add your delivery address"
        subtitle="We’ll use this to find restaurants that deliver to you."
      />
      <OnBoardDescription description={ClientStep2RightPanel} />
      <div className="mt-8 items-start">
        <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
          <form onSubmit={handleSubmit(onContinue)} className="space-y-6">
            <ClientStep2AddressInputs alias={alias} setAlias={setAlias} />
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

export default ClientStep2Address;
