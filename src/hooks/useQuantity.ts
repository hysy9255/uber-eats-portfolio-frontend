import { useState } from "react";

export const useQuantity = (
  initialQuantity: number = 1,
  minQuantity: number = 1
) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () =>
    setQuantity((prev) => (prev > minQuantity ? prev - 1 : prev));

  return { quantity, increment, decrement };
};
