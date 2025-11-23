export function getCurrentDateTime() {
  const now = new Date();

  const date = now.toISOString().split("T")[0]; // 2025-11-07
  const day = now.toLocaleDateString("en-US", { weekday: "short" }); // Friday
  const time = now.toLocaleTimeString("en-US", { hour12: false }); // 17:32:10

  return { date, day, time };
}
