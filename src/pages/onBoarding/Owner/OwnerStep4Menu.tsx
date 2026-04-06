import { Fragment } from "react";
import { CREATE_OWNER_PAGE_STEPS } from "../../../constants/CreateOwnerPageSteps";
import { OwnerStep4RightPanel } from "../../../components/Panels/OwnerRegistrationPanels";
import OnBoardSteps from "../../../components/OnBoardSteps";
import OnBoardHeadline from "../../../components/Layout/OnBoardHeadline";
import OnBoardDescription from "../../../components/OnBoardDescription";
import OnBoardStepNavigation from "../../../components/Layout/OnBoardStepNavigation";
import LeaveThisStepPopup from "../../../components/PopUps/LeaveThisStepPopup";
import { useOwnerStep4Menu } from "../../../hooks/useOwnerStep4Menu";
import { FormProvider, useForm } from "react-hook-form";
import type { OwnerOnBoardContext } from "../../../components/Layout/OwnerOnBoardLayout";
import { useOutletContext } from "react-router-dom";
import DownloadCsvButton from "../../../components/Buttons/DownloadCsvButton";
import OwnerStep4MenuInputs from "./OwnerStep4MenuInputs";
import type { DraftItem } from "../../../formDataTypes/onBoarding/ownerOnBoardingForms.type";
import { DishCategory } from "../../../constants/DishCategoryEnums";
import DraftMenuItems from "../../../components/DraftMenuItems";
import MenuBulkImportArea from "../../../components/Inputs/MenuBulkImportArea";

const OwnerStep4Menu = () => {
  const { showConfirm, setShowConfirm, onExit } =
    useOutletContext<OwnerOnBoardContext>();
  const methods = useForm<DraftItem>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      price: "",
      category: DishCategory.Appetizers,
      description: "",
      imagePreview: "",
      imageFile: null,
    },
  });
  const {
    fields,
    preview,
    onContinue,
    onBack,
    onSelectSmallImageUpload,
    onSelectImageUpload,
    onRemove,
    onAddItem,
    onCsvUploaded,
  } = useOwnerStep4Menu(methods);

  return (
    <Fragment>
      <OnBoardSteps steps={CREATE_OWNER_PAGE_STEPS} active={3} />
      <OnBoardHeadline
        title="Set up your menu"
        subtitle="You can skip this step and add items later."
      />
      <OnBoardDescription description={OwnerStep4RightPanel} />
      <div className="mt-8 items-start">
        <div className="space-y-6">
          <DownloadCsvButton />
          <MenuBulkImportArea onCsvUploaded={onCsvUploaded} />
          <DraftMenuItems
            onRemove={onRemove}
            onSelectSmallImageUpload={onSelectSmallImageUpload}
            fields={fields}
          />
          <form
            onSubmit={methods.handleSubmit(onAddItem)}
            className="rounded-xl ring-1 ring-slate-200 p-5 bg-white"
          >
            <FormProvider {...methods}>
              <OwnerStep4MenuInputs
                preview={preview}
                onSelectImageUpload={onSelectImageUpload}
              />
            </FormProvider>
          </form>
        </div>
      </div>
      <OnBoardStepNavigation
        onBack={onBack}
        onExit={() => setShowConfirm(true)}
        onContinue={onContinue}
        continueLabel="Continue"
      />

      {showConfirm && (
        <LeaveThisStepPopup setShowConfirm={setShowConfirm} onExit={onExit} />
      )}
    </Fragment>
  );
};

export default OwnerStep4Menu;
