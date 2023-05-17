import './App.css'
import { Route, Routes } from 'react-router-dom'
// Route Pages

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

import SignUp from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

import AdminLogin from './pages/Admin/Login'
import AdminAccount from './pages/Admin/AdminAccount'

import PageNotFound from './pages/PageNotFound'
import ImageUpladtext from './pages/imageUpladtext'
import Private from './components/routes/Private'
import Cart from './pages/Cart'
import MyAccount from './pages/MyAccount'
import ProductPage from './pages/ProductPage'
import ConfimOrder from './components/common/Cart/ConfimOrder'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminCustomers from './pages/Admin/AdminCustomers'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminProductPage from './components/common/Admin/AdminProductPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<PageNotFound />} />

          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="cart/order/confirm/:orderid" element={<ConfimOrder />} />

          <Route path="" element={<Private />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/myaccount" element={<MyAccount />} />

            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:productId" element={<AdminProductPage />} />
          <Route path="cutomers" element={<AdminCustomers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Admin section */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminacc" element={<AdminAccount />} />
      </Routes>
    </>
  )
}

export default App
