import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import wishListApi from '../api/wishListApi'
const WishListContext = createContext()

const WishListProvider = ({ children }) => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const [WishList, setWishList] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await wishListApi.getall()
        setWishList(res[0]?.items)
      } catch (error) {
        console.log(error)
      }
    }
    if (!auth.user) {
      null
    } else {
      getProducts()
    }
  }, [navigate, auth.user])
  return (
    <WishListContext.Provider value={[WishList, setWishList]}>
      {children}
    </WishListContext.Provider>
  )
}

const useWishList = () => useContext(WishListContext)

export { WishListProvider, useWishList }
