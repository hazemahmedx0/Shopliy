import React, { useEffect, useRef, useState, useContext } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  NumberInput,
  createStyles,
  // NumberInputHandlers,
  getStylesRef,
  Image,
  Card,
  rem,
  Button,
  Badge,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { useAuth } from '../context/auth'
import { useCart } from '../context/cartctx'
import BagContext from '../context/BagContext'

import { Carousel } from '@mantine/carousel'

import { Heart } from 'iconoir-react'
import CartProduct from '../components/common/Cart/CartProduct'
import productApi from '../api/productApi'
import { useParams, useNavigate } from 'react-router'
import cartApi from '../api/cartApi'

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  carousel: {
    '&:hover': {
      [`& .${getStylesRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: rem(16),
    },
  },
}))

const ProductPage = () => {
  const { classes } = useStyles()

  const { productId } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [currentProduct, setCurrentProduct] = useState({})
  useEffect(() => {
    const getCurrentProudct = async () => {
      try {
        const res = await productApi.getProductById(productId)
        setCurrentProduct(res)
      } catch (error) {
        console.log(error)
      }
    }
    getCurrentProudct()
  }, [navigate, productId])

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))
  console.log(currentProduct)

  const slides = currentProduct?.image?.map((image) => (
    <Carousel.Slide key={image} className=" flex flex-row">
      <Image src={image} />
    </Carousel.Slide>
  ))

  const [auth, setAuth] = useAuth()
  const { bag, incBag } = useContext(BagContext)
  const [CartProducts, setCartProducts] = useCart()

  const addTocartApi = async () => {
    try {
      const res = await cartApi.addProduct(productId)

      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const addProductTocard = () => {
    setLoading(true)

    if (auth.user) {
      addProductToCart(currentProduct)
      incBag(productId)
      addTocartApi()
    } else {
      addProductToCartLocal(currentProduct)
    }
    notifications.show({
      title: `📦 ${currentProduct.title} added to cart`,
      message: 'You can review it in the cart section',
    })
  }

  const addProductToCartLocal = (product) => {
    console.log('sdsds', product)
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
      (item) => item.productId._id === currentProduct._id
    )
    console.log('existingProductIndex', existingProductIndex)
    if (existingProductIndex !== -1) {
      // product already exists in cart, update quantity
      cart.items[existingProductIndex].quantity += 1
    } else {
      // product not in cart, add it
      const newCartItem = {
        productId: currentProduct,
        quantity: 1,
        price: currentProduct.price,
        totalPrice: currentProduct.price,
        _id: currentProduct._id,
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
    console.log('sdsds', product)
    const existingProductIndex = CartProducts?.items
      ? CartProducts?.items?.findIndex(
          (item) => item.productId._id === product._id
        )
      : -1
    console.log('existingProductIndex', existingProductIndex)
    if (CartProducts?.items && existingProductIndex !== -1) {
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
    <>
      <Container className=" mt-8 mb-28">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>

        <div className="flex flex-row mt-12">
          <Card radius="md" className=" w-3/6 h-full" withBorder padding="xl">
            <Card.Section className="h-full">
              <Carousel
                withIndicators
                loop
                classNames={{
                  root: classes.carousel,
                  controls: classes.carouselControls,
                  indicator: classes.carouselIndicator,
                }}
                className="h-full"
              >
                {slides}
              </Carousel>
            </Card.Section>
          </Card>
          <div className=" ml-12  w-3/6 flex flex-col items-start">
            <Badge className="mb-8">{currentProduct.brand}</Badge>
            <Text className=" text-4xl text-left mb-4" weight={700}>
              {currentProduct.name}
            </Text>
            <Text className=" text-4xl text-left mb-12" weight={700}>
              {`$${currentProduct.price}`}
            </Text>
            <div className=" flex flex-col gap-3 w-full">
              {/* <Button className="w-full" radius="md">
                Buy Now
              </Button> */}
              <div className="flex flex-row gap-4">
                <Button
                  className="w-full"
                  radius="md"
                  onClick={addProductTocard}
                  loading={loading}
                >
                  Add to cart
                </Button>
                <Button variant="outline" className="  shrink-1" radius="md">
                  <Heart />
                </Button>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start">
              <p className=" text-zinc-400">Description</p>
              <p className="text-left max-w-2xl">
                {currentProduct.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProductPage
