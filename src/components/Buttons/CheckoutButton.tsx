import { useFormContext } from "react-hook-form";
import { createOrder } from "../../api/orderApi";
import { getToken } from "../../auth";
import { useCart } from "../../ReactContext/cart/UseCart";
import type { DeliveryType } from "../../constants/DeliveryTypeEnums";
import type { CreateOrderForm } from "../../formDataTypes/order/createOrderForm.type";
import { useAddress } from "../../ReactContext/address/UseAddress";
import { useNavigate } from "react-router-dom";

interface CheckoutButtonProps {
  deliveryType: DeliveryType;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ deliveryType }) => {
  const navigate = useNavigate();
  const { cart, emptyCart } = useCart();
  const { address } = useAddress();

  const { handleSubmit } = useFormContext<CreateOrderForm>();
  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }

  const handleCreateOrder = async (data: CreateOrderForm) => {
    if (!cart.restaurantId) return;
    if (!address) return;
    const { orderId } = await createOrder(token, {
      restaurantId: cart.restaurantId,
      deliveryType: deliveryType,
      orderItems: cart.cartItems.map((item) => ({
        dishId: item.dishId,
        quantity: item.quantity,
      })),
      deliveryAddressId: address.deliveryAddressId,
      requestToRestaurant: data.requestToRestaurant,
      requestToDriver: data.requestToDriver,
    });
    navigate(`/client/order-confirm/${orderId}`);
    emptyCart();
  };

  return (
    <button
      onClick={handleSubmit(handleCreateOrder)}
      className="
        bg-purple-700 hover:bg-purple-800 active:bg-purple-900 
        hover:cursor-pointer rounded-md
        text-white text-sm font-medium py-3 w-full"
    >
      CHECKOUT
    </button>
  );
};

export default CheckoutButton;
