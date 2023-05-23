import { useRef, useState } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Table,
  Button,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useCart } from '../context/cartctx'
import CartProduct from '../components/common/Cart/CartProduct'
import { useAuth } from '../context/auth'
import NewAddress from '../components/common/Cart/NewAddress'
import orderApi from '../api/orderApi'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const WishList = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [CartProducts, setCartProducts] = useCart()
  const handlers = useRef()

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Wish List', href: '/wishlist' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  const rows = CartProducts?.items?.map((item) => (
    <CartProduct item={item} key={item._id} />
  ))
  const [opened, { open, close }] = useDisclosure(false)

  const confimOrderHandler = (address) => {
    const addTheOrder = async () => {
      try {
        const res = await orderApi.addOrder({
          shippingAddress: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
          },
        })
        navigate(`order/confirm/${res._id}`, {
          state: { id: 1, orderId: res._id },
        })

        close()
      } catch (err) {
        console.log(err)
      }
    }
    addTheOrder()
  }

  const wishlist = JSON.parse(localStorage.getItem('wishList')) || []

  return (
    <>
      <Container className=" mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>
        <h1 className="text-left font-bold text-zinc-800 mt-6">Wish list</h1>
        <div className="flex flex-row justify-between mt-4 gap-7 items-start">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3">
            {wishlist.map((item) => (
              <ProductCard
                item={item}
                key={item._id}
                id={item._id}
                title={item.name}
                image={item.image}
                price={item.price}
                brand={item.brand}
                availability={item.availability}
                // category={item.category}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default WishList
