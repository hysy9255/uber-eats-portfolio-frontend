import { useState } from "react";
import type { OwnerOnBoardingForm } from "../components/Layout/OwnerOnBoardLayout";
import { saveDraft } from "../utils/localDraft";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/uploadImg";
import { useFormContext } from "react-hook-form";

export const useOwnerStep2Business = () => {
  const navigate = useNavigate();

  const { setValue, getValues } = useFormContext<OwnerOnBoardingForm>();

  const [mainImgUrl, setMainImgUrl] = useState(() =>
    getValues("step2.mainImgUrl")
  );
  const [sub1ImgUrl, setSub1ImgUrl] = useState(() =>
    getValues("step2.sub1ImgUrl")
  );
  const [sub2ImgUrl, setSub2ImgUrl] = useState(() =>
    getValues("step2.sub2ImgUrl")
  );
  const [bannerImgUrl, setBannerImgUrl] = useState(() =>
    getValues("step2.bannerImgUrl")
  );
  const [profileImgPreview, setProfileImgPreview] = useState(() =>
    getValues("step2.logoImgUrl")
  );

  const onBack = () => {
    navigate("/on-board/owner/step1");
  };

  const onContinue = (data: OwnerOnBoardingForm) => {
    saveDraft("ownerAccount", data);
    navigate("/on-board/owner/step3");
  };

  const onSelectMainImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setMainImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("step2.mainImgUrl", persistentUrl);
  };

  const onSelectSub1ImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setSub1ImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("step2.sub1ImgUrl", persistentUrl);
  };

  const onSelectSub2ImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setSub2ImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("step2.sub2ImgUrl", persistentUrl);
  };

  const onSelectBannerImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setBannerImgUrl(url);
    const persistentUrl = await uploadImage(file);
    setValue("step2.bannerImgUrl", persistentUrl);
  };

  const onClickRemove = () => {
    setProfileImgPreview("");
    setValue("step2.logoImgUrl", "", { shouldDirty: true });
    saveDraft("ownerAccount", { ...getValues() });
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

    setValue("step2.logoImgUrl", persistentUrl, {
      shouldDirty: true,
    });
  };

  return {
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
  };
};
