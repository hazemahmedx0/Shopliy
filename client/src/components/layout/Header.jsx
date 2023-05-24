import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cartctx'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Input,
  Avatar,
  Badge,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

// Icons
import {
  Search,
  Heart,
  ShoppingBag,
  ProfileCircle,
  LogOut,
} from 'iconoir-react'

import { logo } from './../../assets'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import BagContext from '../../context/BagContext'
import WishListContext from '../../context/WishListContext'
import { useContext } from 'react'
import authAPI from '../../api/AuthAPI'
// Static values

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/categories',
    label: 'Categories',
  },
  // {
  //   link: '/deals',
  //   label: 'Top Deals',
  // },
  // {
  //   link: '/offers',
  //   label: 'Offers',
  // },
]
const HEADER_HEIGHT = '110px'

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

function MainHeader() {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [CartProducts, setCartProducts] = useCart()

  const { bag, setthebag } = useContext(BagContext)
  const { wishListNumber, incWishList } = useContext(WishListContext)
  useEffect(() => {
    setthebag(CartProducts?.items?.length)
  }, [CartProducts, navigate])

  const isUser = auth.user
  const curLink = useParams()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [active, setActive] = useState(`/${curLink['*'] ? curLink['*'] : ''}`)
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
        navigate(link.link)
        close()
      }}
    >
      {link.label}
    </a>
  ))

  const handleLogout = async () => {
    try {
      const res = await authAPI.logout()
      setAuth({ user: null, token: null })
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const [wishList, setWishList] = useState(0)

  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishList')) || []
      setWishList(wishlist.length)
    }

    // Update wishlist when storage changes
    window.addEventListener('storage', updateWishlist)

    // Initial update
    updateWishlist()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', updateWishlist)
    }
  }, [])
  const [searchValue, setSearchValue] = useState('')
  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = () => {
    navigate(`/search/${searchValue}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
      <Container className={classes.header}>
        {/* Left side */}

        <div className="flex felx-col gap-7">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Group spacing={5} className={classes.links}>
            {items}
            {isUser?.isAdmin ? (
              <Link
                className=" bg-slate-200 px-3 py-2 rounded-xl font-medium text-sm text-gray-500"
                to="/admin"
              >
                Dashboard
              </Link>
            ) : null}
          </Group>
        </div>
        {/* righ Side */}

        <div className="flex flex-row items-center gap-3 ">
          <Input
            className="  w-[300px] flex max-w-sm rounded-full mr-3"
            placeholder="What you are looking for?"
            radius="xl"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rightSection={
              <div
                className=" p-2 rounded-full bg-primary cursor-pointer"
                onClick={handleSearch}
              >
                <Search color="white" height={16} width={16} />
              </div>
            }
          />
          <Link to="/wishlist" className="relative">
            <Badge
              className="!p-1 !px-[6px] absolute top-[-8px]"
              variant="filled"
            >
              {wishListNumber ? wishListNumber : 0}
            </Badge>
            <Heart color="#98A2B3" strokeWidth={2} />
          </Link>
          <Link to="/cart" className="relative">
            <Badge
              className="!p-1 !px-[6px] absolute top-[-8px]"
              variant="filled"
            >
              {bag ? bag : 0}
            </Badge>
            <ShoppingBag color="#98A2B3" strokeWidth={2} />
          </Link>
          <div className="w-[2px] rounded-full h-3 bg-gray-300 mx-2"> </div>
          <div>
            {
              <div className=" flex flex-row items-center gap-2">
                {!isUser ? (
                  <>
                    <ProfileCircle color="#98A2B3" strokeWidth={2} />
                    <Link
                      className=" font-medium text-sm text-gray-500"
                      to="/login"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/myaccount">
                      <div className=" flex flex-row items-center gap-2">
                        <Avatar
                          className=" rounded-full"
                          src={isUser?.photo}
                          alt="it's me"
                        />

                        <p className=" font-medium text-sm text-gray-500">
                          {isUser.firstName}
                        </p>
                        <LogOut
                          color="#98A2B3"
                          strokeWidth={2}
                          onClick={handleLogout}
                        />
                      </div>
                    </Link>
                  </>
                )}
              </div>
            }
          </div>
        </div>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
export default MainHeader
