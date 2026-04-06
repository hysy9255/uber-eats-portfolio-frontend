import { Link } from "react-router-dom";
import AddMenuToCartComponent from "./AddMenuToCartComponent";
import DefaultRestaurantLogoImg from "./Images/DefaultRestaurantLogoImg/DefaultRestaurantLogoImg";
import type { GetDishPageDTO } from "../dtos/dish/GetDishPage.dto";
import StarRating from "./StarRating";

interface DishDescSectionProps {
  restaurantId: string;
  dishPage?: GetDishPageDTO;
  handleAddToCart: () => void;
  totalPrice: string;
  decrement: () => void;
  increment: () => void;
  quantity: number;
}

const DishDescSection: React.FC<DishDescSectionProps> = ({
  restaurantId,
  dishPage,
  handleAddToCart,
  totalPrice,
  decrement,
  increment,
  quantity,
}) => {
  return (
    <article className="space-y-5">
      <div>
        <Link to={`/client/restaurants/${restaurantId}`}>
          <div
            className="
          flex items-center gap-x-2 
          font-semibold font-serif 
          hover:cursor-pointer text-md pb-2"
          >
            {dishPage?.restaurantLogo ? (
              <img
                className="rounded-full w-7 h-7"
                src={dishPage?.restaurantLogo}
              />
            ) : (
              <DefaultRestaurantLogoImg className="w-7 h-7 rounded-full border border-gray-400" />
            )}
            <div>{dishPage?.restaurantName}</div>
          </div>
        </Link>

        <div>
          <div className="font-semibold text-4xl">{dishPage?.dish.name}</div>
          <div className="flex">
            <div className="border w-22 py-1 text-center rounded-sm my-2 text-xs">
              Best Seller
            </div>
            <StarRating rating={3.5} className="ml-2" showText={true} />
          </div>
        </div>

        <div className="text-md text-gray-700">
          {dishPage?.dish.description}
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        <li className="grid grid-cols-[140px_1fr] gap-x-3">
          <div className="font-semibold">Spice level:</div>
          <p>Medium</p>
        </li>
        <li className="grid grid-cols-[140px_1fr] gap-x-3">
          <div className="font-semibold">Portion size:</div>
          <p>Regular</p>
        </li>
        <li className="grid grid-cols-[140px_1fr] gap-x-3">
          <div className="font-semibold">Main ingredients:</div>
          <p>Chicken, peanuts, dried chili, bell pepper</p>
        </li>
        <li className="grid grid-cols-[140px_1fr] gap-x-3">
          <div className="font-semibold">Contains:</div>
          <p>Peanuts</p>
        </li>
        <li className="grid grid-cols-[140px_1fr] gap-x-3">
          <div className="font-semibold">Best with:</div>
          <p>Steamed rice or fried rice</p>
        </li>
      </ul>
      <AddMenuToCartComponent
        onClickAddToCart={handleAddToCart}
        totalPrice={totalPrice}
        decrement={decrement}
        increment={increment}
        quantity={quantity}
      />
    </article>
  );
};

export default DishDescSection;
