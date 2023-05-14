import { SimpleCart, Heart } from 'iconoir-react'
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from '@mantine/core'

import { notifications } from '@mantine/notifications'

import BagContext from '../context/BagContext'
import { useContext, useEffect, useState } from 'react'
import cartApi from '../api/cartApi'
import { useCart } from '../context/cartctx'
import { useAuth } from '../context/auth'
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

const ProductCard = (props) => {
  const [auth, setAuth] = useAuth()
  const [Loading, setLoading] = useState(false)
  const { bag, incBag } = useContext(BagContext)
  const { classes, theme } = useStyles()
  const [CartProducts, setCartProducts] = useCart()

  const addTocartApi = async () => {
    try {
      const res = await cartApi.addProduct(props.id)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const addProductTocard = () => {
    setLoading(true)

    if (auth.user) {
      addProductToCart(props.item)
      incBag(props.id)
      addTocartApi()
    } else {
      addProductToCartLocal(props.item)
    }
    notifications.show({
      title: `📦 ${props.title} added to cart`,
      message: 'You can review it in the cart section',
    })
  }

  const addProductToCartLocal = (product) => {
    console.log('sdsds', product)
    // check if user is registered or not
    let cart

    if (!auth.user) {
      // if user is not registered, get cart items from local storage
      const cartItems = localStorage.getItem('cartItems')
      cart = cartItems ? JSON.parse(cartItems) : { items: [] }
    } else {
      // if user is registered, get cart items from database
      cart = { ...CartProducts }
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId._id === product._id
    )

    if (existingProductIndex !== -1) {
      // product already exists in cart, update quantity
      cart.items[existingProductIndex].quantity += 1
    } else {
      // product not in cart, add it
      const newCartItem = {
        productId: product,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        _id: product._id,
      }
      cart.items.push(newCartItem)
    }

    if (!auth.user) {
      // if user is not registered, save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(cart))
    } else {
      // if user is registered, update cart items in database
      setCartProducts(cart)
    }
    setLoading(false)
  }

  const addProductToCart = (product) => {
    const existingProductIndex = CartProducts?.items
      ? CartProducts?.items?.findIndex(
          (item) => item.productId._id === product._id
        )
      : -1
    console.log('existingProductIndex', existingProductIndex)
    if (CartProducts?.items || existingProductIndex !== -1) {
      // product already exists in cart, update quantity
      const updatedCart = { ...CartProducts }
      updatedCart.items[existingProductIndex].quantity += 1
      setCartProducts(updatedCart)
    } else {
      // product not in cart, add it
      const newCartItem = {
        productId: product,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        _id: Math.random().toString(),
      }
      console.log('newCartItem', newCartItem)
      console.log('CartProducts', CartProducts)
      const updatedCart = { ...CartProducts }
      updatedCart.items = updatedCart.items || [] // add items array if it doesn't exist
      updatedCart.items.push(newCartItem)
      setCartProducts(updatedCart)
    }
  }

  return (
    <Card
      //   withBorder
      //   className=" bg-black !border !border-yellow-400"
      radius="md"
      p="md"
      className={
        classes.card +
        ` transition-all  !border !rounded-[20px] hover:shadow-sm  border-[#F2F4F7] hover:border-green-200`
      }
    >
      <Card.Section>
        <ActionIcon
          className=" addToWishListbtn transition-all w-9 h-9 bg-red-100  hover:bg-red-50"
          variant="light"
          onClick={() =>
            notifications.show({
              title: 'Default notification',
              message: 'Hey there, your code is awesome! 🤥',
            })
          }
        >
          <Heart color="#F34141" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
        <Image src={props.image} alt={props.title} height={240} />
      </Card.Section>

      <Card.Section className="px-4" mt="md">
        <Group className="flex flex-col items-start gap-0" position="apart">
          <Text className="text-sm text-gray-400">{props.brand}</Text>
          <Text className=" trimTextCard text-lg font-semibold text-left text-[#344054]">
            {props.title}
          </Text>
          {/* <Badge size="sm">{props.title}</Badge> */}
        </Group>
      </Card.Section>

      <Card.Section className="px-4 flex flex-row items-center justify-between mt-6 pb-3">
        <Text className="text-left text-3xl text-[#1D2939] font-semibold  ">
          ${props.price}
        </Text>
        <ActionIcon
          className=" transition-all w-9 h-9 bg-green-100  hover:bg-green-50"
          variant="light"
          onClick={addProductTocard}
          loading={Loading}
        >
          <SimpleCart color="#15BE53" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
      </Card.Section>

      {/* <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
      </Group> */}
    </Card>
  )
}

export default ProductCard
