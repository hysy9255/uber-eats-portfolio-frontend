import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
// import HamburgerHeader from "../components/hamburgerHeader";
// import LoginButton from "../components/LoginButton";
// import SearchBar from "../components/SearchBar";
import ProfileHeader from "../components/ProfileHeader";
import CartHeader from "../components/CartHeader";
import AlarmHeader from "../components/AlarmHeader";
import MainHeaderV2 from "../components/MainHeaderV2";
import ReviewCard from "../components/ReviewCard";
// import DishCard from "../components/DishCard";
// import { truncateChars } from "../utils/truncateChars";
import DishCardForDishPage from "../components/DishCardForDishPage";
import RightChevron from "../components/RightChevron";
import DownChevron from "../components/DownChevron";
// import AddToCartComponent from "../components/AddToCartComponent";
import noImgAvailable from "../images/no_imgae.png";

type Dish = {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl: string;
};
// const rail = "mx-auto max-w-screen-xl px-6";
const rail = "";

const DishPage = () => {
  const { dishId, restaurantId } = useParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [nutritionOpen, setNutritionOpen] = useState<boolean>(false);
  const [ingredientOpen, setIngredientOpen] = useState<boolean>(false);

  if (!restaurantId) {
    throw new Error("Error");
  }

  useEffect(() => {
    const load = async () => {
      const dishResponse = await fetch(
        `http://localhost:3002/restaurants/${restaurantId}/dishes/${dishId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dish = await dishResponse.json();
      setDish(dish);

      const dishesReponse = await fetch(
        `http://localhost:3002/restaurants/${restaurantId}/dishes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dishes = await dishesReponse.json();
      setDishes(dishes);
    };

    load();
  }, [dishId, restaurantId]);

  const useQuantity = (
    initialQuantity: number = 1,
    minQuantity: number = 1
  ) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => setQuantity((prev) => prev + 1);

    const decrement = () =>
      setQuantity((prev) => (prev > minQuantity ? prev - 1 : prev));

    return { quantity, increment, decrement };
  };

  const { quantity, increment, decrement } = useQuantity();

  const totalPrice = dish ? (dish.price * quantity).toFixed(2) : "0.00";

  return (
    <div className="px-3 select-none">
      <MainHeaderV2
        layoutWidth={rail}
        // hamburger={<HamburgerHeader />}
        // signIn={<LoginButton />}
        // searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />

      <main
        className={`mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl sm:p-3 sm:space-y-3`}
      >
        {/* <div className="p-3 space-y-3"> */}
        <div
          id="dish"
          className="sm:gap-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.3fr_1fr_0.7fr]"
        >
          <div id="1" className="p-3 bg-white rounded-md ">
            {dish?.dishImgUrl ? (
              <img
                className="rounded-md aspect-[8/5] sm:aspect-[4/3] object-cover"
                src={dish?.dishImgUrl}
              />
            ) : (
              <img
                className="rounded-md aspect-[8/5] sm:aspect-[4/3] object-contain border"
                src={noImgAvailable}
              />
            )}
          </div>
          <div id="2" className="rounded-md px-3 sm:py-3 bg-white ">
            <div className="pl-1 sm:pl-0 space-y-2 sm:space-y-5 ">
              <div className="space-y-1 ">
                <div className="font-semibold text-2xl sm:text-4xl">
                  {dish?.name}
                </div>
                <div className="text-sm sm:text-md text-gray-700">
                  {dish?.description}
                </div>
              </div>
              <div id="nutrition-table" className="space-y-2 select-none">
                <div className="flex items-center">
                  <div className="font-semibold text-md ">Nutrition</div>
                  {!nutritionOpen && (
                    <div
                      className=" px-2"
                      onClick={() => setNutritionOpen(true)}
                    >
                      <RightChevron />
                    </div>
                  )}
                  {nutritionOpen && (
                    <div
                      className=" px-2"
                      onClick={() => setNutritionOpen(false)}
                    >
                      <DownChevron />
                    </div>
                  )}
                </div>
                {nutritionOpen && (
                  <div className="border border-gray-300 shadow-md rounded-md px-3 py-1 text-sm">
                    <div className="flex justify-between border-b border-gray-300">
                      <div className="font-semibold">Calories</div>
                      <div className="text-gray-700">450 kcal</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-300">
                      <div className="font-semibold">Carbs</div>
                      <div className="text-gray-700">30 g</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-300">
                      <div className="font-semibold">Protein</div>
                      <div className="text-gray-700">10 g</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold">Fat</div>
                      <div className="text-gray-700">25 g</div>
                    </div>
                  </div>
                )}
              </div>

              <div id="ingredients" className="select-none">
                <div className="flex items-center">
                  <div className="font-semibold text-md">Ingredients</div>
                  {!ingredientOpen && (
                    <div
                      className="px-2"
                      onClick={() => setIngredientOpen(true)}
                    >
                      <RightChevron />
                    </div>
                  )}
                  {ingredientOpen && (
                    <div
                      className="px-2"
                      onClick={() => setIngredientOpen(false)}
                    >
                      <DownChevron />
                    </div>
                  )}
                </div>
                {ingredientOpen && (
                  <div className="grid grid-cols-2 px-3 py-1">
                    <div>• Romaine lettuce</div>
                    <div>• Croutons</div>
                    <div>• Parmesan cheese</div>
                    <div>• Lemon</div>
                    <div>• Garlic</div>
                    <div>• Olive oil</div>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>

          <div
            id="3"
            className="lg:col-span-2 xl:col-span-1 bg-white rounded-md"
          >
            <div className="p-1 sm:bg-gradient-to-tr from-blue-600 via-teal-400 to-emerald-300 rounded-md">
              <div className="p-3 rounded-md space-y-3 bg-white">
                <div className="font-semibold text-lg hidden sm:block">
                  {dish?.name}
                </div>
                <div
                  id="price-box"
                  className=" bg-white border border-gray-100 rounded-lg shadow-md py-2 px-3 flex justify-between"
                >
                  <div className="text-sm font-semibold flex items-center">
                    Price
                  </div>
                  <div className="text-sm font-semibold flex justify-center items-center">
                    $ {totalPrice}
                  </div>
                </div>
                <div
                  id="quantity-box"
                  className="bg-white border border-gray-100 rounded-lg shadow-md py-2 px-3 flex justify-between"
                >
                  <div className="text-sm font-semibold flex items-center">
                    Quantity
                  </div>
                  <div className="gap-x-2 flex justify-center items-center">
                    <button
                      onClick={decrement}
                      className="text-gray-700 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-sm w-4 flex justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increment}
                      className="text-gray-700 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="active:scale-98 transition duration-150 ease-out cursor-pointer bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 text-white rounded-md flex items-center justify-center p-3">
                  Add to cart
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="reviews" className="px-3 sm:py-3 bg-white rounded-md">
          <div className="font-semibold text-lg ">Reviews</div>
          <div className="flex overflow-x-auto gap-3 p-3">
            <ReviewCard
              dishImgUrl={dish?.dishImgUrl}
              review="언제나 맛있네요"
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dish?.dishImgUrl}
              review="뻐르게 배달왔고 맛있어요 ㅎㅎ 고기조금 추가해서 먹으면 더 좋아요..."
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dish?.dishImgUrl}
              review="맛있어여!! 저는 구이밥이 더맛나는거같아여ㅎ"
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dish?.dishImgUrl}
              review="항상 먹는 곳이에요. 매일 먹은 적도 있어요!"
              star="⭐️⭐️⭐️⭐️"
            />
          </div>
        </div>
        <div id="other-menus" className="px-3 sm:py-3 bg-white rounded-md">
          <div className="font-semibold text-lg">Other Menus</div>
          <div className="flex overflow-x-auto gap-3 w-full">
            {dishes.map((dish) => (
              <DishCardForDishPage
                key={dish.dishId}
                restaurantId={restaurantId}
                dishId={dish.dishId}
                name={dish.name}
                price={dish.price}
                dishImgUrl={dish.dishImgUrl}
              />
            ))}
          </div>
        </div>
        {/* </div> */}

        {/* <div className="w-full sticky bottom-0 block lg:hidden">
          <div className="rounded-md bg-white">
            <div className="p-1 bg-gradient-to-tr from-blue-600 via-teal-400 to-emerald-300 rounded-md">
              <div className="p-1 rounded-md space-y-1 bg-white">
                <div className="flex justify-center">
                  <div
                    id="price-box"
                    className=" flex-1 bg-white border border-gray-100 rounded-lg shadow-md py-2 px-3 flex justify-between"
                  >
                    <div className="text-sm font-semibold flex items-center">
                      Price
                    </div>
                    <div className="text-sm font-semibold flex justify-center items-center">
                      $ {totalPrice}
                    </div>
                  </div>
                  <div
                    id="quantity-box"
                    className="flex-1 bg-white border border-gray-100 rounded-lg shadow-md py-2 px-3 flex justify-between"
                  >
                    <div className="text-sm font-semibold flex items-center">
                      Quantity
                    </div>
                    <div className="gap-x-2 flex justify-center items-center">
                      <button
                        onClick={decrement}
                        className="text-gray-700 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-sm w-4 flex justify-center">
                        {quantity}
                      </span>
                      <button
                        onClick={increment}
                        className="text-gray-700 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="active:scale-98 transition duration-150 ease-out cursor-pointer bg-gradient-to-tr from-blue-600  via-teal-400 to-emerald-300 text-white rounded-md flex items-center justify-center p-3">
                  Add to cart
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </main>
      {/* <footer className="sticky bottom-0 block xl:hidden mx-3">
        <AddToCartComponent
          dishName={dish?.name}
          totalPrice={totalPrice}
          quantity={quantity}
          increment={increment}
          decrement={decrement}
        />
      </footer> */}
    </div>
  );
};

export default DishPage;
