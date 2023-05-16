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
    padding: '5px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '10px',
    cursor: 'pointer',
    backgroundColor: active ? '#D1FADF' : '',
    color: active ? '#039855' : '#667085',
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
    return <div>Section 1</div>
  } else if (active === 1) {
    return <div>Section 2</div>
  } else if (active === 2) {
    return <RecentUsersList />
  } else if (active === 3) {
    return <AdminTable />
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
    <Container style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flex: '0 0 400px', position: 'fixed', left: 0 }}>
        <Navbar>
          <Navbar.Section>
            <Stack direction="horizontal" gap="sm" align="center">
              <img
                src={FullLogo}
                alt="Logo"
                height={35}
                style={{
                  marginLeft: '20px',
                  marginRight: '100px',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              />
            </Stack>
          </Navbar.Section>
          <Navbar.Section grow>
            <Stack justify="center" spacing="sm">
              {links}
            </Stack>
          </Navbar.Section>
        </Navbar>
      </div>
      <div style={{ flex: 1, marginLeft: '160px' }}>
        <Current active={active} />
      </div>
    </Container>
  )
}

export default AdminAccount
