import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../components/Cards/ReviewCard";
import { useCart } from "../ReactContext/cart/UseCart";
import { getDishPage } from "../api/dishApi";
import NoImgAvailable from "../components/Images/NoImgAvailable/NoImgAvailable";
import type { GetDishPageDTO } from "../dtos/dish/GetDishPage.dto";
import { useAuth } from "../ReactContext/auth/UseAuth";
import PageNotFound from "./PageNotFound";
import CartErrorModal from "../components/Modals/CartErrorModal";
import { useQuantity } from "../hooks/useQuantity";
import DishDescSection from "../components/DishDescSection";
import DishCardForDishPage from "../components/Cards/DishCardForDishPage";

const DishPage = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const { addItem, clearAndAddNewItem } = useCart();
  const { dishId, restaurantId } = useParams();
  const [dishPage, setDishPage] = useState<GetDishPageDTO>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [addToCartError, setAddToCartError] = useState<string>();

  useEffect(() => {
    if (!dishId) return;
    const load = async () => {
      try {
        const dishPage = await getDishPage(dishId);
        setDishPage(dishPage);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      }
    };
    load();
  }, [dishId]);

  const { quantity, increment, decrement } = useQuantity();

  const totalPrice = dishPage
    ? (dishPage.dish.price * quantity).toFixed(2)
    : "0.00";

  const handleAddToCart = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    if (!dishPage) return;

    try {
      addItem({ ...dishPage?.dish, quantity });
      navigate(`/client/restaurants/${restaurantId}`);
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      setAddToCartError(msg);
    }
  };

  const handleClickAddAnyway = () => {
    if (!dishPage) return;
    clearAndAddNewItem({ ...dishPage?.dish, quantity });
    setAddToCartError(undefined);
  };

  if (!restaurantId) return <PageNotFound />;
  if (notFound) return <PageNotFound />;

  return (
    <main className="p-2">
      {addToCartError && (
        <CartErrorModal
          onClickCancel={() => setAddToCartError(undefined)}
          onClickAddAnyway={handleClickAddAnyway}
        />
      )}
      <div className="grid grid-cols-1 min-[811px]:grid-cols-[1fr_420px] mx-auto gap-6 max-w-[1000px]">
        <section id="dish">
          <div>
            {dishPage?.dish.dishImgUrl ? (
              <img
                className="rounded-md border border-gray-200 w-full aspect-[5/3] object-cover"
                src={dishPage.dish.dishImgUrl}
              />
            ) : (
              <NoImgAvailable className="rounded-md aspect-[4/3] min-[811px]:aspect-[2/3] min-[900px]:aspect-[4/3] object-contain border border-gray-200" />
            )}
          </div>

          <div className="block min-[811px]:hidden mt-3">
            <DishDescSection
              restaurantId={restaurantId}
              dishPage={dishPage}
              handleAddToCart={handleAddToCart}
              totalPrice={totalPrice}
              decrement={decrement}
              increment={increment}
              quantity={quantity}
            />
          </div>

          <section id="reviews" className="space-y-1 mt-3">
            <div className="font-semibold text-lg ">Reviews</div>
            <div className="flex flex-col gap-3">
              <ReviewCard
                dishImgUrl={dishPage?.dish.dishImgUrl}
                review="언제나 맛있네요"
                rating={3}
                userName="John Doe"
              />
              <ReviewCard
                dishImgUrl={dishPage?.dish.dishImgUrl}
                review="뻐르게 배달왔고 맛있어요 ㅎㅎ 고기조금 추가해서 먹으면 더 좋아요..."
                rating={5}
                userName="Shannon Lee"
              />
              <ReviewCard
                dishImgUrl={dishPage?.dish.dishImgUrl}
                review="맛있어여!! 저는 구이밥이 더맛나는거같아여ㅎ"
                rating={3.6}
                userName="Curtis Ryu"
              />
              <ReviewCard
                dishImgUrl={dishPage?.dish.dishImgUrl}
                review="항상 먹는 곳이에요. 매일 먹은 적도 있어요!"
                rating={4.3}
                userName="Randy Qi"
              />
            </div>
          </section>
        </section>
        <section className="hidden min-[811px]:block">
          <div className="sticky top-2">
            <DishDescSection
              restaurantId={restaurantId}
              dishPage={dishPage}
              handleAddToCart={handleAddToCart}
              totalPrice={totalPrice}
              decrement={decrement}
              increment={increment}
              quantity={quantity}
            />
            <section id="other-menus" className=" space-y-1 mt-3">
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
          </div>
        </section>
      </div>
    </main>
  );
};

export default DishPage;
