import type { Day, DayHours } from "../pages/OwnerOnboardingStep3Location";

const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function formatHoursShort(hours: Record<Day, DayHours>) {
  // 모두 같은 시간/상태면 "Daily ..." 로 축약
  const first = hours["Mon"];
  const allSame = DAYS.every((d) => {
    const h = hours[d];
    return (
      h.open === first.open &&
      h.close === first.close &&
      h.open24 === first.open24 &&
      h.closed === first.closed
    );
  });

  const fmtOne = (h: DayHours) => {
    if (h.closed) return "Closed";
    if (h.open24) return "Open 24 hours";
    if (!h.open || !h.close) return "Hours not set";
    return `${h.open} – ${h.close}`;
  };

  if (allSame) {
    return `Daily ${fmtOne(first)}`;
  }
  // 다르면 간단 요약: 월–금, 토, 일 패턴 시도
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"] as Day[];
  const weekend = ["Sat", "Sun"] as Day[];
  const sameWeekday = weekday.every(
    (d) => JSON.stringify(hours[d]) === JSON.stringify(hours["Mon"])
  );
  const sameWeekend = weekend.every(
    (d) => JSON.stringify(hours[d]) === JSON.stringify(hours["Sat"])
  );
  if (sameWeekday && sameWeekend) {
    return `Weekdays ${fmtOne(hours["Mon"])} · Weekend ${fmtOne(hours["Sat"])}`;
  }

  return "Varies by day";
}
