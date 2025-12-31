export enum OrderStatus {
  Pending = "Pending",
  Cooking = "Cooking",
  Ready = "Ready",
  Delivering = "Delivering",
  Delivered = "Delivered",
}

export enum StatusFilterOptions {
  allStatus = "All Status",
  pending = OrderStatus.Pending,
  cooking = OrderStatus.Cooking,
  ready = OrderStatus.Ready,
  delivering = OrderStatus.Delivering,
  delivered = OrderStatus.Delivered,
}

export enum TimeFilterOptions {
  allTime = "All Time",
  past24Hours = "Past 24 Hours",
  past7Days = "Past 7 Days",
  past30Days = "Past 30 Days",
}
