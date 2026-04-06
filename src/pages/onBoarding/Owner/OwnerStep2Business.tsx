import { useFormContext } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { Fragment } from "react";
import { CREATE_OWNER_PAGE_STEPS } from "../../../constants/CreateOwnerPageSteps";
import { OwnerStep2RightPanel } from "../../../components/Panels/OwnerRegistrationPanels";
import { useOwnerStep2Business } from "../../../hooks/useOwnerStep2Business";
import type {
  OwnerOnBoardContext,
  OwnerOnBoardingForm,
} from "../../../components/Layout/OwnerOnBoardLayout";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import OwnerStep2BusinessInputs from "./OwnerStep2BusinessInputs";

const OwnerStep2Business = () => {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<OwnerOnBoardContext>();

  const {
    mainImgUrl,
    sub1ImgUrl,
    sub2ImgUrl,
    bannerImgUrl,
    onBack,
    onContinue,
    onSelectMainImageUpload,
    onSelectSub1ImageUpload,
    onSelectSub2ImageUpload,
    onSelectBannerImageUpload,
    onClickRemove,
    onClickUpload,
    profileImgPreview,
  } = useOwnerStep2Business();

  const { handleSubmit } = useFormContext<OwnerOnBoardingForm>();

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_OWNER_PAGE_STEPS} active={1} />
      <OnBoardHeadline
        title="Create your owner account"
        subtitle="Use your email or phone to sign up."
      />
      <OnBoardDescription description={OwnerStep2RightPanel} />
      <div className="mt-8 items-start">
        <section className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-6 lg:p-8">
          <form className="space-y-6">
            <OwnerStep2BusinessInputs
              mainImgUrl={mainImgUrl}
              sub1ImgUrl={sub1ImgUrl}
              sub2ImgUrl={sub2ImgUrl}
              bannerImgUrl={bannerImgUrl}
              onSelectMainImageUpload={onSelectMainImageUpload}
              onSelectSub1ImageUpload={onSelectSub1ImageUpload}
              onSelectSub2ImageUpload={onSelectSub2ImageUpload}
              onSelectBannerImageUpload={onSelectBannerImageUpload}
              onClickRemove={onClickRemove}
              onClickUpload={onClickUpload}
              profileImgPreview={profileImgPreview}
            />
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

export default OwnerStep2Business;
