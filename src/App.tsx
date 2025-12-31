import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import DishPage from "./pages/DishPage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./ReactContext/auth/AuthProvider";
import CreateAccountChoice from "./pages/CreateAccountChoice";
import Login from "./pages/Login";
import DriverOnboardingDocs from "./pages/DriverOnBoardingStep3Doc";
import DriverOnboardingVehicle from "./pages/DriverOnboardingStep2Vehicle";
import DriverOnboardingBackground from "./pages/DriverOnboardingStep4Background";
import DriverOnboardingPayout from "./pages/DriverOnboardingStep5Payout";
import OwnerOnboardingBusiness from "./pages/OwnerOnboardingStep2Business";
import OwnerOnboardingReview from "./pages/OwnerOnboardingStep5Review";
import OwnerOnBoardingLocation from "./pages/OwnerOnboardingStep3Location";
import OwnerOnboardingMenu from "./pages/OwnerOnboardingStep4Menu";
import OwnerOnboardingAccount from "./pages/OwnerOnboardingStep1Account";
import DriverOnboardingAccount from "./pages/DriverOnboardingStep1Account";
import DriverOnboardingReview from "./pages/DriverOnboardingStep6Review";
import CustomerOnboardingAddress from "./pages/CustomerOnboardingStep2Address";
import CustomerOnboardingReview from "./pages/CustomerOnboardingStep3Review";
import OwnerDashboardOrders2 from "./pages/OwnerDashboardOrders2";
import OwnerDashboardOverview2 from "./pages/OwnerDashboardOverview2";
import OwnerDashboardMenus from "./pages/OwnerDashboardMenus";
import OwnerDashboardSetting from "./pages/OwnerDashboardSetting";
import OwnerDashboardShell from "./components/Shells/OwnerDashboardShell";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./ReactContext/cart/CartProvider";
import { OnBoardingAccountProvider } from "./ReactContext/onBoardingAccount/OnBoardingAccountProvider";
import { CustomerOnboardingAccount } from "./pages/CustomerOnBoardingStep1Account";
import { useAuth } from "./ReactContext/auth/UseAuth";
import { UserRole } from "./constants/UserRoleEnum";

function AppRoutes() {
  const { loggedIn, user } = useAuth();

  const publicRoutes = [
    { path: "*", element: <Navigate to="/login" replace /> },
    { path: "/", element: <RestaurantsPage /> },
    { path: "/restaurants/:restaurantId", element: <RestaurantPage /> },
    { path: "/login", element: <Login /> },
    { path: "/create-account-choice", element: <CreateAccountChoice /> },
    {
      path: "/customer-on-board-step-1",
      element: (
        <OnBoardingAccountProvider navigateTo="/customer-on-board-step-2">
          <CustomerOnboardingAccount />
        </OnBoardingAccountProvider>
      ),
    },
    {
      path: "/customer-on-board-step-2",
      element: <CustomerOnboardingAddress />,
    },
    {
      path: "/customer-on-board-step-3",
      element: <CustomerOnboardingReview />,
    },
    {
      path: "/driver-on-board-step-1",
      element: (
        <OnBoardingAccountProvider navigateTo="/driver-on-board-step-2">
          <DriverOnboardingAccount />
        </OnBoardingAccountProvider>
      ),
    },
    {
      path: "/driver-on-board-step-2",
      element: <DriverOnboardingVehicle />,
    },
    {
      path: "/driver-on-board-step-3",
      element: <DriverOnboardingDocs />,
    },
    {
      path: "/driver-on-board-step-4",
      element: <DriverOnboardingBackground />,
    },
    {
      path: "/driver-on-board-step-5",
      element: <DriverOnboardingPayout />,
    },
    {
      path: "/driver-on-board-step-6",
      element: <DriverOnboardingReview />,
    },
    {
      path: "/driver-on-board",
      element: <DriverOnboardingDocs />,
    },
    {
      path: "/owner-on-board-step-1",
      element: (
        <OnBoardingAccountProvider navigateTo="/owner-on-board-step-2">
          <OwnerOnboardingAccount />
        </OnBoardingAccountProvider>
      ),
    },
    {
      path: "/owner-on-board-step-2",
      element: <OwnerOnboardingBusiness />,
    },
    {
      path: "/owner-on-board-step-3",
      element: <OwnerOnBoardingLocation />,
    },
    {
      path: "/owner-on-board-step-4",
      element: <OwnerOnboardingMenu />,
    },
    {
      path: "/owner-on-board-step-5",
      element: <OwnerOnboardingReview />,
    },
  ];

  const clientRoutes = [
    {
      path: "/",
      element: <RestaurantsPage />,
    },
    {
      path: "/restaurants/:restaurantId",
      element: <RestaurantPage />,
    },
    {
      path: "/restaurants/:restaurantId/dishes/:dishId",
      element: <DishPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
  ];

  const ownerRoutes = [
    {
      path: "/dashboard",
      element: <OwnerDashboardShell />,
      children: [
        {
          path: "overview",
          element: <OwnerDashboardOverview2 />,
        },
        {
          path: "orders",
          element: <OwnerDashboardOrders2 />,
        },
        {
          path: "menus",
          element: <OwnerDashboardMenus />,
        },
        {
          path: "setting",
          element: <OwnerDashboardSetting />,
        },
      ],
    },
  ];

  // const driverRoutes = [];

  const authedCommon = [
    { path: "/profile", element: <Profile /> },
    { path: "*", element: <PageNotFound /> },
  ];

  const routes = loggedIn
    ? [
        ...(user?.role === UserRole.Client ? clientRoutes : []),
        ...(user?.role === UserRole.Owner ? ownerRoutes : []),
        // ...(user?.role === UserRole.Driver ? driverRoutes : []),
        ...authedCommon,
      ]
    : publicRoutes;

  return useRoutes(routes);
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
