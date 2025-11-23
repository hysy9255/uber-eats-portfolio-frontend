import React from "react";

type AddToCartComponentProps = {
  dishName?: string;
  totalPrice: string;
  quantity: number;
  decrement: () => void;
  increment: () => void;
};

const AddToCartComponent: React.FC<AddToCartComponentProps> = ({
  dishName,
  totalPrice,
  quantity,
  decrement,
  increment,
}) => {
  return (
    <div className="p-1 bg-gradient-to-tr from-blue-600 via-teal-400 to-emerald-300 rounded-md">
      <div className="p-5 rounded-md space-y-3 bg-white">
        <div className="font-semibold text-lg">{dishName}</div>
        <div
          id="price-box"
          className=" bg-white border border-gray-100 rounded-lg shadow-md py-2 px-3 flex justify-between"
        >
          <div className="text-sm font-semibold flex items-center">Price</div>
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
            <span className="text-sm w-4 flex justify-center">{quantity}</span>
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
  );
};

export default AddToCartComponent;
