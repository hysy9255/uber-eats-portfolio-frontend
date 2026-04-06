import { Outlet, useNavigate } from "react-router-dom";
import { AddressAliasType } from "../../constants/AddressAliasTypeEnums";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { clearDraft, loadDraft } from "../../utils/localDraft";

export interface ClientOnBoardingForm {
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
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
    alias: AddressAliasType;
    customAlias?: string;
  };
}

export type ClientOnBoardContext = {
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onExit: () => void;
};

const ClientOnBoardLayout = () => {
  const navigate = useNavigate();
  const defaultValues = loadDraft<ClientOnBoardingForm>("clientAccount", {
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
      streetAddress: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      alias: AddressAliasType.home,
      customAlias: "",
    },
  });

  const methods = useForm<ClientOnBoardingForm>({
    mode: "onSubmit",
    defaultValues,
  });
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onExit = () => {
    // localStorage.clear();
    clearDraft("clientAccount");
    navigate("/create-account-choice");
  };

  return (
    <FormProvider {...methods}>
      <Outlet context={{ showConfirm, setShowConfirm, onExit }} />
    </FormProvider>
  );
};

export default ClientOnBoardLayout;
