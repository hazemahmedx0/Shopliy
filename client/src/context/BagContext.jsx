import { createContext, useContext } from 'react'
import { useState } from 'react'
import { useCart } from './cartctx'

const BagContext = createContext()

export function BagProvider({ children }) {
  const [CartProducts, setCartProducts] = useCart()

  const [bag, setBag] = useState(0)
  const setthebag = (bag) => {
    setBag(bag)
  }
  const incBag = (id) => {
    if (!CartProducts?.items?.some((item) => item.productId._id === id)) {
      setBag(bag + 1)
    }
  }
  return (
    <BagContext.Provider value={{ bag, incBag, setthebag }}>
      {children}
    </BagContext.Provider>
  )
}

export default BagContext
