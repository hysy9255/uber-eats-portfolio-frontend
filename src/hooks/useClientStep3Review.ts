import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerClient } from "../api/registrationApi";
import type { RegisterClientForm } from "../formDataTypes/register/registerClientForm.type";
import { loadDraft } from "../utils/localDraft";
import type { ClientOnBoardingForm } from "../components/Layout/ClientOnBoardLayout";
import { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import { UserRole } from "../constants/UserRoleEnum";

export const useClientStep3Review = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/on-board/client/step2");
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const data = loadDraft<ClientOnBoardingForm>("clientAccount", {
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

  const handleRegisterClientSubmit = async (data: RegisterClientForm) => {
    try {
      await registerClient(data);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const onContinue = () => {
    handleRegisterClientSubmit({
      user: {
        email: data.step1.email,
        password: data.step1.password,
        role: UserRole.Client,
        firstName: data.step1.firstName,
        lastName: data.step1.lastName,
        phoneNumber: data.step1.phoneNumber,
        profileImgUrl: data.step1.profileImgUrl,
      },
      deliveryInfo: {
        ...data.step2,
        isDefault: true,
      },
    });
  };

  return {
    onBack,
    onContinue,
    data,
    showSuccess,
  };
};
