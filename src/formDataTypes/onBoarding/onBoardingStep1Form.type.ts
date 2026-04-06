export const STEP1_KEY = "onboard.account.step1";

export interface OnBoardingStep1Form {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImgUrl?: string;
}
