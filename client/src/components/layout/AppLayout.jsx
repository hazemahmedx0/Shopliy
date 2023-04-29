import { Helmet } from 'react-helmet'

import MainHeader from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function AppLayout({ title, description }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

AppLayout.defultProps = {
  title: 'Shopliy | Ecommerce',
  description: 'Ecommerce website',
}

export default AppLayout
