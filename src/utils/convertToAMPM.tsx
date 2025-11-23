export function convertToAMPM(time?: string | null) {
  if (!time) return ""; // 또는 return "—";

  // 허용 포맷: "HH:mm" 또는 "HH:mm:ss"
  const parts = time.split(":");
  if (parts.length < 2) return "";

  const hour = Number(parts[0]);
  const minute = Number(parts[1]) || 0;

  if (Number.isNaN(hour) || Number.isNaN(minute)) return "";

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
