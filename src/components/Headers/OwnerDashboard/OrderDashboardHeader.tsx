import { useState } from "react";
import Dropdown from "../../Dropdowns/Dropdown";
import {
  StatusFilterOptions,
  TimeFilterOptions,
} from "../../../constants/OrderStatus";
import { useOwnerOrder } from "../../../ReactContext/ownerOrder/UseOwnerOrder";

const OrderDashboardHeader = () => {
  const {
    // numOfOrders,
    statusFilterOption,
    setStatusFilterOption,
    handleClickFilter,
  } = useOwnerOrder();

  const [timeFilterOption, setTimeFilterOption] = useState<TimeFilterOptions>(
    TimeFilterOptions.allTime
  );

  return (
    <h3 className="flex gap-4 justify-start items-center">
      <div className="flex gap-3">
        <Dropdown
          options={Object.values(StatusFilterOptions)}
          option={statusFilterOption}
          setOption={setStatusFilterOption}
          isEditing={true}
          widthCss="w-40"
          isRegular={true}
        />
        <Dropdown
          options={Object.values(TimeFilterOptions)}
          option={timeFilterOption}
          setOption={setTimeFilterOption}
          isEditing={true}
          widthCss="w-40"
          isRegular={true}
        />

        <button
          className="rounded-sm border border-gray-300 text-sm text-gray-700 font-medium w-30 px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer"
          onClick={handleClickFilter}
        >
          Filter
        </button>
        {/* <button
          onClick={handleClickFilter}
          className="bg-blue-400 
          hover:bg-blue-500 active:bg-blue-600 
          hover:cursor-pointer  
          text-white font-semibold w-30 px-2 py-1 rounded-md
          text-sm
          "
        >
          Filter
        </button> */}
      </div>
    </h3>
  );
};

export default OrderDashboardHeader;
