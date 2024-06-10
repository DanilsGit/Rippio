import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'

import { createBrowserRouter, Navigate } from "react-router-dom";
import { Page404 } from './pages/Page404.jsx'
import { ChangePassword } from './pages/ChangePassword.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage.jsx'
import { Profile } from './pages/Profile/Profile.jsx'
import { ProfileSettings } from './pages/Profile/ProfileSettings.jsx'
import { ProfileDirections } from './pages/Profile/ProfileDirections.jsx'
import { ProfilePaymentMethods } from './pages/Profile/ProfilePaymentMethods.jsx'
import { ProfileCredits } from './pages/Profile/ProfileCredits.jsx'
import { ProfileOrders } from './pages/Profile/ProfileOrders.jsx'
import { RestaurantProfile } from './pages/RestaurantProfile/RestaurantProfile.jsx';
import { RestaurantProfileSettings } from './pages/RestaurantProfile/restaurantProfileSettings/RestaurantProfileSettings.jsx';
import { RestaurantProfileMenu } from './pages/RestaurantProfile/restaurantProfileMenu/RestaurantProfileMenu.jsx';
import { InfoPage } from './pages/InfoPage.jsx'
import { TeamPage } from './pages/TeamPage.jsx'
import {
  ProtectedProfileRoute, ProtectedSearchRoute, ProtectedRegisterRoute,
  ProtectedProfileRestaurantRoute, ProtectedPrincipalPageRestaurantRoute, ProtectedCheckoutRoute
} from './ProtectedRoutes/ProtectedRoute.jsx';
import { AllRestaurants } from './pages/AllRestaurants.jsx';
import RenderMain from './RenderMain.jsx';
import RestaurantProfileSchedule from './pages/RestaurantProfile/restaurantProfileSchedule/RestaurantProfileSchedule.jsx';
import { Checkout } from './pages/CheckoutPage/Checkout.jsx'
import Layout from './Layout.jsx'

import './css/index.css'
import 'normalize.css'
import RestaurantProfileOrders from './pages/RestaurantProfile/restaurantProfileOrders/RestaurantProfileOrders.jsx';

//Array con todas las rutas de la aplicación

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <ProtectedPrincipalPageRestaurantRoute element={<App />} />,
        errorElement: <Page404 />
      },
      {
        path: '/login',
        element: <ProtectedRegisterRoute element={<RegisterPage />} />,
      },
      {
        path: '/changepassword',
        element: <ChangePassword/>,
      },
      {
        path: '/info',
        element: <InfoPage />,
      },
      {
        path: '/team',
        element: <TeamPage />,
      },
      {
        path: '/checkout',
        element: <ProtectedCheckoutRoute element={<Checkout />} />,
      },
      {
        path: '/allrestaurants',
        element: <ProtectedSearchRoute element={<AllRestaurants />} />,
      },
      {
        path: '/searchpage/:search',
        element: <ProtectedSearchRoute element={<SearchPage />} />,
      },
      {
        path: '/restaurant/:idRestaurant',
        element: <ProtectedSearchRoute element={<RestaurantPage />} />,
      },
      {
        path: '/profile',
        element: <ProtectedProfileRoute element={<Profile />} />,
        children: [
          {
            path: '/profile/settings',
            element: <ProfileSettings />,
          },
          {
            path: '/profile/directions',
            element: <ProfileDirections />,
          },
          {
            path: '/profile/paymentmethods',
            element: <ProfilePaymentMethods />,
          },
          {
            path: '/profile/credits',
            element: <ProfileCredits />,
          },
          {
            path: '/profile/orders',
            element: <ProfileOrders />,
          },
          { index: true, element: <Navigate to="settings" /> },
        ]
      },
      {
        path: '/restaurantProfile',
        element: <ProtectedProfileRestaurantRoute element={<RestaurantProfile />} />,
        children: [
          {
            path: '/restaurantProfile/settings',
            element: <RestaurantProfileSettings />,
          },
          {
            path: '/restaurantProfile/menu',
            element: <RestaurantProfileMenu />,
          },
          {
            path: '/restaurantProfile/orders',
            element: <RestaurantProfileOrders />,
          },
          {
            path: '/restaurantProfile/horarios',
            element: <RestaurantProfileSchedule />,
          },
          { index: true, element: <Navigate to="settings" /> },
        ]
      },
      {
        path: '/Page404',
        element: <Page404 />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RenderMain router={router} />);
