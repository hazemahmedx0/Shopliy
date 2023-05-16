import React, { useEffect, useRef, useState } from 'react'
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
  createStyles,
  // NumberInputHandlers,
  getStylesRef,
  Image,
  Card,
  rem,
  Button,
} from '@mantine/core'

import { Carousel } from '@mantine/carousel'

import { useCart } from '../context/cartctx'
import { AutoFlash, Trash } from 'iconoir-react'
import CartProduct from '../components/common/Cart/CartProduct'
import productApi from '../api/productApi'
import { useParams, useNavigate } from 'react-router'

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

  const [loading, setloading] = useState(false)

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
          <div>
            <p>ss</p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProductPage
