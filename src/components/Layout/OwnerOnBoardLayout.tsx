import { Outlet, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { clearDraft, loadDraft } from "../../utils/localDraft";
import type { DraftItem } from "../../formDataTypes/onBoarding/ownerOnBoardingForms.type";
import { OrderType } from "../../constants/OrderType";
import {
  defaultHours,
  type Day,
  type DayHours,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";

export interface OwnerOnBoardingForm {
  step1: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImgUrl?: string;
  };
  step2: {
    logoImgUrl: string;
    lbn: string;
    dba: string;
    cuisineType: string;
    storePhone: string;
    businessEmail: string;
    website: string;
    instagram: string;
    mainImgUrl: string;
    sub1ImgUrl: string;
    sub2ImgUrl: string;
    bannerImgUrl: string;
  };
  step3: {
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
    hours: Record<Day, DayHours>;
    deliveryRadius: number;
    prepTime: number;
    orderType: OrderType;
  };
  step4: {
    items: DraftItem[];
  };
}

export type OwnerOnBoardContext = {
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onExit: () => void;
};

const OwnerOnBoardLayout = () => {
  const navigate = useNavigate();
  const defaultValues = loadDraft<OwnerOnBoardingForm>("ownerAccount", {
    step1: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      profileImgUrl: "",
    },
    step2: {
      logoImgUrl: "",
      lbn: "",
      dba: "",
      cuisineType: "",
      storePhone: "",
      businessEmail: "",
      website: "",
      instagram: "",
      mainImgUrl: "",
      sub1ImgUrl: "",
      sub2ImgUrl: "",
      bannerImgUrl: "",
    },
    step3: {
      streetAddress: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
      hours: defaultHours,
      deliveryRadius: 1,
      prepTime: 10,
      orderType: OrderType.DeliveryAndPickup,
    },
    step4: {
      items: [],
    },
  });

  const methods = useForm<OwnerOnBoardingForm>({
    mode: "onSubmit",
    defaultValues,
  });
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onExit = () => {
    clearDraft("ownerAccount");
    navigate("/create-account-choice");
  };

  return (
    <FormProvider {...methods}>
      <Outlet context={{ showConfirm, setShowConfirm, onExit }} />
    </FormProvider>
  );
};

export default OwnerOnBoardLayout;
