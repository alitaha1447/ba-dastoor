import './App.css'
import { Routes, Route } from 'react-router'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import CareerPage from './pages/CareerPage'
import CateringEnquiry from './pages/CateringEnquiry'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Route>
        <Route path="/career" element={<CareerPage />} />
        <Route path="/catering-enquiry" element={<CateringEnquiry />} />
      </Routes>
    </>
  )
}

export default App
