export type CreateRestaurantGeneralInfoDTO = {
  logo?: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website?: string;
  instagram?: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  deliveryRadius: number;
  prepTime: number;
  orderType: string;
};
