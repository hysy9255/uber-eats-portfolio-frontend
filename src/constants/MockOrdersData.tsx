import { OrderStatus } from "./OrderStatus";
export type MenuList = {
  dishImgUrl: string;
  dishId: string;
  name: string;
  category: string;
  price: string;
  description: string;
  restaurantId: string;
  availability: boolean;
};
export const mockOrderData = [
  {
    orderId: "238723",
    status: OrderStatus.Pending,
    date: new Date().toLocaleTimeString(),
    totalPrice: "55.00",
    customer: "Amelia Carter",
    driver: "Stella Kun",
    menus: [
      {
        dishImgUrl: "string",
        name: "Milkshake",
        category: "drinks",
        price: "55",
        description: "string",
      },
      {
        dishImgUrl: "string",
        name: "Mango Sticky Rice",
        category: "string",
        price: "string",
        description: "string",
      },
    ],
  },
  {
    orderId: "238723",
    status: OrderStatus.Delivering,
    date: new Date().toLocaleTimeString(),
    totalPrice: "55.00",
    customer: "George Bush Carmelo Anthogy the great",
    driver: "Miley Cyrus",
    menus: [
      {
        dishImgUrl: "string",
        name: "Mageritta Pizza",
        category: "drinks",
        price: "55",
        description: "string",
      },
      {
        dishImgUrl: "string",
        name: "Watermelon Slush",
        category: "string",
        price: "string",
        description: "string",
      },
    ],
  },
  {
    orderId: "238723",
    status: OrderStatus.Delivering,
    date: new Date().toLocaleTimeString(),
    totalPrice: "55.00",
    customer: "George Bush Carmelo Anthogy the great",
    driver: "Miley Cyrus",
    menus: [
      {
        dishImgUrl: "string",
        name: "Mageritta Pizza",
        category: "drinks",
        price: "55",
        description: "string",
      },
      {
        dishImgUrl: "string",
        name: "Watermelon Slush",
        category: "string",
        price: "string",
        description: "string",
      },
    ],
  },
  {
    orderId: "238723",
    status: OrderStatus.Cooking,
    date: new Date().toLocaleTimeString(),
    totalPrice: "55.00",
    customer: "George Bush Carmelo Anthogy the great",
    driver: "Miley Cyrus",
    menus: [
      {
        dishImgUrl: "string",
        name: "Mageritta Pizza",
        category: "drinks",
        price: "55",
        description: "string",
      },
      {
        dishImgUrl: "string",
        name: "Watermelon Slush",
        category: "string",
        price: "string",
        description: "string",
      },
    ],
  },
  {
    orderId: "238723",
    status: OrderStatus.Delivered,
    date: new Date().toLocaleTimeString(),
    totalPrice: "55.00",
    customer: "George Bush Carmelo Anthogy the great",
    driver: "Miley Cyrus",
    menus: [
      {
        dishImgUrl: "string",
        name: "Mageritta Pizza",
        category: "drinks",
        price: "55",
        description: "string",
      },
      {
        dishImgUrl: "string",
        name: "Watermelon Slush",
        category: "string",
        price: "string",
        description: "string",
      },
    ],
  },
];

// export const menuList: MenuList[] = [
//   { dishId: "", name: "spagetti", price: "24", availability: true },
//   { dishId: "", name: "fried rice", price: "24", availability: false },
//   { dishId: "", name: "pizza", price: "24", availability: false },
//   { dishId: "", name: "bbq", price: "24", availability: true },
//   { dishId: "", name: "ice cream", price: "24", availability: true },
//   { dishId: "", name: "spicy noodles", price: "24", availability: true },
//   { dishId: "", name: "kimchi", price: "24", availability: true },
//   { dishId: "", name: "fried chicken", price: "24", availability: true },
//   { dishId: "", name: "ice tea", price: "24", availability: true },
//   { dishId: "", name: "Pad Thai", price: "24", availability: true },
//   { dishId: "", name: "Mango sticy rice", price: "24", availability: false },
//   { dishId: "", name: "water", price: "24", availability: false },
//   { dishId: "", name: "beer", price: "24", availability: true },
//   { dishId: "", name: "coke", price: "24", availability: true },
//   { dishId: "", name: "dumplings", price: "24", availability: true },
//   { dishId: "", name: "pudding", price: "24", availability: true },
//   { dishId: "", name: "curry", price: "24", availability: true },
//   { dishId: "", name: "salad", price: "24", availability: true },
//   { dishId: "", name: "sandwich", price: "24", availability: true },
// ];

export const bestSelling = [
  "Spagetti",
  "Pizza",
  "Fried rice",
  "French fries",
  "Milkshake",
];

export const highestRated = [
  "Spagetti",
  "Pizza",
  "Fried rice",
  "French fries",
  "Milkshake",
];

export const mostReviewed = [
  "Spagetti",
  "Pizza",
  "Fried rice",
  "French fries",
  "Milkshake",
];

export type MenuRankingDataType = {
  name: string;
  numOfReviews: number;
  numOfSold: number;
  ratings: number;
  soldRank?: number;
  reviewsRank?: number;
  ratingsRank?: number;
};

export const menuRankingTableColumns = [
  "",
  "Menu",
  "# of Sold",
  "# of Reviews",
  "Ratings",
  "Sold Rank",
  "Reviews Rank",
  "Ratings Rank",
];

export const menuRankingData: MenuRankingDataType[] = [
  {
    name: "Kung Pao Chicken",
    numOfReviews: 20,
    numOfSold: 100,
    ratings: 4,
  },
  {
    name: "Green Papaya Salad",
    numOfReviews: 53,
    numOfSold: 240,
    ratings: 4.5,
  },
  {
    name: "Orange Chicken",
    numOfReviews: 3,
    numOfSold: 30,
    ratings: 2.6,
  },
  {
    name: "Spicy Curry Noodles",
    numOfReviews: 24,
    numOfSold: 40,
    ratings: 3.9,
  },
  {
    name: "Five Cheese Pasta",
    numOfReviews: 62,
    numOfSold: 57,
    ratings: 4.2,
  },
];
