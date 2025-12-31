import type { Day, DayHours } from "./OwnerOnBoardingStep3Location.type";

export interface ICreateOwner {
  userInfo: {
    profileImgUrl: string | null;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: string;
  };
  business: {
    logo: string | null;
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
  };
  locationAndHours: {
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
    // hours: string;
    hours: Record<Day, DayHours>;
    deliveryRadius: string;
    prepTime: string;
    orderType: string;
  };
  menus: {
    items: Array<{
      dishImgUrl?: string | null;
      name: string;
      category: string;
      price: string;
      description: string;
    }>;
  };
}
