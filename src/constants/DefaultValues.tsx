import {
  AccountTypeOptions,
  OrderTypeOptions,
  PrepTimeOptions,
  TaxClassificationOptions,
} from "../pages/types/constant.enums.type";
import { defaultHours } from "../pages/types/OwnerOnBoardingStep3Location.type";

export const commonAccountOnBoardStep1DefaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileImgUrl: "",
};

export const customerOnBoardStep2DefaultValues = {
  streetAddress: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
};

export const ownerOnboardStep2DefaultValues = {
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
};

export const ownerOnboardStep3DefaultValues = {
  streetAddress: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
  hours: defaultHours,
  deliveryRadius: "5",
  prepTime: PrepTimeOptions.tenToFifteen,
  orderType: OrderTypeOptions.deliveryAndPickup,
};

export const ownerOnboardStep4DefaultValues = {
  items: [],
};

export const driverOnBoardStep2DefaultValues = {
  vehicleType: "",
  model: "",
  year: "",
  color: "",
  licensePlate: "",
};

export const driverOnBoardStep3DefaultValues = {
  licenseImgUrl: "",
  insuranceImgUrl: "",
  additionalNotes: "",
};

export const driverOnBoardStep4DefaultValues = {
  legalFullName: "",
  last4SSN: "",
};

export const driverOnBoardStep5DefaultValues = {
  fullName: "",
  routingNumber: "",
  accountNumber: "",
  accountType: AccountTypeOptions.Checking,
  taxClassification: TaxClassificationOptions.Individual,
};
