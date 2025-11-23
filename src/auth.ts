export const getToken = () => {
  const token = localStorage.getItem("jwt-token");
  return token;
};

export const getRestaurantId = () => {
  const restaurantId = localStorage.getItem("restaurantId");
  if (!restaurantId) {
    throw new Error("Restaurant ID not found");
  }
  return restaurantId;
};
