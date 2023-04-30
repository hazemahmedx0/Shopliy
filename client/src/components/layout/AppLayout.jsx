import { Helmet } from 'react-helmet'

import MainHeader from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import authAPI from '../../api/AuthAPI'
function AppLayout({ title, description }) {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('authds')
    const abc = async () => {
      try {
        const res = await authAPI.verifyUser() // this is user -> GET me
        console.log('this is res', res)
        // if (res === 'login form') {
        //   throw new Error('Error message')
        // }
        setAuth({
          ...auth,
          user: res,
        })
        // console.log('res', auth)
      } catch (err) {
        console.log('this is error', err)
        // console.log('err', err)
      }
    }
    abc()
  }, [navigate])

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
