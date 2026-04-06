import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import DishPage from "./pages/DishPage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./ReactContext/auth/AuthProvider";
import CreateAccountChoice from "./pages/CreateAccountChoice";
import Login from "./pages/Login";
import OwnerDashboardOrders from "./pages/OwnerDashboard/OwnerDashboardOrders";
import OwnerDashboardOverview from "./pages/OwnerDashboard/OwnerDashboardOverview";
import OwnerDashboardMenus from "./pages/OwnerDashboard/OwnerDashboardMenus";
import OwnerDashboardSetting from "./pages/OwnerDashboard/OwnerDashboardSetting";
import CartPage from "./pages/CartPage";
import { useAuth } from "./ReactContext/auth/UseAuth";
import { UserRole } from "./constants/UserRoleEnum";
import ManageDeliveryAddress from "./pages/ManageDeliveryAddress";
import OrderConfirm from "./pages/OrderConfirm";
import TrackOrder from "./pages/TrackOrder";
import ScrollToTop from "./ScrollToTop";
import OnGoingOrders from "./pages/OnGoingOrders";
import OrderHistory from "./pages/OrderHistory";
import OnBoardLayout from "./components/Layout/OnBoardLayout";
import ClientStep1Account from "./pages/onBoarding/Client/ClientStep1Account";
import ClientStep2Address from "./pages/onBoarding/Client/ClientStep2Address";
import ClientStep3Review from "./pages/onBoarding/Client/ClientStep3Review";
import ClientOrderLayout from "./components/Layout/ClientOrderLayout";
import ClientOnBoardLayout from "./components/Layout/ClientOnBoardLayout";
import OwnerOnBoardLayout from "./components/Layout/OwnerOnBoardLayout";
import OwnerStep2Business from "./pages/onBoarding/Owner/OwnerStep2Business";
import OwnerStep1Account from "./pages/onBoarding/Owner/OwnerStep1Account";
import OwnerStep3LocationAndTime from "./pages/onBoarding/Owner/OwnerStep3LocationAndTime";
import OwnerStep4Menu from "./pages/onBoarding/Owner/OwnerStep4Menu";
import OwnerStep5Review from "./pages/onBoarding/Owner/OwnerStep5Review";
import ClientPageShell from "./components/Shells/ClientPageShell";
import OwnerPageShell from "./components/Shells/OwnerPageShell";
import PublicPageShell from "./components/Shells/PublicPageShell";
import SocketBootstrap from "./SocketBootstrap";
import { GeneralSideBarProvider } from "./ReactContext/GeneralSideBar/GeneralSideBarProvider";
// import LogoPractice from "./LogoPractice";
// import CssPractice from "./pages/CssPractice";
// import CssPractice2 from "./pages/CssPractice2";

function AppRoutes() {
  const { loggedIn, user } = useAuth();

  const publicRoutes = [
    // { path: "practice2", element: <CssPractice /> },
    // { path: "practice3", element: <CssPractice2 /> },
    {
      element: <PublicPageShell />,
      children: [
        { path: "*", element: <Navigate to="/login" replace /> },
        { path: "/login", element: <Login /> },
        { path: "/create-account-choice", element: <CreateAccountChoice /> },
        {
          element: <OnBoardLayout />,
          path: "/on-board",
          children: [
            {
              path: "client",
              element: <ClientOnBoardLayout />,
              children: [
                {
                  path: "step1",
                  element: <ClientStep1Account />,
                },
                {
                  path: "step2",
                  element: <ClientStep2Address />,
                },
                {
                  path: "step3",
                  element: <ClientStep3Review />,
                },
              ],
            },
            {
              path: "owner",
              element: <OwnerOnBoardLayout />,
              children: [
                {
                  path: "step1",
                  element: <OwnerStep1Account />,
                },
                {
                  path: "step2",
                  element: <OwnerStep2Business />,
                },
                {
                  path: "step3",
                  element: <OwnerStep3LocationAndTime />,
                },
                {
                  path: "step4",
                  element: <OwnerStep4Menu />,
                },
                {
                  path: "step5",
                  element: <OwnerStep5Review />,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const clientRoutes = [
    {
      path: "/client",
      element: <ClientPageShell />,
      children: [
        { path: "restaurants", element: <RestaurantsPage /> },
        {
          path: "on-going-orders",
          element: <OnGoingOrders />,
        },
        {
          path: "order-history",
          element: <OrderHistory />,
        },
        {
          path: "delivery-address",
          element: <ManageDeliveryAddress />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "restaurants/:restaurantId",
          element: <RestaurantPage />,
        },

        {
          path: "restaurants/:restaurantId/dishes/:dishId",
          element: <DishPage />,
        },
        {
          element: <ClientOrderLayout />,
          children: [
            { path: "order-confirm/:orderId", element: <OrderConfirm /> },
            { path: "track-order/:orderId", element: <TrackOrder /> },
          ],
        },
        { path: "profile", element: <Profile /> },
      ],
    },
  ];

  const ownerRoutes = [
    {
      path: "/dashboard",
      element: <OwnerPageShell />,
      children: [
        {
          path: "overview",
          element: <OwnerDashboardOverview />,
        },
        {
          path: "orders",
          element: <OwnerDashboardOrders />,
        },
        {
          path: "menus",
          element: <OwnerDashboardMenus />,
        },
        {
          path: "setting",
          element: <OwnerDashboardSetting />,
        },
        { path: "profile", element: <Profile /> },
      ],
    },
  ];

  const authedCommon = [{ path: "*", element: <PageNotFound /> }];

  const routes = loggedIn
    ? [
        ...(user?.role === UserRole.Client ? clientRoutes : []),
        ...(user?.role === UserRole.Owner ? ownerRoutes : []),
        ...authedCommon,
      ]
    : publicRoutes;

  return useRoutes(routes);
}

export default function App() {
  SocketBootstrap();
  return (
    <AuthProvider>
      <BrowserRouter>
        <GeneralSideBarProvider>
          <ScrollToTop />
          <AppRoutes />
        </GeneralSideBarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
