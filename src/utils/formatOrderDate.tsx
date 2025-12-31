export const formatOrderDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
