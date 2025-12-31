export function formatCurrency(input: number) {
  return input.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
