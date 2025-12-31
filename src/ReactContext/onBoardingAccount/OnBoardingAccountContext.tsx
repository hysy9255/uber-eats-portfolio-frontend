import { createContext } from "react";
import type {
  EmailCheckType,
  ShowMessageUIType,
} from "./OnBoardingAccountProvider";
import type { IOnBoardingStep1Form } from "../../pages/types/OnBoardingStep1Account.type";

export type OnBoardingAccountContextValue = {
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailCheck: React.Dispatch<React.SetStateAction<EmailCheckType>>;
  showMessageUI: ShowMessageUIType;
  onBack: () => void;
  onExitWithoutSaving: () => void;
  onContinue: (data: IOnBoardingStep1Form) => void;
  profileImgPreview: string | undefined;
  pwd: string;
  onClickRemove: () => void;
  onClickUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickCheckForAvailability: () => void;
};

export const OnBoardingAccountContext =
  createContext<OnBoardingAccountContextValue | null>(null);
