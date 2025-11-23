// import { useEffect, useState } from "react";
// import MainHeaderV2 from "../components/MainHeaderV2";
// import ProfileHeader from "../components/ProfileHeader";
// import AlarmHeader from "../components/AlarmHeader";
// import sampleGraph from "../images/sample-graph.png";
// import { getToken } from "../auth";
// import type { RestaurantV2 } from "./RestaurantPage";
// import KpiButton from "../components/KpiButton";
// // import DashboardActionButton from "../components/DashboardActionButton";
// import EmbedMapIframe from "../components/EmbedMapIframe";
// import DropdownButton, {
//   type DropdownOptionsType,
// } from "../components/DropdownButton";
// import OwnerDashboardSidebar from "../components/OwnerDashboardSidebar";
// import OperatingHoursForDashboard from "../components/OperatingHoursForDashboard";
// import MenuRanking from "../components/MenuRanking";
// import OrdersComponentForDashboard from "../components/OrdersComponentForDashboard";

// import {
//   bestSelling,
//   highestRated,
//   mockOrderData,
//   mostReviewed,
// } from "../constants/MockOrdersData";
// import { sidebarTabOptions } from "../constants/OwnerDashboard";

// const dropdownOptions: DropdownOptionsType[] = [
//   { label: "Today" },
//   { label: "Yesterday" },
//   { label: "Last 7 days", isDefault: true },
//   { label: "Last 14 days" },
//   { label: "Last 30 days" },
// ];

// const kpiStats = [
//   { value: "58", label: "Orders" },
//   { value: "$1,240", label: "Revenue" },
//   { value: "$21.45", label: "Avg. order" },
//   { value: "+4", label: "New reviews" },
// ];

// const OwnerPage = () => {
//   const [restaurant, setRestaurant] = useState<RestaurantV2>();
//   const token = getToken();

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
//         <OwnerDashboardSidebar sidebarTabOptions={sidebarTabOptions} />
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
//               <DropdownButton options={dropdownOptions} width="w-[150px]" />
//             </article>
//             <article className="grid grid-cols-4 gap-4">
//               {kpiStats.map((stat) => (
//                 <KpiButton
//                   value={stat.value}
//                   label={stat.label}
//                   valueSize="text-xl"
//                   labelSize="text-md"
//                 />
//               ))}
//             </article>
//             <article
//               id="graph"
//               className="bg-white rounded-md border border-gray-300"
//             >
//               <h2 className="text-xl font-medium pl-5 pt-5">
//                 Sales past 7 days
//               </h2>
//               <img className="w-full h-[345px] rounded-md" src={sampleGraph} />
//             </article>
//             {/* <article className="grid grid-cols-3 gap-3 flex-1 select-none">
//               <DashboardActionButton label={"View menu"} labelSize="text-md" />
//               <DashboardActionButton label={"Edit hours"} labelSize="text-md" />
//               <DashboardActionButton
//                 label={"Update banner image"}
//                 labelSize="text-md"
//               />
//             </article> */}
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

//           {/* <section className="grid grid-cols-[2fr_1fr] gap-3"> */}
//           {/* <article id="left-half" className="space-y-3">
//               <div id="today-insight" className="grid grid-cols-4 gap-4">
//                 <KpiButton
//                   value={"58"}
//                   label="Orders"
//                   valueSize="text-xl"
//                   labelSize="text-md"
//                 />
//                 <KpiButton
//                   value={"$1,240"}
//                   label="Revenue"
//                   valueSize="text-xl"
//                   labelSize="text-md"
//                 />
//                 <KpiButton
//                   value={"$21.45"}
//                   label="Avg. order"
//                   valueSize="text-xl"
//                   labelSize="text-md"
//                 />
//                 <KpiButton
//                   value={"+4"}
//                   label="New reviews"
//                   valueSize="text-xl"
//                   labelSize="text-md"
//                 />
//               </div>
//               <figure
//                 id="graph"
//                 className="bg-white rounded-md border border-gray-300"
//               >
//                 <h2 className="text-xl font-medium pl-5 pt-5">
//                   Sales past 7 days
//                 </h2>
//                 <img className="w-full" src={sampleGraph} />
//               </figure>
//               <div className="grid grid-cols-3 gap-3 flex-1 select-none">
//                 <DashboardActionButton
//                   label={"View menu"}
//                   labelSize="text-md"
//                 />
//                 <DashboardActionButton
//                   label={"Edit hours"}
//                   labelSize="text-md"
//                 />
//                 <DashboardActionButton
//                   label={"Update banner image"}
//                   labelSize="text-md"
//                 />
//               </div>
//             </article> */}

//           {/* <article
//               id="right-half"
//               className="bg-white border border-gray-300 rounded-md p-3 space-y-2 flex flex-col"
//             >
//               <h2 className="text-xl font-medium">Recent Orders</h2>
//               <div className="border border-gray-300 rounded-md overflow-y-auto">
//                 <OrderComponent textSize="text-lg" />
//                 <OrderComponent textSize="text-lg" />
//                 <OrderComponent textSize="text-lg" />
//               </div>
//             </article> */}
//           {/* </section> */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default OwnerPage;
