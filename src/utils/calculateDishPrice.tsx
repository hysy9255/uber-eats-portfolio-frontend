type DishPriceCalculatorProps = {
  quantity: number;
  price: string;
  totalExtraFee: number;
};

export const calculateDishPrice = (params: DishPriceCalculatorProps) => {
  const { quantity, price } = params;
  const finalPrice = (quantity * Number(price)).toFixed(2);
  return finalPrice;
};
