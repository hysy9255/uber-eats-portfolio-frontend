export type DraftItem = {
  name: string;
  price: string;
  category: string;
  description: string;
  imagePreview: string;
  // imageFile: File | null;
  imageFile: string | null;
};

export const OWNER_STEP4_KEY = "onboard.owner.step4";

export interface IOwnerOnBoardingStep4Form {
  items: DraftItem[];
}
