import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import { showAppLoader, hideAppLoader } from "./utils/appLoader";
// import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
// import Gallery from "./pages/Gallery";
// import CareerPage from "./pages/CareerPage";
// import CateringEnquiry from "./pages/CateringEnquiry";
// import Franchise from "./pages/Franchise";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Gallery = lazy(() => import("./pages/Gallery"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const CateringEnquiry = lazy(() => import("./pages/CateringEnquiry"));
const Franchise = lazy(() => import("./pages/Franchise"));

const LoaderFallback = () => {
  useEffect(() => {
    showAppLoader();
    return () => hideAppLoader();
  }, []);

  return null; // loader lives outside React
};

function App() {
  return (
    <>
      <Suspense fallback={<LoaderFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/catering-enquiry" element={<CateringEnquiry />} />
            <Route path="/franchise" element={<Franchise />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          style={{ top: "90px" }} // 👈 adjust based on header height
        />
      </Suspense>
    </>
  );
}

export default App;
