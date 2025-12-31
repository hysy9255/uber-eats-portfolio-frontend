import { useFormContext } from "react-hook-form";
import type { ICreateOrderForm } from "../pages/CartPage";

const OrderRequest = () => {
  const { register } = useFormContext<ICreateOrderForm>();
  return (
    <div>
      <div>ORDER REQUEST</div>
      <div>
        <div className="font-normal">To restaurant</div>
        <textarea
          {...register("requestToRestaurant")}
          placeholder="Leave a note..."
          className="
          px-2 py-1
          border border-gray-300
        bg-white w-full 
          rounded-sm text-black font-normal"
        />
      </div>
      <div>
        <div className="font-normal">To driver</div>
        <textarea
          {...register("requestToDriver")}
          placeholder="Leave a note..."
          className="
          px-2 py-1
          border border-gray-300
          bg-white w-full 
          rounded-sm text-black font-normal"
        />
      </div>
    </div>
  );
};

export default OrderRequest;
