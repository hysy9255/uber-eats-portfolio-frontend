import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ClientOnBoardingForm } from "../components/Layout/ClientOnBoardLayout";
import { useEffect, useState } from "react";
import { AddressAliasType } from "../constants/AddressAliasTypeEnums";
import { saveDraft } from "../utils/localDraft";

export const useClientStep2Address = () => {
  const navigate = useNavigate();

  const { setValue } = useFormContext<ClientOnBoardingForm>();

  const [alias, setAlias] = useState<AddressAliasType>(AddressAliasType.home);

  const onContinue = (data: ClientOnBoardingForm) => {
    saveDraft<ClientOnBoardingForm>("clientAccount", data);
    navigate("/on-board/client/step3");
  };

  const onBack = () => {
    navigate("/on-board/client/step1");
  };

  useEffect(() => {
    if (alias !== AddressAliasType.other) {
      setValue("step2.customAlias", undefined);
    }
  }, [alias, setValue]);

  return {
    alias,
    setAlias,
    onContinue,
    onBack,
  };
};
