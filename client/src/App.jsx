import './App.css'
import { Route, Routes } from 'react-router-dom'
// Route Pages

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

import SignUp from './pages/Auth/SignUp'

import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
