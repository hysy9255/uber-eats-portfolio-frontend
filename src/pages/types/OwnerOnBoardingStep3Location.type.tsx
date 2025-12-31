// const hoursRecord: HoursRecord = {
//   Mon: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Tue: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Wed: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Thu: { open: "09:00", close: "21:00", open24: false, closed: false },
//   Fri: { open: "09:00", close: "23:00", open24: false, closed: false },
//   Sat: { open: "10:00", close: "23:00", open24: false, closed: false },
//   Sun: { open: "10:00", close: "20:00", open24: false, closed: false },
// };

import type { OrderTypeOptions, PrepTimeOptions } from "./constant.enums.type";

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface DayHours {
  open: string | null; // "09:00"
  close: string | null;
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
  prepTime: PrepTimeOptions;
  orderType: OrderTypeOptions;
}

export const OWNER_STEP3_KEY = "onboard.owner.step3";

export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const defaultHours = Object.fromEntries(
  DAYS.map((day) => [
    day,
    { open: null, close: null, open24: false, closed: false },
  ])
) as IOwnerOnBoardingStep3Form["hours"];

// type DayHours3 =
//   | { kind: "closed" }
//   | { kind: "open24" }
//   | { kind: "custom"; openHour: string; closeHour: string };

// export type DayHoursDraft =
//   | { kind: "closed" }
//   | { kind: "open24" }
//   | {
//       kind: "custom";
//       openHour: string | null;
//       closeHour: string | null;
//     };

// const defaultHours2 = Object.fromEntries(
//   DAYS.map((day) => [day, { kind: "custom", openHour: null, closeHour: null }])
// ) as Record<Day, DayHoursDraft>;
