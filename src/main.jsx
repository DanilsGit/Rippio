import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

import { createBrowserRouter, Navigate } from "react-router-dom";
import { Page404 } from './pages/Page404.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RestaurantPage } from './pages/RestaurantPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { Profile } from './pages/Profile/Profile.jsx'
import { ProfileSettings } from './pages/Profile/ProfileSettings.jsx'
import { ProfileCredits } from './pages/Profile/ProfileCredits.jsx'
import { ProfileOrders } from './pages/Profile/ProfileOrders.jsx'
import { ProfileHelp } from './pages/Profile/ProfileHelp.jsx'

import './css/index.css'
import 'normalize.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />
  },
  {
    path: '/login', 
    element: <RegisterPage />, 
  },
  {
    path: '/searchpage/:search',
    element: <SearchPage />,
  },
  {
    path: '/restaurant/:idRestaurant',
    element: <RestaurantPage />,
  },
  {
    path: '/restaurant/:idRestaurant/product/:idProduct',
    element: <ProductPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
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
      {
        path: '/profile/help',
        element: <ProfileHelp />,
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
