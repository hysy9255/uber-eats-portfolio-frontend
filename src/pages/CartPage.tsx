import { useCallback, useEffect, useState } from "react";
import AddressDropdown from "../components/Dropdowns/AddressDropdown";
import AlarmHeader from "../components/Headers/AlarmHeader";
import CartHeader from "../components/Headers/CartHeader";
import CheckoutButton from "../components/Buttons/CheckoutButton";
import restaurantLogo from "../logos/restaurantLogo.png";
import GlobalLayout from "../components/GlobalLayout";
import LoginButton from "../components/Buttons/LoginButton";
import MainHeaderV2 from "../components/Headers/MainHeaderV2";
import ProfileHeader from "../components/Headers/ProfileHeader";
import CartItemCard from "../components/Cards/CartItemCard";
import { useCart } from "../ReactContext/cart/UseCart";
import { Link } from "react-router-dom";
import { getRestaurantName } from "../api/restaurantApi";
import { DeliveryType } from "../constants/DeliveryTypeEnums";
import DeliveryTypeComponent from "../components/DeliveryTypeComponent";
import OrderRequest from "../components/OrderRequest";
import { createOrder } from "../api/orderApi";
import { getToken } from "../auth";
import { FormProvider, useForm } from "react-hook-form";

export interface ICreateOrderForm {
  requestToRestaurant: string | null;
  requestToDriver: string | null;
}

const CartPage = () => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.free
  );
  const deliveryFee = 4.75;
  const { cart, calculatTotalCost } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  const methods = useForm<ICreateOrderForm>({
    mode: "onSubmit",
    defaultValues: {
      requestToRestaurant: null,
      requestToDriver: null,
    },
  });

  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }

  const handleCreateOrder = async (data: ICreateOrderForm) => {
    if (!cart.restaurantId) return;
    await createOrder(token, {
      restaurantId: cart.restaurantId,
      deliveryType: deliveryType,
      orderItems: cart.cartItems.map((item) => ({
        dishId: item.dishId,
        quantity: item.quantity,
      })),
      requestToRestaurant: data.requestToRestaurant,
      requestToDriver: data.requestToDriver,
    });
  };

  const calculateFinalPrice = () => {
    const subTotal = calculatTotalCost();

    if (deliveryType === DeliveryType.direct) {
      return subTotal + deliveryFee;
    } else {
      return subTotal;
    }
  };

  const loadRestaurantName = useCallback(async () => {
    if (cart.restaurantId) {
      const restaurantName = await getRestaurantName(cart.restaurantId);
      setRestaurantName(restaurantName);
    } else {
      setRestaurantName(null);
    }
  }, [cart.restaurantId]);

  useEffect(() => {
    loadRestaurantName();
  }, [loadRestaurantName]);

  return (
    <GlobalLayout>
      <MainHeaderV2
        signIn={<LoginButton />}
        profile={<ProfileHeader />}
        cart={<CartHeader />}
        alarm={<AlarmHeader />}
      />
      <main
        className={`
            w-[100px] mx-auto
            min-[460px]:w-[410px]
            min-[700px]:w-[650px]
            min-[1000px]:w-[950px]
            min-[1300px]:w-[1250px]
            min-[1800px]:w-[1750px]
            grid ${cart.restaurantId ? "grid-cols-[5fr_2fr]" : "grid-cols-1"}
          `}
      >
        <section className="py-10 px-5">
          <article
            className="
            flex justify-between items-end border-b-2 border-gray-200 pb-5"
          >
            {restaurantName ? (
              <Link to={`/restaurants/${cart.restaurantId}`}>
                <div className="flex gap-2 hover:cursor-pointer">
                  <img
                    className={`w-5 h-5 self-center object-contain ${
                      restaurantName ? "block" : "hidden"
                    }`}
                    src={restaurantLogo}
                  />
                  <h1 className="font-semibold text-xl leading-none">
                    {restaurantName}
                  </h1>
                </div>
              </Link>
            ) : (
              <h1 className="font-semibold text-xl leading-none">
                Shopping Cart
              </h1>
            )}

            <div className="font-semibold text-lg leading-none">
              {cart.cartItems.length} Items
            </div>
          </article>
          <article
            className="
            text-xs font-semibold text-gray-600 
            grid grid-cols-[6fr_2fr_1fr_1fr]
            pt-5 space-y-5 space-x-2 leading-none
            "
          >
            <h2 className="">PRODUCT DETAILS</h2>
            <h2 className="flex justify-center">QUANTITY</h2>
            <h2 className="">PRICE</h2>
            <h2 className="">TOTAL</h2>
            {cart.cartItems.map((item, index) => (
              <CartItemCard key={index} dishId={item.dishId} />
            ))}
          </article>
          <article className="flex justify-end">
            {cart.restaurantId && (
              <Link to={`/restaurants/${cart.restaurantId}`}>
                <button
                  className="
              text-blue-500 bg-white
                border border-blue-500
                rounded-full px-3 py-1 text-xs font-semibold
                hover:cursor-pointer
            "
                >
                  ADD MENU
                </button>
              </Link>
            )}
          </article>
        </section>

        {cart.restaurantId && (
          <FormProvider {...methods}>
            <aside className="bg-gray-100 py-10 px-5">
              <article
                className="
              font-semibold text-xl 
              mb-5 leading-none"
              >
                Order Summary
              </article>
              <article
                className="
              text-sm font-semibold text-gray-600 
              py-5 space-y-5
              border-y-2 border-gray-300"
              >
                <div className="flex justify-between leading-none">
                  <h2>ITEMS {cart.cartItems.length}</h2>
                  <div>${calculatTotalCost()}</div>
                </div>
                <div
                  className="
                space-y-5 leading-none"
                >
                  <h2>ADDRESS</h2>
                  <AddressDropdown
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    isDropdownOpen={dropdownOpen}
                  />
                </div>
                <div className="space-y-2">
                  <DeliveryTypeComponent
                    onClick={() => {
                      setDeliveryType(DeliveryType.free);
                    }}
                    deliveryTypeState={deliveryType}
                    assignedDeliveryType={DeliveryType.free}
                    cost="Free"
                    eta="35-45 mins"
                    title="Free Delivery"
                  />
                  <DeliveryTypeComponent
                    onClick={() => {
                      setDeliveryType(DeliveryType.direct);
                    }}
                    deliveryTypeState={deliveryType}
                    assignedDeliveryType={DeliveryType.direct}
                    cost={`+ $${deliveryFee}`}
                    eta="20-30 mins"
                    title="Direct Delivery"
                  />
                </div>
                <div>
                  <OrderRequest />
                </div>
              </article>
              <article
                className="
              text-sm font-semibold text-gray-600
              py-5 space-y-5"
              >
                <div className="flex justify-between leading-none">
                  <h2>TOTAL COST</h2>
                  <div>${calculateFinalPrice()}</div>
                </div>
                <CheckoutButton
                  onClick={methods.handleSubmit(handleCreateOrder)}
                />
              </article>
            </aside>
          </FormProvider>
        )}
      </main>
    </GlobalLayout>
  );
};

export default CartPage;
