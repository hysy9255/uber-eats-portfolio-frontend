import MinusButton from "./Buttons/IconBased/MinusButton/MinusButton";
import PlusButton from "./Buttons/IconBased/PlusButton/PlusButton";
import PriceQuantityRow from "./Rows/PriceQuantityRow";

interface AddMenuToCartComponentProps {
  totalPrice: string;
  decrement: () => void;
  increment: () => void;
  quantity?: number;
  onClickAddToCart: () => void;
}

const AddMenuToCartComponent: React.FC<AddMenuToCartComponentProps> = ({
  totalPrice,
  decrement,
  increment,
  quantity,
  onClickAddToCart,
}) => {
  return (
    <div className="rounded-md space-y-3 bg-white">
      <PriceQuantityRow>
        <div>Price</div>
        <div>$ {totalPrice}</div>
      </PriceQuantityRow>
      <PriceQuantityRow>
        <div>Quantity</div>
        <div className="flex gap-x-2">
          <MinusButton onClick={decrement} />
          <div className="w-4 flex justify-center">{quantity}</div>
          <PlusButton onClick={increment} />
        </div>
      </PriceQuantityRow>
      <button
        onClick={onClickAddToCart}
        className="
            h-10 w-full
             bg-black
            hover:bg-black/90 active:bg-black/80
            text-white font-semibold 
            rounded-md 
            flex items-center justify-center
            hover:cursor-pointer
            "
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddMenuToCartComponent;
