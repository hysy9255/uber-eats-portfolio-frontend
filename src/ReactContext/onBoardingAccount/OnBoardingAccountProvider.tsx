import { useState, type ReactNode } from "react";

import { OnBoardingAccountContext } from "./OnBoardingAccountContext";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../../utils/localDraft";
import {
  STEP1_KEY,
  type IOnBoardingStep1Form,
} from "../../pages/types/OnBoardingStep1Account.type";
import { commonAccountOnBoardStep1DefaultValues } from "../../constants/DefaultValues";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { uploadImage } from "../../utils/uploadImg";
import { checkEmailAvailability } from "../../api/userApi";

interface OnBoardingAccountProviderProps {
  children: ReactNode;
  navigateTo: string;
}

export type EmailCheckType = {
  email: string | null;
  available: boolean | null;
};

export type ShowMessageUIType = {
  available: boolean | null;
  isChecked: boolean | null;
};

export const OnBoardingAccountProvider: React.FC<
  OnBoardingAccountProviderProps
> = ({ children, navigateTo }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [emailCheck, setEmailCheck] = useState<EmailCheckType>({
    email: null,
    available: null,
  });

  const [showMessageUI, setShowMessageUI] = useState<ShowMessageUIType>({
    available: null,
    isChecked: null,
  });

  const defaultValues = loadDraft<IOnBoardingStep1Form>(
    STEP1_KEY,
    commonAccountOnBoardStep1DefaultValues
  );

  const methods = useForm<IOnBoardingStep1Form>({
    mode: "onSubmit",
    defaultValues,
  });

  const onBack = () => {
    setShowConfirm(true);
  };

  const onExitWithoutSaving = () => {
    localStorage.clear();
    navigate("/create-account-choice");
  };

  const onContinue = (data: IOnBoardingStep1Form) => {
    const currentEmail = data.email;
    if (emailCheck.email === null || emailCheck.email !== currentEmail) {
      setShowMessageUI({ isChecked: false, available: null });
      return;
    } else if (!emailCheck.available) {
      setShowMessageUI({ isChecked: true, available: false });
      return;
    }
    saveDraft(STEP1_KEY, data);
    navigate(navigateTo);
  };

  const [profileImgPreview, setProfileImgPreview] = useState<
    string | undefined
  >(defaultValues.profileImgUrl);

  const pwd = useWatch({ control: methods.control, name: "password" });
  const email = useWatch({ control: methods.control, name: "email" });

  const onClickRemove = () => {
    setProfileImgPreview("");
    methods.setValue("profileImgUrl", "", { shouldDirty: true });
    saveDraft(STEP1_KEY, { ...methods.getValues() });
  };

  const onClickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setProfileImgPreview(url);
    const persistentUrl = await uploadImage(file);

    methods.setValue("profileImgUrl", persistentUrl, {
      shouldDirty: true,
    });
  };

  const handleClickCheckForAvailability = async () => {
    setShowMessageUI({ available: null, isChecked: null });
    const ok = await methods.trigger("email");
    if (!ok) {
      setShowMessageUI({ available: false, isChecked: true });
      return;
    }
    const res = await checkEmailAvailability(email);
    setEmailCheck({ email, available: res.available });
    setShowMessageUI({ available: res.available, isChecked: true });
  };

  return (
    <OnBoardingAccountContext.Provider
      value={{
        showConfirm,
        setShowConfirm,
        setEmailCheck,
        showMessageUI,
        onBack,
        onExitWithoutSaving,
        onContinue,
        profileImgPreview,
        pwd,
        onClickRemove,
        onClickUpload,
        handleClickCheckForAvailability,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </OnBoardingAccountContext.Provider>
  );
};
