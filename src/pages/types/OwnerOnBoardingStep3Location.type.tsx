import type { OwnerOnBoardingStep3Form } from "../../formDataTypes/onBoarding/ownerOnBoardingForms.type";

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface DayHours {
  open: string | null;
  close: string | null;
  open24: boolean;
  closed: boolean;
}

export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const defaultHours = Object.fromEntries(
  DAYS.map((day) => [
    day,
    { open: null, close: null, open24: false, closed: false },
  ])
) as OwnerOnBoardingStep3Form["hours"];
