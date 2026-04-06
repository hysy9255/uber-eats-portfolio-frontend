import type { MenuRankingDataType } from "../constants/MenuRankingColumns";

export enum RankingFilter {
  rating = "Ratings",
  sold = "# of Sold",
  review = "# of Reviews",
}

export const filterMenus = (
  menus: MenuRankingDataType[],
  filterOption: RankingFilter
) => {
  if (filterOption === RankingFilter.rating) {
    return menus.sort((a, b) => b.ratings - a.ratings);
  } else if (filterOption === RankingFilter.sold) {
    return menus.sort((a, b) => b.numOfSold - a.numOfSold);
  } else {
    return menus.sort((a, b) => b.numOfReviews - a.numOfReviews);
  }
};
