import MainHeader from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
