import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import OwnerMainHeader from "../components/Headers/OwnerMainHeader";
import { useAuth } from "../ReactContext/auth/UseAuth";

export type Restaurant = {
  restaurantId: string;
  name: string;
  address: string;
  restaurantImgUrl: string;
  restaurantImgUrl2: string;
  restaurantImgUrl3: string;
};

type Dish = {
  dishId: string;
  name: string;
  price: number;
  descriptions: string;
  category: string;
  dishImgUrl: string;
};

type Buckets = {
  [category: string]: Dish[];
};

type Category = string;

const MyRestaurantPage = () => {
  const { token } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const toggleSideBar = () => {
    if (sideBarOpen) {
      setSideBarOpen(false);
    }
    if (!sideBarOpen) {
      setSideBarOpen(true);
    }
  };

  // const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [buckets, setBuckets] = useState<Buckets>({});
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (!token) {
      throw new Error("no token error");
    }

    const load = async () => {
      const restaurantResponse = await fetch(
        "http://localhost:3002/restaurants/my-restaurant",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": token,
          },
        }
      );

      const restaurant = await restaurantResponse.json();
      console.log(restaurant);
      setRestaurant({
        restaurantId: restaurant.restaurantId,
        name: restaurant.name,
        address: restaurant.address,
        restaurantImgUrl: restaurant.restaurantImgUrl,
        restaurantImgUrl2: restaurant.restaurantImgUrl2,
        restaurantImgUrl3: restaurant.restaurantImgUrl3,
      });

      const dishResponse = await fetch(
        `http://localhost:3002/restaurants/${restaurant.restaurantId}/dishes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dishes = await dishResponse.json();

      const buckets: Record<string, Dish[]> = {};

      for (const d of dishes) {
        const cat = d.category;
        (buckets[cat] ??= []).push(d);
      }

      const categories = Object.keys(buckets);
      setCategories(categories);
      setBuckets(buckets);
    };

    load();
  }, [token]);

  if (!restaurant) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <>
      <div
        id="outer"
        className="min-h-screen flex flex-col p-[clamp(5px,min(2vh,2vw),20px)]"
      >
        <SideBar toggleSideBar={toggleSideBar} sideBarOpen={sideBarOpen} />
        <div
          id="main-header"
          className="h-fit pb-[clamp(5px,min(2vh,2vw),20px)]"
        >
          <OwnerMainHeader toggleSideBar={toggleSideBar} />
        </div>
        <div id="restaurant-img" className="relative">
          <div
            className="aspect-[20/4]  bg-cover bg-center"
            style={{
              backgroundImage: `url(${restaurant?.restaurantImgUrl})`,
            }}
          ></div>
          <div className="absolute flex flex-col items-center justify-center mx-auto inset-x-0 transform -translate-y-1/2 w-3/4 aspect-[10/1] bg-white rounded-md shadow-lg z-10">
            <div className="text-center">
              <div className="text-lg md:text-4xl font-bold">
                {restaurant?.name}
              </div>
              <div className="text-sm md:text-lg font-light">
                {restaurant?.address}
              </div>
            </div>
          </div>
        </div>

        {/* <div
          id="dish-list"
          className="flex flex-col justify-evenly gap-y-2 mt-10 md:mt-20 p-2 md:px-0 flex-1"
        >
          {categories.map((cat) => (
            <>
              <div className="grid gap-y-4">
                <div className="text-sm sm:text-xl md:text-3xl font-medium text-gray-500 bg-white">
                  {cat}
                </div>
                <div className="flex flex-col gap-4">
                  {buckets[cat].map((dish) => (
                    <DishCard
                      key={dish.dishId}
                      restaurantId={restaurant.restaurantId}
                      dishId={dish.dishId}
                      name={dish.name}
                      price={dish.price}
                      descriptions={dish.descriptions}
                      dishImgUrl={dish.dishImgUrl}
                    />
                  ))}
                </div>
              </div>
            </>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default MyRestaurantPage;
