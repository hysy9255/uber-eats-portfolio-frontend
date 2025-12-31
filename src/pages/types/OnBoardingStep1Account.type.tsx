export const STEP1_KEY = "onboard.account.step1";

export interface IOnBoardingStep1Form {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImgUrl: string | null;
}
