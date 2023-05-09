import React, { useState } from 'react'
import { Navbar, UnstyledButton, Stack, Container } from '@mantine/core'
import { ViewGrid, Svg3DSelectFace, FaceId, SimpleCart } from 'iconoir-react'
import AdminTable from '../../components/AdminTable'
import RecentUsersList from '../../components/RecentUsersList'
import FullLogo from '../../assets/images/FullLogo.svg'

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  const linkStyle = {
    width: 'auto',
    height: 'auto',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '10px',
    cursor: 'pointer',
    backgroundColor: active ? '#f0f0f0' : '',
    color: active ? '#000' : '',
  }

  return (
    <UnstyledButton style={linkStyle} onClick={onClick}>
      <Icon size="1.2rem" stroke={1.5} />
      <p>{label}</p>
    </UnstyledButton>
  )
}

const Current = ({ active }) => {
  if (active === 0) {
    return <AdminTable />
  } else if (active === 1) {
    return <RecentUsersList />
  } else if (active === 2) {
    return <div>Section 3</div>
  } else if (active === 3) {
    return <div>Section 4</div>
  }
}

const mockdata = [
  { icon: ViewGrid, label: 'Overview' },
  { icon: Svg3DSelectFace, label: 'Product' },
  { icon: FaceId, label: 'Customers' },
  { icon: SimpleCart, label: 'Orders' },
]

const AdminAccount = () => {
  const [active, setActive] = useState(0)

  const handleLinkClick = (index) => {
    setActive(index)
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => handleLinkClick(index)}
    />
  ))

  return (
    <Container style={{ display: 'flex' }}>
      <div style={{ position: 'fixed', left: 0 }}>
        <Navbar>
          <img
            src={FullLogo}
            alt="Logo"
            height={40}
            style={{ marginRight: '20px' }}
          />
          <Navbar.Section grow>
            <Stack justify="center" spacing="sm">
              {links}
            </Stack>
          </Navbar.Section>
        </Navbar>
      </div>
      <div style={{ marginLeft: '200px' }}>
        <Current active={active} />
      </div>
    </Container>
  )
}

export default AdminAccount
