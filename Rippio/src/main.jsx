import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page404 } from './pages/Page404.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RestaurantPage } from './pages/RestaurantPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'

import './css/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
