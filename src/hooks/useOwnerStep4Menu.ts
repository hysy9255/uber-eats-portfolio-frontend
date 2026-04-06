import { useFormContext, type UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveDraft } from "../utils/localDraft";
import type { DraftItem } from "../formDataTypes/onBoarding/ownerOnBoardingForms.type";
import { uploadImage } from "../utils/uploadImg";
import type { OwnerOnBoardingForm } from "../components/Layout/OwnerOnBoardLayout";

export const useOwnerStep4Menu = (methods: UseFormReturn<DraftItem>) => {
  const navigate = useNavigate();
  const { setValue, reset } = methods;
  const { getValues } = useFormContext<OwnerOnBoardingForm>();

  const [fields, setFields] = useState<DraftItem[]>(() =>
    getValues("step4.items")
  );
  const [preview, setPreview] = useState<string>();

  const onSelectSmallImageUpload = async (index: number, file: File) => {
    const persistentUrl = await uploadImage(file);
    setFields((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, imagePreview: persistentUrl } : item
      )
    );
    const formValues = getValues();
    saveDraft<OwnerOnBoardingForm>("ownerAccount", {
      ...formValues,
      step4: {
        items: [
          ...formValues.step4.items.map((item, i) =>
            i === index ? { ...item, imagePreview: persistentUrl } : item
          ),
        ],
      },
    });
  };

  const onSelectImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    const persistentUrl = await uploadImage(file);
    setValue("imagePreview", persistentUrl);
  };

  const onRemove = (i: number) => {
    setFields((prev) => prev.filter((_, index) => index !== i));
    const formValues = getValues();
    saveDraft<OwnerOnBoardingForm>("ownerAccount", {
      ...formValues,
      step4: {
        items: formValues.step4.items.filter((_, index) => index !== i),
      },
    });
  };

  const onAddItem = (data: DraftItem) => {
    setFields((prev) => [...prev, data]);
    const formValues = getValues();
    saveDraft<OwnerOnBoardingForm>("ownerAccount", {
      ...formValues,
      step4: {
        items: [...formValues.step4.items, data],
      },
    });
    reset();
    setPreview("");
  };

  const onCsvUploaded = (res: DraftItem[]) => {
    setFields((prev) => [...prev, ...res]);
    const formValues = getValues();
    saveDraft<OwnerOnBoardingForm>("ownerAccount", {
      ...formValues,
      step4: {
        items: [...formValues.step4.items, ...res],
      },
    });
  };

  const onContinue = () => navigate("/on-board/owner/step5");
  const onBack = () => navigate("/on-board/owner/step3");

  return {
    onSelectSmallImageUpload,
    onSelectImageUpload,
    onRemove,
    onAddItem,
    onCsvUploaded,
    onContinue,
    onBack,
    fields,
    preview,
  };
};
