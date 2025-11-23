// const hoursRecord: HoursRecord = {
//   Mon: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Tue: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Wed: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Thu: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Fri: { open: "09:00", close: "23:00", open24: false, closed: false },
//   Sat: { open: "10:00", close: "23:00", open24: false, closed: false },
//   Sun: { open: "10:00", close: "20:00", open24: false, closed: false },
// };

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface DayHours {
  open: string; // "09:00"
  close: string;
  open24: boolean;
  closed: boolean;
}

export interface IOwnerOnBoardingStep3Form {
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  hours: Record<Day, DayHours>;
  deliveryRadius: string;
  prepTime: string;
  orderType: string;
}

export const OWNER_STEP3_KEY = "onboard.owner.step3";

export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const defaultHours = Object.fromEntries(
  DAYS.map((day) => [
    day,
    { open: "", close: "", open24: false, closed: false },
  ])
) as IOwnerOnBoardingStep3Form["hours"];
