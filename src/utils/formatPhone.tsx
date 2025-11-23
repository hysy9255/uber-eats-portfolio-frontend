export const formatPhone = (num?: string) => {
  if (!num) return "";
  return num.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};
