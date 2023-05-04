import './App.css'
import { Route, Routes } from 'react-router-dom'
// Route Pages

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

import SignUp from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

import AdminLogin from './pages/Admin/Login'

import PageNotFound from './pages/PageNotFound'
import ImageUpladtext from './pages/imageUpladtext'
import Private from './components/routes/Private'
import Cart from './pages/Cart'
import MyAccount from './pages/MyAccount'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/upldaz" element={<ImageUpladtext />} /> */}
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<PageNotFound />} />

          <Route path="" element={<Private />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/myaccount" element={<MyAccount />} />

            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Route>

        {/* Admin section */}
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App
