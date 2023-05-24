import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import { useWishList } from './wishListCTX'

const WishListContext = createContext()

export function WishListBagProvider({ children }) {
  const [WishListProducts, setWishListProducts] = useWishList()
  const [wishListNumber, setWishListNumber] = useState(0)
  const setthewishList = (bag) => {
    setWishListNumber(bag)
  }
  const incWishList = (id) => {
    if (!WishListProducts?.items?.some((item) => item.productId._id === id)) {
      setWishListNumber(wishListNumber + 1)
    }
  }

  useEffect(() => {
    const setthewishlistNumber = () => {
      if (WishListProducts) {
        setWishListNumber(WishListProducts?.length)
      }
    }
    setthewishlistNumber()
  }, [WishListProducts])

  return (
    <WishListContext.Provider
      value={{ wishListNumber, incWishList, setthewishList }}
    >
      {children}
    </WishListContext.Provider>
  )
}

export default WishListContext
