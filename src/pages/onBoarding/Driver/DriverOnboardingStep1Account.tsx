import { useFormContext } from "react-hook-form";
import { useOnBoardingAccount } from "../../../ReactContext/onBoardingAccount/UseOnBoardingAccount";
import WizardShell from "../../../components/Shells/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../../../constants/CreateDriverPageSteps";
import OnBoardingStep1Account from "../../../components/OnBoardingStep1Account";
import type { OnBoardingStep1Form } from "../../../formDataTypes/onBoarding/onBoardingStep1Form.type";
import { DriverStep1RightPanel } from "../../../components/Panels/DriverRegistrationPanels";

export default function DriverOnboardingAccount() {
  const {
    showConfirm,
    setShowConfirm,
    onBack,
    onExitWithoutSaving,
    onContinue,
  } = useOnBoardingAccount();

  const { handleSubmit } = useFormContext<OnBoardingStep1Form>();

  return (
    <WizardShell
      onExitWithoutSaving={onExitWithoutSaving}
      showConfirm={showConfirm}
      setShowConfirm={setShowConfirm}
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Create your driver account"
      subtitle="Use your email or phone to sign up."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={0}
      right={DriverStep1RightPanel}
    >
      <OnBoardingStep1Account />
    </WizardShell>
  );
}
