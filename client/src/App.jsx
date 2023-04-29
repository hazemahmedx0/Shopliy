import './App.css'
import { Route, Routes } from 'react-router-dom'

// Route Pages
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
