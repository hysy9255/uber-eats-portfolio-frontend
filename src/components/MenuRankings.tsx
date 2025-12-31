import { Fragment, useState } from "react";
import DropdownButton from "./Dropdowns/DropdownButton";
import { filterMenus, RankingFilter } from "../utils/filterMenus";
import { calculateRanks } from "../utils/calculateRanks";
import {
  menuRankingData,
  menuRankingTableColumns,
} from "../constants/MockOrdersData";

const MenuRankings = () => {
  const [rankingFilter, setRankingFilter] = useState<RankingFilter>(
    RankingFilter.sold
  );
  return (
    <div className="border border-gray-300 rounded-md p-3 space-y-2">
      <div className="flex justify-between">
        <div className="text-sm font-semibold flex items-center">
          Menu Rankings
        </div>
        <DropdownButton
          options={[
            RankingFilter.sold,
            RankingFilter.review,
            RankingFilter.rating,
          ]}
          width="w-[120px]"
          filter={rankingFilter}
          setFilter={setRankingFilter}
        />
      </div>

      <div className="grid grid-cols-[1fr_6fr_repeat(6,_3fr)] text-sm">
        <>
          {menuRankingTableColumns.map((column, index) => (
            <h2
              key={index}
              className="text-sm font-semibold text-gray-600 text-nowrap p-2 border-b border-gray-300"
            >
              {column}
            </h2>
          ))}
        </>
        {filterMenus(calculateRanks(menuRankingData), rankingFilter).map(
          (menu, index) => (
            <Fragment key={index}>
              <div className=" text-sm  p-2">{index + 1}</div>
              <div className=" text-sm text-nowrap p-2 hover:underline hover:cursor-pointer">
                {menu.name}
              </div>
              <div className=" text-sm  p-2">{menu.numOfSold}</div>
              <div className=" text-sm  p-2">{menu.numOfReviews}</div>
              <div className=" text-sm  p-2">{menu.ratings}</div>
              <div className=" text-sm  p-2">{menu.soldRank}</div>
              <div className=" text-sm  p-2">{menu.reviewsRank}</div>
              <div className=" text-sm  p-2">{menu.ratingsRank}</div>
            </Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default MenuRankings;
