import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveDraft } from "../utils/localDraft";
import { EmailStatus, type EmailCheck } from "../constants/EmailCheck.type";
import { checkEmailAvailability } from "../api/userApi";
import { onClickUploadImg } from "../utils/onClickUploadImg";
import type { OwnerOnBoardingForm } from "../components/Layout/OwnerOnBoardLayout";

export const useOwnerStep1Account = () => {
  const navigate = useNavigate();
  const { control, setValue, trigger, getValues } =
    useFormContext<OwnerOnBoardingForm>();

  const [emailCheck, setEmailCheck] = useState<EmailCheck>({
    status: EmailStatus.IDLE,
    email: null,
  });
  const [showEmailCheckMessage, setShowEmailCheckMessage] = useState(false);
  const [profileImgPreview, setProfileImgPreview] = useState<
    string | undefined
  >(() => getValues("step1.profileImgUrl"));

  const onContinue = (data: OwnerOnBoardingForm) => {
    const emailVerified =
      emailCheck.status === "available" &&
      emailCheck.email === data.step1.email;

    if (!emailVerified) {
      setShowEmailCheckMessage(true);
      return;
    }

    saveDraft<OwnerOnBoardingForm>("ownerAccount", data);
    navigate("/on-board/owner/step2");
  };

  const [pwd, email] = useWatch({
    control,
    name: ["step1.password", "step1.email"],
  });

  const onClickRemoveProfile = () => {
    setProfileImgPreview(undefined);
    setValue("step1.profileImgUrl", undefined, { shouldDirty: true });
    saveDraft<OwnerOnBoardingForm>("ownerAccount", { ...getValues() });
  };

  const onClickUploadProfile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const persistentUrl = await onClickUploadImg(e, setProfileImgPreview);
    setValue("step1.profileImgUrl", persistentUrl, {
      shouldDirty: true,
    });
  };

  const handleClickCheckEmailAvailability = async () => {
    setShowEmailCheckMessage(false);
    const valid = await trigger("step1.email");
    if (!valid) return;

    const res = await checkEmailAvailability({ email });

    if (res.available) {
      setEmailCheck({
        status: EmailStatus.AVAILABLE,
        email,
      });
    } else {
      setEmailCheck({
        status: EmailStatus.UNAVAILABLE,
        email,
      });
    }
  };

  useEffect(() => {
    setShowEmailCheckMessage(false);
    setEmailCheck({ status: EmailStatus.IDLE, email: null });
  }, [email]);

  return {
    onContinue,
    onClickRemoveProfile,
    onClickUploadProfile,
    handleClickCheckEmailAvailability,
    showEmailCheckMessage,
    profileImgPreview,
    pwd,
    emailCheck,
  };
};
