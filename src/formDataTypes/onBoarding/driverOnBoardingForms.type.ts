import type {
  AccountTypeOptions,
  TaxClassificationOptions,
} from "../../pages/types/constant.enums.type";

export const DRIVER_STEP2_KEY = "onboard.driver.step2";
export const DRIVER_STEP3_KEY = "onboard.driver.step3";
export const DRIVER_STEP4_KEY = "onboard.driver.step4";
export const DRIVER_STEP5_KEY = "onboard.driver.step5";

export interface DriverOnBoardingStep2Form {
  vehicleType: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
}

export interface DriverOnBoardingStep3Form {
  licenseImgUrl: string;
  insuranceImgUrl: string;
  additionalNotes: string | null;
}

export interface DriverOnBoardingStep4Form {
  legalFullName: string;
  last4SSN: string;
}

export interface DriverOnBoardingStep5Form {
  fullName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: AccountTypeOptions;
  taxClassification: TaxClassificationOptions;
}
