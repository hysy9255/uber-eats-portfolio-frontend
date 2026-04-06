import type { MenuRankingDataType } from "../constants/MenuRankingColumns";

export const calculateRanks = (data: MenuRankingDataType[]) => {
  return data
    .sort((a, b) => b.numOfSold - a.numOfSold)
    .map((menu, index) => ({ ...menu, soldRank: index + 1 }))
    .sort((a, b) => b.numOfReviews - a.numOfReviews)
    .map((menu, index) => ({ ...menu, reviewsRank: index + 1 }))
    .sort((a, b) => b.ratings - a.ratings)
    .map((menu, index) => ({ ...menu, ratingsRank: index + 1 }));
};
