import { useEffect, useState } from 'react'
import {
  Navbar,
  UnstyledButton,
  createStyles,
  Stack,
  Container,
} from '@mantine/core'

import MyInfo from '../components/common/UserAcoount/MyInfo'
import MyInfoAddress from '../components/common/UserAcoount/MyInfoAddress'
import MyOrders from '../components/common/UserAcoount/MyOrders'

import { ProfileCircle, PinAlt, Svg3DSelectFace } from 'iconoir-react'
import { useLocation } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  link: {
    width: 'auto',
    height: 'auto',
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing.xs,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
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

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles()
  return (
    <UnstyledButton
      onClick={onClick}
      className={cx(classes.link, { [classes.active]: active })}
    >
      <Icon size="1.2rem" stroke={1.5} />
      <p>{label}</p>
    </UnstyledButton>
  )
}

const mockdata = [
  { icon: ProfileCircle, label: 'My information' },
  { icon: PinAlt, label: 'Address' },
  { icon: Svg3DSelectFace, label: 'Orders' },
]

const Current = ({ active }) => {
  if (active === 0) {
    return <MyInfo />
  }
  if (active === 1) {
    return <MyInfoAddress />
  }
  if (active === 2) {
    return <MyOrders />
  }
}

export default function MyAccount() {
  const [active, setActive] = useState(0)
  const location = useLocation()

  useEffect(() => {
    if (location?.state?.activated) {
      setActive(location.state.activated)
    }
  }, [location])

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <Container className="mb-40">
      <div className=" border-b font-medium mt-14 pb-4">
        <h1 className="text-left">My Account</h1>
      </div>

      <div className="flex flex-row justify-between">
        <Navbar className="flex" height={750} width={{ base: 240 }}>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
        </Navbar>
        <Current active={active} key={active} />
      </div>
    </Container>
  )
}
