import React, { useRef, useState } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  NumberInput,
  // NumberInputHandlers,
  rem,
  Button,
} from '@mantine/core'

import { useCart } from '../context/cartctx'
import { Trash } from 'iconoir-react'
import CartProduct from '../components/common/Cart/CartProduct'

const data = [
  {
    avatar:
      'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    phone: '+44 (452) 886 09 12',
    price: 100,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    phone: '+44 (934) 777 12 76',
    price: 200,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    phone: '+44 (901) 384 88 34',
    price: 40,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    phone: '+44 (667) 341 45 22',
    price: 60,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    phone: '+44 (881) 245 65 65',
    price: 500,
  },
]

const jobColors = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
}

const Cart = () => {
  const [loading, setloading] = useState(false)

  const [CartProducts, setCartProducts] = useCart()
  console.log('CartProducts', CartProducts.items)
  const handlers = useRef()

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  const rows = CartProducts?.items?.map((item) => (
    <CartProduct item={item} key={item._id} />
  ))

  return (
    <>
      <Container className=" mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>
        <h1 className="text-left font-bold text-zinc-800 mt-6">
          Shopping Cart
        </h1>
        <div className="flex flex-row justify-between mt-20 gap-7 items-start">
          <div className="gorw">
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th className="w-40">Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>

          <div className="flex w-full flex-col">
            <div className="bg-[#F9FAFB] w-full rounded-sm flex flex-col justify-start items-start p-5">
              <p className=" text-gray-800 font-semibold text-xl mb-4">
                Order Summary
              </p>
              <div className="text-left flex flex-row justify-between w-full">
                <p className="text-[#475467]">item(s) Total</p>
                <p>{CartProducts?.subTotal}</p>
              </div>
            </div>

            <Button className="w-full mt-4" type="submit" loading={loading}>
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Cart
