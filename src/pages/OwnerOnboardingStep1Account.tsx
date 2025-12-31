import WizardShell from "../components/Shells/WizardShell";
import { useFormContext } from "react-hook-form";
import { CREATE_OWNER_PAGE_STEPS } from "../constants/CreateOwnerPageSteps";
import { OwnerStep1RightPanel } from "./types/OwnerOnBoardingStep1Account.type";
import OnBoardingStep1Account from "../components/OnBoardingStep1Account";
import { useOnBoardingAccount } from "../ReactContext/onBoardingAccount/UseOnBoardingAccount";
import type { IOnBoardingStep1Form } from "./types/OnBoardingStep1Account.type";

export default function OwnerOnboardingAccount() {
  const {
    showConfirm,
    setShowConfirm,
    onBack,
    onExitWithoutSaving,
    onContinue,
  } = useOnBoardingAccount();

  const { handleSubmit } = useFormContext<IOnBoardingStep1Form>();

  return (
    <WizardShell
      onExitWithoutSaving={onExitWithoutSaving}
      showConfirm={showConfirm}
      setShowConfirm={setShowConfirm}
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Create your owner account"
      subtitle="Use your email or phone to sign up."
      steps={CREATE_OWNER_PAGE_STEPS}
      active={0}
      right={OwnerStep1RightPanel}
    >
      <OnBoardingStep1Account />
    </WizardShell>
  );
}
