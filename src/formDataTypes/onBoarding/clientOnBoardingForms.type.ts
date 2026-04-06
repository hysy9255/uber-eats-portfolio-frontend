import type { AddressAliasType } from "../../constants/AddressAliasTypeEnums";

export const CLIENT_STEP2_KEY = "onboard.customer.step2";

export interface ClientOnBoardingStep2Form {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;
}
