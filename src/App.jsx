import './App.css'
import { Routes, Route } from 'react-router'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import CareerPage from './pages/CareerPage'
import CateringEnquiry from './pages/CateringEnquiry'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/catering-enquiry" element={<CateringEnquiry />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
