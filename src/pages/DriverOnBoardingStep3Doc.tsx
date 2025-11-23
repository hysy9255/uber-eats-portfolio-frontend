import { useNavigate } from "react-router-dom";
import WizardShell from "../components/WizardShell";
import { CREATE_DRIVER_PAGE_STEPS } from "../constants/CreateDriverPageSteps";
import ImageUploadZone from "../components/ImageUploadZone";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from "../utils/uploadImg";
import { loadDraft, saveDraft } from "../utils/localDraft";
import {
  DRIVER_STEP3_KEY,
  DriverStep3RightPanel,
  type IDriverOnBoardingStep3Form,
} from "./types/DriverOnBoardingStep3Doc.type";

export default function DriverOnboardingDocs() {
  const navigate = useNavigate();
  const defaultValues = loadDraft<IDriverOnBoardingStep3Form>(
    DRIVER_STEP3_KEY,
    {
      licenseImgUrl: "",
      insuranceImgUrl: "",
      additionalNotes: "",
    }
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IDriverOnBoardingStep3Form>({
    mode: "onChange",
    defaultValues,
  });

  const onContinue = (data: IDriverOnBoardingStep3Form) => {
    saveDraft(DRIVER_STEP3_KEY, data);
    navigate("/driver-on-board-step-4");
  };

  const onBack = () => {
    navigate("/driver-on-board-step-2");
  };

  const [licensePreview, setLicensePreview] = useState(
    defaultValues.licenseImgUrl
  );
  const [insurancePreview, setInsurancePreview] = useState(
    defaultValues.insuranceImgUrl
  );

  const onLicenseImageSelected = async (file: File) => {
    const url = URL.createObjectURL(file);
    setLicensePreview(url);
    const licenseImgUrl = await uploadImage(file);
    setValue("licenseImgUrl", licenseImgUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const onInsuranceImageSelected = async (file: File) => {
    const url = URL.createObjectURL(file);
    setInsurancePreview(url);
    const insuranceImgUrl = await uploadImage(file);
    setValue("insuranceImgUrl", insuranceImgUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  return (
    <WizardShell
      onContinue={handleSubmit(onContinue)}
      onBack={onBack}
      title="Upload your documents"
      subtitle="Make sure details are clear and up to date."
      steps={CREATE_DRIVER_PAGE_STEPS}
      active={2}
      right={DriverStep3RightPanel}
    >
      <div className="space-y-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium">Driver’s license</span>
            <input
              type="hidden"
              {...register("licenseImgUrl", {
                required: "License is required",
              })}
            />
            <ImageUploadZone
              sizeClass="h-60 w-full"
              onSelected={onLicenseImageSelected}
              previewSrc={licensePreview}
            />
            {errors.licenseImgUrl?.message && (
              <span className="font-medium text-red-500">
                {errors.licenseImgUrl?.message}
              </span>
            )}
          </div>
          <div>
            <div className="text-sm font-medium">Insurance</div>
            <input
              type="hidden"
              {...register("insuranceImgUrl", {
                required: "Insurance is required",
              })}
            />
            <ImageUploadZone
              sizeClass="h-60 w-full"
              onSelected={onInsuranceImageSelected}
              previewSrc={insurancePreview}
            />
            {errors.insuranceImgUrl?.message && (
              <span className="font-medium text-red-500">
                {errors.insuranceImgUrl?.message}
              </span>
            )}
          </div>

          <label className="md:col-span-2">
            <div className="text-sm font-medium">
              Additional notes (optional)
            </div>
            <textarea
              {...register("additionalNotes", {
                maxLength: {
                  value: 500,
                  message: "Additional notes cannot exceed 500 characters",
                },
              })}
              className="mt-2 w-full rounded-xl ring-1 ring-slate-300 px-3 py-2 outline-none"
              rows={4}
              placeholder="Anything we should know?"
            />
            {errors.additionalNotes?.message && (
              <span className="font-medium text-red-500">
                {errors.additionalNotes?.message}
              </span>
            )}
          </label>
        </form>
      </div>
    </WizardShell>
  );
}
