export enum OrderStatus {
  Pending = "Pending",
  Cooking = "Cooking",
  Ready = "Ready",
  Delivering = "Delivering",
  Delivered = "Delivered",
}

export enum StatusFilterOptions {
  allStatus = "All Status",
  Pending = OrderStatus.Pending,
  Cooking = OrderStatus.Cooking,
  Ready = OrderStatus.Ready,
  Delivering = OrderStatus.Delivering,
  Delivered = OrderStatus.Delivered,
}

export const statusOptionToStatus: Partial<
  Record<StatusFilterOptions, OrderStatus>
> = {
  [StatusFilterOptions.Pending]: OrderStatus.Pending,
  [StatusFilterOptions.Cooking]: OrderStatus.Cooking,
  [StatusFilterOptions.Ready]: OrderStatus.Ready,
  [StatusFilterOptions.Delivering]: OrderStatus.Delivering,
  [StatusFilterOptions.Delivered]: OrderStatus.Delivered,
};

export enum TimeFilterOptions {
  allTime = "All Time",
  past24Hours = "Past 24 Hours",
  past7Days = "Past 7 Days",
  past30Days = "Past 30 Days",
}
