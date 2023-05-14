import React, { createContext, useContext, useEffect, useState } from 'react'
import cartApi from '../api/cartApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
const CartContext = createContext()

const CartProvider = ({ children }) => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const [cart, setCart] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      const res = await cartApi.getMyCart()
      console.log(res)
      setCart(res[0])
    }
    if (!auth.user) {
      null
    } else {
      getProducts()
    }
  }, [navigate])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
