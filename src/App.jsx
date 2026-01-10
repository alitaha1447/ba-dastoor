import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Gallery from './pages/Gallery'
import CareerPage from './pages/CareerPage'
import CateringEnquiry from './pages/CateringEnquiry'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/catering-enquiry" element={<CateringEnquiry />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        style={{ top: "90px" }}   // 👈 adjust based on header height
      />
    </>
  )
}

export default App
