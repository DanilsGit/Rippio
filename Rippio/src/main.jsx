import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page404 } from './pages/Page404.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RestaurantPage } from './pages/RestaurantPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'

import './css/index.css'
import 'normalize.css'
import { CartModal } from './components/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/differentRestaurantModal/ModalConflictProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />
  },
  {
    path: '/login', // Agrega esta ruta
    element: <LoginPage />, // Agrega este elemento
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
    <CartModal />
    <ModalConflictProduct />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
