import { useState } from 'react';
import { useAuth } from '@m/core/hooks/useAuth';
import { useCart } from '@m/core/hooks/useCart';
import { addToCart } from '@/api/cart';
import { addExamplePaymentMethod } from '@m/auth/utils/constants';

export const UserRegisterAndLogin = () => {
    // import the hooks
    const register = useAuth((state) => state.register)
    const login = useAuth((state) => state.login)
    const cart = useCart((state) => state.cart)
    const { loadCartFromDatabase, loadCartFromLocalStorage, setTokenInCart, clearCart } = useCart();
    const errors = useAuth((state) => state.errors)
  
    // Define the state
    const [isUserMode, setIsUserMode] = useState(true);
    const [isOpenCartToDBModal, setIsOpenCartToDBModal] = useState(false)
    const [clickOnRegister, setClickOnRegister] = useState(false);
  
    const [userLogin, setUserLogin] = useState({
      email: '',
      password: ''
    })
  
    const [userRegister, setUserRegister] = useState({
      identificacion: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      password: '',
      tipo_usuario: 1
    })
  
    // Define the functions
    const handleConfirmMoveCart = async () => {
      await login(userLogin)
      const token = localStorage.getItem('token');
      if (token) {
        setTokenInCart(token);
        await clearCart();
        await Promise.all(cart.items.map(async (item) => {
          const observation = item.product.observation || 'N/A';
          await addToCart(token, item.product.id, item.quantity, observation)
        }))
        await loadCartFromDatabase(token);
      }
    }
  
    const dontMoveCart = async () => {
      const userLoginTrim = { email: userLogin.email.trim(), password: userLogin.password.trim() }
      await login(userLoginTrim)
      const token = localStorage.getItem('token');
      if (token) {
        setTokenInCart(token);
        await loadCartFromDatabase(token);
      }
    }
  
    const handleSubmitLogin = (e) => {
      e.preventDefault()
      if (cart.items.length > 0) {
        setIsOpenCartToDBModal(true)
      } else {
        dontMoveCart()
      }
    }
  
    const handleSubmitRegister = async (e) => {
      e.preventDefault();
      setClickOnRegister(false);
      if (clickOnRegister) return;
  
      // Register the user
      const newUserRegister = { ...userRegister };
      if (!isUserMode) {
        newUserRegister.apellido = '';
        newUserRegister.tipo_usuario = 3;
      }
      const UserRegisterTrim =
      {
        identificacion: newUserRegister.identificacion.trim(),
        nombre: newUserRegister.nombre.trim(),
        apellido: newUserRegister.apellido.trim(),
        email: newUserRegister.email.trim(),
        telefono: newUserRegister.telefono.trim(),
        password: newUserRegister.password.trim(),
        tipo_usuario: newUserRegister.tipo_usuario
      }
      const res = await register(UserRegisterTrim)
      if (!res) return
  
      // Login the user after register
      const token = await login({ email: UserRegisterTrim.email, password: UserRegisterTrim.password });
      console.log(token);
      
      // Add a example method of payment to the user (temporaly function)
      await addExamplePaymentMethod(token);

      // Move the cart to the database
      if (token) {
        setTokenInCart(token);
        loadCartFromLocalStorage();
        await Promise.all(cart.items.map(async (item) => {
          const observation = item.product.observation || 'N/A';
          await addToCart(token, item.product.id, item.quantity, observation)
        }))
      }
    }
  
    const handleSwitchUserToRestaurant = (e) => {
      e.preventDefault()
      setIsUserMode(!isUserMode)
    }
  
    return {
      isUserMode,
      setIsUserMode,
      isOpenCartToDBModal,
      setIsOpenCartToDBModal,
      handleConfirmMoveCart,
      dontMoveCart,
      userLogin,
      setUserLogin,
      userRegister,
      setUserRegister,
      handleSubmitLogin,
      handleSubmitRegister,
      handleSwitchUserToRestaurant,
      errors
    }
  
  }
  