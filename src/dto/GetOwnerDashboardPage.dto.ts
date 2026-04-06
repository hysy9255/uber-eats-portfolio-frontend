export type DailyRevenue = {
  date: string;
  revenue: number;
};

export type GetOwnerDashBoardPageDTO = {
  orderKpi: {
    numOfOrders: number;
    revenue: number;
    avgOrder: number;
    numOfReviews: number;
  };
  revenueStats: {
    percentChange?: string;
    revenueGraphData: DailyRevenue[];
  };
};
