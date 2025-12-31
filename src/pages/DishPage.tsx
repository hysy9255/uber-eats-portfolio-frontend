import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/Headers/ProfileHeader";
import CartHeader from "../components/Headers/CartHeader";
import AlarmHeader from "../components/Headers/AlarmHeader";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import ReviewCard from "../components/Cards/ReviewCard";
import DishCardForDishPage from "../components/Cards/DishCardForDishPage";
import GlobalLayout from "../components/GlobalLayout";
import AddMenuToCartComponent from "../components/AddMenuToCartComponent";
import restaurantLogo from "../logos/restaurantLogo.png";
import { useCart } from "../ReactContext/cart/UseCart";
import { getDishPage } from "../api/dishApi";
import NoImgAvailable from "../components/Images/NoImgAvailable/NoImgAvailable";

interface Dish {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl: string;
}

export interface CartItem extends Dish {
  quantity: number;
}

const DishPage = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { dishId, restaurantId } = useParams();
  const [dishPage, setDishPage] = useState<{
    dish: Dish;
    dba: string;
    dishes: Dish[];
  } | null>(null);

  if (!restaurantId) {
    throw new Error("Error");
  }

  if (!dishId) {
    throw new Error("No Dish Id");
  }

  useEffect(() => {
    const load = async () => {
      const dishPage = await getDishPage(dishId);
      setDishPage(dishPage);
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

  const totalPrice = dishPage
    ? (dishPage.dish.price * quantity).toFixed(2)
    : "0.00";

  const handleAddToCart = () => {
    if (!dishPage) return;
    addItem({ ...dishPage?.dish, quantity });
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <GlobalLayout>
      <MainHeaderV2
        // hamburger={<HamburgerHeader />}
        // signIn={<LoginButton />}
        // searchBar={<SearchBar />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />

      <main
        className={`
        py-5
        mx-auto
        min-[460px]:w-[410px]
        min-[700px]:w-[650px]
        min-[1000px]:w-[950px]
        space-y-3
        `}
      >
        <section
          id="dish"
          className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-5"
        >
          {dishPage?.dish.dishImgUrl ? (
            <img
              className="rounded-md aspect-[4/3] object-cover"
              src={dishPage.dish.dishImgUrl}
            />
          ) : (
            <NoImgAvailable className="rounded-md aspect-[4/3] object-contain border border-gray-200" />
          )}

          <article className=" space-y-5">
            <div>
              <Link to={`/restaurants/${restaurantId}`}>
                <div
                  className="
                  flex items-center gap-x-2 
                  font-semibold font-serif 
                  hover:cursor-pointer text-md pb-2"
                >
                  <img className="rounded-full w-7 h-7" src={restaurantLogo} />
                  <div>{dishPage?.dba}</div>
                </div>
              </Link>

              <div className="font-semibold text-4xl">
                {dishPage?.dish.name}
              </div>
              <div className="text-md text-gray-700">
                {dishPage?.dish.description}
              </div>
            </div>
            <AddMenuToCartComponent
              onClickAddToCart={handleAddToCart}
              totalPrice={totalPrice}
              decrement={decrement}
              increment={increment}
              quantity={quantity}
            />
          </article>
        </section>
        <section id="reviews" className="space-y-1 ">
          <div className="font-semibold text-lg ">Reviews</div>
          <div className="flex overflow-x-auto gap-3">
            <ReviewCard
              dishImgUrl={dishPage?.dish.dishImgUrl}
              review="언제나 맛있네요"
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dishPage?.dish.dishImgUrl}
              review="뻐르게 배달왔고 맛있어요 ㅎㅎ 고기조금 추가해서 먹으면 더 좋아요..."
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dishPage?.dish.dishImgUrl}
              review="맛있어여!! 저는 구이밥이 더맛나는거같아여ㅎ"
              star="⭐️⭐️⭐️⭐️"
            />
            <ReviewCard
              dishImgUrl={dishPage?.dish.dishImgUrl}
              review="항상 먹는 곳이에요. 매일 먹은 적도 있어요!"
              star="⭐️⭐️⭐️⭐️"
            />
          </div>
        </section>
        <section id="other-menus" className=" space-y-1">
          <div className="font-semibold text-lg">Other Menus</div>
          <div className="flex gap-x-3 overflow-x-auto">
            {dishPage?.dishes.map((dish) => (
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
        </section>
      </main>
    </GlobalLayout>
  );
};

export default DishPage;
