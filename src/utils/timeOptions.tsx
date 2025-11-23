export type TimeOption = { value: string; label: string };

function buildTimes(
  startHour = 0, // 5:00 AM
  endHour = 23, // 11:00 PM
  stepMinutes = 15
): TimeOption[] {
  const options: TimeOption[] = [];
  const start = startHour * 60;
  const end = endHour * 60 + 45; // include :45
  for (let m = start; m <= end; m += stepMinutes) {
    options.push({ value: to24h(m), label: to12h(m) });
  }
  return options;
}

function to24h(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  const hhStr = h.toString().padStart(2, "0");
  const mmStr = mm.toString().padStart(2, "0");
  return `${hhStr}:${mmStr}`; // e.g. "17:30"
}

function to12h(totalMinutes: number) {
  let h = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const mmStr = mm.toString().padStart(2, "0");
  return `${h}:${mmStr} ${ampm}`; // e.g. "5:30 PM"
}

export const TIME_OPTIONS = buildTimes();

export const OPEN_TIME_OPTIONS: TimeOption[] = [...TIME_OPTIONS];

export const CLOSE_TIME_OPTIONS: TimeOption[] = [
  ...TIME_OPTIONS,
  { value: "24:00", label: "12:00 AM (next day)" },
];
