import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import authAPI from '../../api/AuthAPI'
import {
  Navbar,
  createStyles,
  getStylesRef,
  rem,
  Group,
  Code,
} from '@mantine/core'
import {
  ViewGrid,
  Svg3DSelectFace,
  FaceId,
  SimpleCart,
  LogOut,
} from 'iconoir-react'
import { fullLogo } from '../../assets'
const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },
}))

const data = [
  { link: '/admin', label: 'Overview', icon: ViewGrid },
  { link: '/admin/products', label: 'Products', icon: Svg3DSelectFace },
  { link: '/admin/cutomers', label: 'Customers', icon: FaceId },
  { link: '/admin/orders', label: 'Orders', icon: SimpleCart },
]

const AdminLayout = () => {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Billing')

  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  console.log(auth)
  useEffect(() => {
    if (auth.isAdmin) {
      navigate('/')
    }
  }, [navigate, auth.isAdmin])

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} strokeWidth={2} />

      <span>{item.label}</span>
    </Link>
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

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Navbar className="h-full" width={{ sm: 300 }} p="md">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <img src={fullLogo} alt="logo" className="h-8" />

            <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={handleLogout}>
            <LogOut className="mr-2" />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default AdminLayout
