import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from '@m/auth/page/RegisterPage.jsx'

import { createBrowserRouter, Navigate } from "react-router-dom";
import { Page404 } from '@m/404/page/Page404.jsx'
import { ChangePassword } from '@m/forgetPassword/page/ChangePassword.jsx'
import { ResetPassword } from '@m/forgetPassword/page/ResetPassword.jsx'
import { SearchPage } from '@m/search/page/SearchPage.jsx'
import { RestaurantPage } from '@m/restaurant/page/RestaurantPage.jsx'

import { Profile } from '@m/clientProfile/page/Profile.jsx'
import { ProfileSettings } from '@m/clientProfile/components/settings/ProfileSettings.jsx'
import { ProfileAddress } from '@m/clientProfile/components/address/ProfileAddress.jsx'
import { ProfilePaymentMethods } from '@m/clientProfile/components/paymentMethod/ProfilePaymentMethods.jsx'
import { ProfileCredits } from '@m/clientProfile/components/credits/ProfileCredits.jsx'
import { ProfileOrders } from '@m/clientProfile/components/orders/ProfileOrders.jsx'

import { RestaurantProfile } from '@m/restaurantProfile/page/RestaurantProfile.jsx';
import { RestaurantProfileSettings } from '@m/restaurantProfile/components/settings/RestaurantProfileSettings.jsx';
import { RestaurantProfileMenu } from '@m/restaurantProfile/components/menu/RestaurantProfileMenu.jsx';
import RestaurantProfileOrders from '@m/restaurantProfile/components/orders/RestaurantProfileOrders.jsx';
import RestaurantProfileSchedule from '@m/restaurantProfile/components/schedule/RestaurantProfileSchedule.jsx';

import { InfoPage } from '@m/information/page/InfoPage.jsx'
import { TeamPage } from '@m/team/page/TeamPage.jsx'

import { Checkout } from '@m/checkout/page/Checkout.jsx'


import {
  OnlyClientLoginRoute, OnlyClientNoLoginRoute, OnlyRestaurantLoginRoute, OnlyAdminLoginRoute, ProtectedRegisterRoute
} from './ProtectedRoutes/ProtectedRoute.jsx';

import { AllRestaurants } from '@m/restaurants/page/AllRestaurants.jsx';

import RenderMain from './RenderMain.jsx';

import Layout from './Layout.jsx'

import './css/index.css'
import 'normalize.css'
import { AdminProfile } from './modules/adminProfile/page/AdminProfile.jsx';
import { RestaurantManagement } from './modules/adminProfile/components/RestaurantManagement/RestaurantManagement.jsx';
import AdminGraphs from './modules/adminProfile/components/AdminGraphs/AdminGraphs.jsx';

//Array con todas las rutas de la aplicación

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <OnlyClientNoLoginRoute element={<App />} />,
        errorElement: <Page404 />
      },
      {
        path: '/login',
        element: <ProtectedRegisterRoute element={<RegisterPage />} />,
      },
      {
        path: '/changepassword',
        element: <ChangePassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
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
        element: <OnlyClientLoginRoute element={<Checkout />} />,
      },
      {
        path: '/allrestaurants',
        element: <OnlyClientNoLoginRoute element={<AllRestaurants />} />,
      },
      {
        path: '/allrestaurants/:category',
        element: <OnlyClientNoLoginRoute element={<AllRestaurants />} />,
      },
      {
        path: '/searchpage/:search',
        element: <OnlyClientNoLoginRoute element={<SearchPage />} />,
      },
      {
        path: '/restaurant/:idRestaurant',
        element: <OnlyClientNoLoginRoute element={<RestaurantPage />} />,
      },
      {
        path: '/profile',
        element: <OnlyClientLoginRoute element={<Profile />} />,
        children: [
          {
            path: '/profile/settings',
            element: <ProfileSettings />,
          },
          {
            path: '/profile/directions',
            element: <ProfileAddress />,
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
        element: <OnlyRestaurantLoginRoute element={<RestaurantProfile />} />,
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
        path: '/adminProfile',
        element: <OnlyAdminLoginRoute element={<AdminProfile />} />,
        children: [
          {
            path: '/adminProfile/restaurantManagement',
            element: <RestaurantManagement />,
          },
          {
            path: '/adminProfile/graphs',
            element: <AdminGraphs />,
          },
          { index: true, element: <Navigate to="restaurantManagement" /> },
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
