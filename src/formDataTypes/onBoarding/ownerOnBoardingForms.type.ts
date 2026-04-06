import type { DishCategory } from "../../constants/DishCategoryEnums";
import type { OrderType } from "../../constants/OrderType";
import type {
  Day,
  DayHours,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";

export const OWNER_STEP2_KEY = "onboard.owner.step2";
export const OWNER_STEP3_KEY = "onboard.owner.step3";
export const OWNER_STEP4_KEY = "onboard.owner.step4";

export interface OwnerOnBoardingStep1Form {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImgUrl: string;
}

export interface OwnerOnBoardingStep2Form {
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
}

export interface OwnerOnBoardingStep3Form {
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  hours: Record<Day, DayHours>;
  deliveryRadius: number;
  prepTime: number;
  orderType: OrderType;
}

export interface OwnerOnBoardingStep4Form {
  items: DraftItem[];
}

export type DraftItem = {
  name: string;
  price: string;
  category: DishCategory;
  description: string;
  imagePreview: string;
  imageFile: string | null;
};
