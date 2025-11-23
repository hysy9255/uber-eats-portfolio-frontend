import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CreateAccount from "./pages/CreateAccount";
import PageNotFound from "./pages/PageNotFound";
// import PrivateRoute from "./routes/PrivateRoute";

import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import DishPage from "./pages/DishPage";
import CreateRestaurant from "./pages/CreateRestaurant";
import Profile from "./pages/Profile";

import { AuthProvider, useAuth } from "./AuthContext";
import MyRestaurantPage from "./pages/MyRestaurantPage";
import OldProfile from "./pages/OldProfile";
import CreateAccountChoice from "./pages/CreateAccountChoice";
import Login from "./pages/Login";

import DriverOnboardingDocs from "./pages/DriverOnBoardingStep3Doc";

import DriverOnboardingVehicle from "./pages/DriverOnboardingStep2Vehicle";
import DriverOnboardingBackground from "./pages/DriverOnboardingStep4Background";
import DriverOnboardingPayout from "./pages/DriverOnboardingStep5Payout";
import OwnerOnboardingBusiness from "./pages/OwnerOnboardingStep2Business";

import OwnerOnboardingReview from "./pages/OwnerOnboardingStep5Review";
import OwnerOnboardingLocation from "./pages/OwnerOnboardingStep3Location";
import OwnerOnboardingMenu from "./pages/OwnerOnboardingStep4Menu";

import OwnerOnboardingAccount from "./pages/OwnerOnboardingStep1Account";
import DriverOnboardingAccount from "./pages/DriverOnboardingStep1Account";
import DriverOnboardingReview from "./pages/DriverOnboardingStep6Review";
import WidthPractice from "./pages/WidthPractice";
import CustomerOnboardingAccount from "./pages/CustomerOnBoardingStep1Account";
import CustomerOnboardingAddress from "./pages/CustomerOnboardingStep2Address";
import CustomerOnboardingReview from "./pages/CustomerOnboardingStep3Review";
import CreateDish from "./pages/CreateDish";
import OwnerDashboardOrders2 from "./pages/OwnerDashboardOrders2";
import OwnerDashboardShell from "./components/OwnerDashboardShell";
import OwnerDashboardOverview2 from "./pages/OwnerDashboardOverview2";
import OwnerDashboardMenus from "./pages/OwnerDashboardMenus";
import OwnerDashboardSetting from "./pages/OwnerDashboardSetting";

function AppRoutes() {
  const { loggedIn, user } = useAuth();

  return loggedIn ? (
    <Routes>
      {user?.role === "client" && (
        <>
          <Route
            path="/restaurants/:restaurantId/dishes/:dishId"
            element={<DishPage />}
          />
          <Route path="/" element={<RestaurantsPage />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantPage />}
          />
          {/* <Route path="/" element={<RestaurantsPage />} /> */}
        </>
      )}
      {user?.role === "owner" && (
        <>
          {/* <Route path="/" element={<RestaurantsPage />} /> */}
          <Route
            path="/restaurants/:restaurantId/create-dish"
            element={<CreateDish />}
          />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/my-restaurant" element={<MyRestaurantPage />} />
          <Route path="/dashboard" element={<OwnerDashboardShell />}>
            <Route path="overview" element={<OwnerDashboardOverview2 />} />
            <Route path="orders" element={<OwnerDashboardOrders2 />} />
            <Route path="menus" element={<OwnerDashboardMenus />} />
            <Route path="setting" element={<OwnerDashboardSetting />} />
          </Route>
        </>
      )}
      {user?.role === "driver" && <></>}

      <Route path="/profile" element={<Profile />} />
      <Route path="/oldProfile" element={<OldProfile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<RestaurantsPage />} />
      <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/create-account-choice" element={<CreateAccountChoice />} />
      <Route
        path="/customer-on-board-step-1"
        element={<CustomerOnboardingAccount />}
      />
      <Route
        path="/customer-on-board-step-2"
        element={<CustomerOnboardingAddress />}
      />
      <Route
        path="/customer-on-board-step-3"
        element={<CustomerOnboardingReview />}
      />
      <Route
        path="/driver-on-board-step-1"
        element={<DriverOnboardingAccount />}
      />
      <Route
        path="/driver-on-board-step-2"
        element={<DriverOnboardingVehicle />}
      />
      <Route
        path="/driver-on-board-step-3"
        element={<DriverOnboardingDocs />}
      />
      <Route
        path="/driver-on-board-step-4"
        element={<DriverOnboardingBackground />}
      />
      <Route
        path="/driver-on-board-step-5"
        element={<DriverOnboardingPayout />}
      />
      <Route
        path="/driver-on-board-step-6"
        element={<DriverOnboardingReview />}
      />
      <Route path="/driver-on-board" element={<DriverOnboardingDocs />} />
      <Route
        path="/owner-on-board-step-1"
        element={<OwnerOnboardingAccount />}
      />
      <Route
        path="/owner-on-board-step-2"
        element={<OwnerOnboardingBusiness />}
      />
      <Route
        path="/owner-on-board-step-3"
        element={<OwnerOnboardingLocation />}
      />
      <Route path="/owner-on-board-step-4" element={<OwnerOnboardingMenu />} />
      <Route path="/width-practice" element={<WidthPractice />} />

      <Route
        path="/owner-on-board-step-5"
        element={<OwnerOnboardingReview />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

// function App() {
//   // const [count, setCount] = useState(0);
//   const { loggedIn } = useAuth();
//   console.log(loggedIn);

//   return (
//     <AuthProvider>
//       loggedIn ? (
//       <BrowserRouter>
//         <Routes>
//           <Route path="*" element={<PageNotFound />} />
//           <Route element={<PrivateRoute />}>
//             <Route
//               path="/restaurants/:restaurantId/create-dish"
//               element={<CreateDish />}
//             ></Route>
//             <Route
//               path="/create-restaurant"
//               element={<CreateRestaurant />}
//             ></Route>
//             <Route path="/restaurants" element={<RestaurantsPage />}></Route>
//             <Route
//               path="/restaurants/:restaurantId"
//               element={<RestaurantPage />}
//             ></Route>
//             <Route
//               path="/restaurants/:restaurantId/dishes/:dishId"
//               element={<DishPage />}
//             ></Route>
//           </Route>
//           <Route path="/profile" element={<Profile />}></Route>
//         </Routes>
//       </BrowserRouter>
//       ) : (
//       <BrowserRouter>
//         <Route path="/" element={<Login />}></Route>
//         <Route path="/create-account" element={<CreateAccount />}></Route>
//         <Route path="*" element={<PageNotFound />} />
//       </BrowserRouter>
//       );
//     </AuthProvider>
//   );
// }

// export default App;
