import { useMyRestaurant } from "../../ReactContext/myRestaurant/UseMyRestaurant";

const OverviewRestaurantNameCard = () => {
  const { restaurant } = useMyRestaurant();
  return (
    <div className="flex items-center gap-1 border border-gray-300 rounded-md bg-white p-3">
      <h1 className="text-lg font-semibold leading-none">
        {restaurant?.restaurantSummary.generalInfo.dba}
      </h1>
      <p className="text-sm leading-none">
        {restaurant?.restaurantSummary.address.unit},{" "}
        {restaurant?.restaurantSummary.address.streetAddress},{" "}
        {restaurant?.restaurantSummary.address.city},{" "}
        {restaurant?.restaurantSummary.address.zip}{" "}
      </p>
    </div>
  );
};

export default OverviewRestaurantNameCard;
