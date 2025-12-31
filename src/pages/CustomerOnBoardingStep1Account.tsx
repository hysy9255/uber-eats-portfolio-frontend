import WizardShell from "../components/Shells/WizardShell";
import { useFormContext } from "react-hook-form";
import { CREATE_CUSTOMER_PAGE_STEPS } from "../constants/CreateCustomerPageSteps";
import { CustomerStep1RightPanel } from "./types/CustomerOnBoardingStep1Account.type";
import OnBoardingStep1Account from "../components/OnBoardingStep1Account";
import type { IOnBoardingStep1Form } from "./types/OnBoardingStep1Account.type";
import { useOnBoardingAccount } from "../ReactContext/onBoardingAccount/UseOnBoardingAccount";

export const CustomerOnboardingAccount = () => {
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
      title="Create your customer account"
      subtitle="Use your email or phone to sign up."
      steps={CREATE_CUSTOMER_PAGE_STEPS}
      active={0}
      right={CustomerStep1RightPanel}
    >
      <OnBoardingStep1Account />
    </WizardShell>
  );
};
