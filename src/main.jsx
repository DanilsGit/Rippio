import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

import { createBrowserRouter, Navigate } from "react-router-dom";
import { Page404 } from './pages/Page404.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage.jsx'
import { Profile } from './pages/Profile/Profile.jsx'
import { ProfileSettings } from './pages/Profile/ProfileSettings.jsx'
import { ProfileCredits } from './pages/Profile/ProfileCredits.jsx'
import { ProfileOrders } from './pages/Profile/ProfileOrders.jsx'
import { RestaurantProfile } from './pages/RestaurantProfile/RestaurantProfile.jsx';
import { RestaurantProfileSettings } from './pages/RestaurantProfile/restaurantProfileSettings/RestaurantProfileSettings.jsx';
import { RestaurantProfileMenu } from './pages/RestaurantProfile/restaurantProfileMenu/RestaurantProfileMenu.jsx';
import { InfoPage } from './pages/InfoPage.jsx'
import { ProtectedUserRoute, ProtectedUserOrDefaultRoute } from './ProtectedRoutes/ProtectedRoute.jsx';
import { AllRestaurants } from './pages/AllRestaurants.jsx';


import './css/index.css'
import 'normalize.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedUserOrDefaultRoute element={<App />} />,
    errorElement: <Page404 />
  },
  {
    path: '/login', 
    element: <RegisterPage />, 
  },
  {
    path: '/info', 
    element: <InfoPage />, 
  },
  {
    path: '/allrestaurants',
    element: <AllRestaurants />,
  },
  {
    path: '/searchpage/:search',
    element: <ProtectedUserOrDefaultRoute element={<SearchPage />} />,
  },
  {
    path: '/restaurant/:idRestaurant',
    element: <RestaurantPage />,
  },
  {
    path: '/profile',
    element: <ProtectedUserRoute element={<Profile />} />,
    children: [
      {
        path: '/profile/settings',
        element: <ProfileSettings />,
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
    element: <RestaurantProfile />,
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
        path: '/restaurantProfile/horarios',
        element: <ProfileOrders />,
      },
      { index: true, element: <Navigate to="settings" /> },
    ]
  },
  {
    path: '/Page404',
    element: <Page404 />,
  }
]);

import  RenderMain  from './RenderMain.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(<RenderMain router={router} />);
