import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useIsFetching } from "@tanstack/react-query";
import MainLayout from "./components/layout/MainLayout";
import { showAppLoader, hideAppLoader } from "./utils/appLoader";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Gallery = lazy(() => import("./pages/Gallery"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const CateringEnquiry = lazy(() => import("./pages/CateringEnquiry"));
const Franchise = lazy(() => import("./pages/Franchise"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

const LoaderFallback = () => {
  useEffect(() => {
    showAppLoader();
    return () => hideAppLoader();
  }, []);

  return null;
};

function App() {
  // const [allSEO, setAllSEO] = useState([]);

  // ✅ CALL API ONCE WHEN APP LOADS
  // const fetchAllSEO = async () => {
  //   try {
  //     const res = await api.get("/api/seo/get-all-seo");
  //     console.log(res.data.data);
  //     setAllSEO(res?.data?.data || []);
  //   } catch (error) {
  //     console.error("Failed to load SEO:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllSEO();
  // }, []);

  return (
    <>
      <Suspense fallback={<LoaderFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/catering-enquiry" element={<CateringEnquiry />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          style={{ top: "90px" }}
          containerClassName="custom-toast-container"
        />
      </Suspense>
    </>
  );
}

export default App;
