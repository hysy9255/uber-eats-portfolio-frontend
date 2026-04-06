import { useCart } from "../ReactContext/cart/UseCart";
import { FormProvider, useForm } from "react-hook-form";
import CartSummary from "../components/CartSummary";
import OrderSummary from "./OrderSummary";
import type { CreateOrderForm } from "../formDataTypes/order/createOrderForm.type";

const CartPage = () => {
  const { cart } = useCart();

  const methods = useForm<CreateOrderForm>({
    mode: "onSubmit",
  });

  if (cart.cartItems.length === 0) {
    return (
      <section className="p-2">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 py-14 text-center">
          <div className="text-gray-900 font-semibold">
            No items in the cart
          </div>
          <div className="text-sm text-gray-500 mt-2">
            When you add items to the cart, it will show up here.
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className={`grid grid-cols-1 min-[950px]:grid-cols-[5fr_2fr]`}>
      <CartSummary />
      <FormProvider {...methods}>
        <OrderSummary />
      </FormProvider>
    </main>
  );
};

export default CartPage;
