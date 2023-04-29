import './App.css'
import { Route, Routes } from 'react-router-dom'
// Route Pages

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'

import PageNotFound from './pages/PageNotFound'
import ImageUpladtext from './pages/imageUpladtext'

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
        </Route>
      </Routes>
    </>
  )
}

export default App
