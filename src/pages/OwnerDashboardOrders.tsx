// import AlarmHeader from "../components/AlarmHeader";
// import MainHeaderV2 from "../components/MainHeaderV2";
// import OwnerDashboardSidebar from "../components/OwnerDashboardSidebar";
// import ProfileHeader from "../components/ProfileHeader";

// import { useEffect, useState } from "react";
// import type { RestaurantV2 } from "./RestaurantPage";
// import { getToken } from "../auth";
// import EmbedMapIframe from "../components/EmbedMapIframe";
// import OperatingHoursForDashboard from "../components/OperatingHoursForDashboard";
// import OrdersComponentForDashboard, {
//   OrderStatusComp,
// } from "../components/OrdersComponentForDashboard";
// import MenuRanking from "../components/MenuRanking";

// import {
//   bestSelling,
//   highestRated,
//   mockOrderData,
//   mostReviewed,
// } from "../constants/MockOrdersData";
// import { sidebarTabOptions } from "../constants/OwnerDashboard";

// import FilterDropdown from "../components/FilterDropdown";
// import {
//   StatusFilterOptions,
//   TimeFilterOptions,
// } from "../constants/OrderStatus";

// const OwnerDashboardOrders = () => {
//   const [restaurant, setRestaurant] = useState<RestaurantV2>();
//   const token = getToken();

//   const [statusFilterOption, setStatusFilterOption] =
//     useState<StatusFilterOptions>(StatusFilterOptions.allStatus);
//   const [timeFilterOption, setTimeFilterOption] = useState<TimeFilterOptions>(
//     TimeFilterOptions.allTime
//   );

//   if (!token) {
//     throw new Error("Token not found");
//   }

//   useEffect(() => {
//     const load = async () => {
//       const restaurantResponse = await fetch(
//         "http://localhost:3002/restaurants/my-restaurantV2",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "jwt-token": token,
//           },
//         }
//       );
//       const restaurant = await restaurantResponse.json();
//       setRestaurant(restaurant);
//       localStorage.setItem("restaurantId", restaurant?.restaurantId);
//     };
//     load();
//   }, [token]);
//   const rail = "";
//   return (
//     <div className="px-3 select-none">
//       <MainHeaderV2
//         layoutWidth={rail}
//         profile={<ProfileHeader />}
//         alarm={<AlarmHeader />}
//         sticky={true}
//       />
//       <div className="grid grid-cols-[1fr_6fr]">
//         <OwnerDashboardSidebar
//           sidebarTabOptions={sidebarTabOptions}
//           // selected="Menus"
//         />
//         <main className="flex-1 justify-center  space-y-[10px] p-[10px] grid grid-cols-[2fr_1fr] gap-3">
//           <section id="left-half" className=" space-y-3">
//             <article className="flex justify-between items-center relative">
//               <div className="">
//                 <h1 className="text-3xl font-semibold">{restaurant?.dba}</h1>
//                 <p className="text-lg">
//                   {restaurant?.unit}, {restaurant?.streetAddress},{" "}
//                   {restaurant?.city}, {restaurant?.zip}{" "}
//                 </p>
//               </div>
//             </article>

//             <article className="border border-gray-300 rounded-md">
//               <h3 className="text-2xl font-semibold py-3">Orders</h3>
//               <div className="flex gap-3 py-3">
//                 <FilterDropdown
//                   options={Object.values(StatusFilterOptions)}
//                   option={statusFilterOption}
//                   setOption={setStatusFilterOption}
//                 />
//                 <FilterDropdown
//                   options={Object.values(TimeFilterOptions)}
//                   option={timeFilterOption}
//                   setOption={setTimeFilterOption}
//                 />

//                 <button
//                   className="bg-blue-400
//                 hover:bg-blue-500 active:bg-blue-600
//                 hover:cursor-pointer
//                 text-white font-semibold w-30 p-2 rounded-md"
//                 >
//                   Filter
//                 </button>
//               </div>
//               {/* <div className="bg-black h-[200px] w-full"></div> */}
//               <section className="">
//                 <div className="bg-gray-100 font-semibold grid grid-cols-6 gap-5 p-3">
//                   <h4 className="border">Order ID</h4>
//                   <h4 className="border">Date</h4>
//                   <h4 className="border">Customer</h4>
//                   <h4 className="border">Total</h4>
//                   <h4 className="border">Status</h4>
//                   <h4 className="border">Driver</h4>
//                 </div>
//                 {mockOrderData.map((order) => (
//                   <div className="grid grid-cols-6 gap-5 p-3">
//                     <div className="border">{order.orderId}</div>
//                     <div className="border">{order.date}</div>
//                     <div className="border">{order.customer}</div>
//                     <div className="border">{order.totalPrice}</div>
//                     <div className="border">
//                       <OrderStatusComp status={order.status} />
//                     </div>
//                     <div className="border">{order.driver}</div>
//                   </div>
//                 ))}
//               </section>
//             </article>

//             <div className="grid grid-cols-3 gap-2">
//               <MenuRanking label="Best-Selling Menus" topMenus={bestSelling} />
//               <MenuRanking
//                 label="Highest-Rated Menus"
//                 topMenus={highestRated}
//               />
//               <MenuRanking
//                 label="Most-Reviewed Menus"
//                 topMenus={mostReviewed}
//               />
//             </div>
//           </section>
//           <section id="right-half" className="space-y-3">
//             <OrdersComponentForDashboard orders={mockOrderData} />

//             <OperatingHoursForDashboard
//               operatingHours={restaurant?.operatingHours}
//             />

//             <article>
//               <EmbedMapIframe />
//             </article>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboardOrders;
