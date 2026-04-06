export type MenuRankingDataType = {
  name: string;
  numOfReviews: number;
  numOfSold: number;
  ratings: number;
  soldRank?: number;
  reviewsRank?: number;
  ratingsRank?: number;
};

export const topMenuRankingTableColumns = ["", "Top Sold Menus", "# of Sold"];
export const leastSoldMenuRankingTableColumns = [
  "",
  "Least Sold Menus",
  "# of Sold",
];
