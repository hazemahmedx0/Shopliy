import MainHeader from './Header'
import Footer from './Footer'

function AppLayout({ children }) {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default AppLayout
