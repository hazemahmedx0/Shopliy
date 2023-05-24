import { useEffect, useRef, useState } from 'react'
import { Breadcrumbs, Anchor, Container, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useCart } from '../context/cartctx'
import CartProduct from '../components/common/Cart/CartProduct'
import { useAuth } from '../context/auth'
import orderApi from '../api/orderApi'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useWishList } from '../context/wishListCTX'

const WishList = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [auth, setAuth] = useAuth()

  const [WishList, setWishList] = useWishList()
  const handlers = useRef()

  useEffect(() => {
    if (!auth?.user) {
      navigate('/login')
      return
    }
  }, [navigate, auth.user])

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Wish List', href: '/wishlist' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  return (
    <>
      <Container className=" mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>
        <h1 className="text-left font-bold text-zinc-800 mt-6">Wish list</h1>
        <div className="flex flex-row justify-between mt-4 gap-7 items-start">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3">
            {WishList?.map((item) => (
              <ProductCard
                item={item.productId}
                key={item.productId._id}
                id={item.productId._id}
                title={item.productId.name}
                image={item.productId?.image}
                price={item.productId.price}
                brand={item.productId.brand}
                availability={item.productId.availability}
                WishListCard={true}
                // category={item.category}
              ></ProductCard>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default WishList
