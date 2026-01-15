import React, { useEffect, useState } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import Logo2 from "../assets/icons/logo-2.svg?react";
import { SquareArrowOutUpRight } from "lucide-react";

import careerpageBG from "../assets/images/careerpageBG.jpg";
import careerBg from "../assets/images/careerBg.jpeg";
import jobImg from "../assets/images/jobImg.jpeg";

import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDesktopBanners,
  fetchMobileBanners,
} from "../api/banner/bannerApi";

const CareerPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openPositions, setOpenPositions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    message: "",
  });
  // const [cv, setCv] = useState(null);
  // const [desktopBanner, setDesktopBanners] = useState([]);
  // const [mobileBanner, setMobileBanner] = useState([])
  const [activeJobId, setActiveJobId] = useState(null);

  const location = useLocation();

  const page = location.pathname === "/career" && "career";
  const [loaded, setLoaded] = useState(false);

  // const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // useEffect(() => {
  //     const handleResize = () => {
  //         setIsMobileView(window.innerWidth < 768);
  //     };

  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const { data: desktopBanner = [] } = useQuery({
    queryKey: ["desktop-banners", page],
    queryFn: () => fetchDesktopBanners(page),
  });

  const { data: mobileBanner = [] } = useQuery({
    queryKey: ["mobile-banners", page],
    queryFn: () => fetchMobileBanners(page),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const fetchSelectedDesktopBanners = async () => {
  //     const res = await axios.get(`https://ba-dastoor-backend.onrender.com/api/banners/get-selected-desktopBanner?page=${page}`);
  //     setDesktopBanners(res?.data?.data);
  // }

  // useEffect(() => { fetchSelectedDesktopBanners() }, [page])
  // console.log(desktopBanner[0]?.desktop?.url)

  // const fetchMobileBanners = async () => {
  //     const res = await axios.get(`https://ba-dastoor-backend.onrender.com/api/banners/mobile/get-mobileBanner?page=${page}`);
  //     setMobileBanner(res?.data?.data)
  // }

  // useEffect(() => {
  //     fetchMobileBanners()
  // }, [page]);

  const selectedDesktopBanners = desktopBanner.filter(
    (item) => item.isSelected === true
  );
  const imageBanners = selectedDesktopBanners.filter(
    (item) => item.desktop?.mediaType === "image"
  );
  const hasDesktopImages =
    Array.isArray(imageBanners) && imageBanners.length > 0;

  // const videoBanner = selectedDesktopBanners.find(
  //     (item) => item.desktop?.mediaType === "video"
  // );
  // Mobile
  const selectedMobileBanners = mobileBanner.filter(
    (item) => item.isSelected === true
  );
  const imageMobileBanners = selectedMobileBanners.filter(
    (item) => item.mobile?.mediaType === "image"
  );
  // const hasMobileImages = Array.isArray(imageMobileBanners) && imageMobileBanners.length > 0;

  // const videoMobileBanner = selectedMobileBanners.find(
  //     (item) => item.mobile?.mediaType === "video"
  // );

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const desktopVisible = window.matchMedia("(min-width: 1024px)").matches;
    const banners = desktopVisible ? imageBanners : imageMobileBanners;

    if (banners.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % banners.length);
    }, 3000); // ✅ now 8000 REALLY means 8 seconds

    return () => clearInterval(id);
  }, [imageBanners.length, imageMobileBanners.length]);

  const fetchJobList = async () => {
    try {
      const res = await axios.get(
        "https://ba-dastoor-backend.onrender.com/api/jobs/all-jobs"
      );
      // console.log(res?.data?.data)
      setOpenPositions(res?.data?.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobList();
  }, []);

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setShowForm(true);
  };

  // const handleFileChange = (e) => {
  //     setCv(e.target.files[0]);
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const toastId = toast.loading("Submitting...", {
      style: {
        backgroundColor: "#1f2937", // slate-800 (universal)
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
    try {
      const payload = {
        enquiryType: "career",
        ...formData,
      };
      const res = await axios.post(
        "https://ba-dastoor-backend.onrender.com/api/enquirys/create-enquiry",
        payload
      );

      toast.update(toastId, {
        render: "Your enquiry has been submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        position: "",
        experience: "",
        message: "",
      });
      // setCv(null);
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        style: {
          backgroundColor: "#7a1c1c",
          color: "#ffffff",
        },
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="relative hidden lg:block h-[40vh] w-full overflow-hidden">
        {imageBanners?.length > 0 && imageBanners[current] && (
          <div className="absolute inset-0">
            <img
              src={imageBanners[current].desktop.url}
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
              loading="eager"
            />

            {/* <div className="absolute inset-0 bg-black/25" /> */}

            {/* <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-2xl font-semibold">Catering</h1>
            </div> */}
          </div>
        )}
      </div>

      <div className="relative block lg:hidden h-[180px] w-full overflow-hidden">
        {imageMobileBanners?.length > 0 && imageMobileBanners[current] && (
          <div className="absolute inset-0">
            <img
              src={imageMobileBanners[current].mobile.url}
              onLoad={() => setLoaded(true)}
              alt="Catering Banner"
              className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
              loading="eager"
            />

            {/* <div className="absolute inset-0 bg-black/25" /> */}

            <div className="absolute bottom-4 w-full text-center">
              <h1 className="text-white text-2xl font-semibold">Catering</h1>
            </div>
          </div>
        )}
      </div>

      {/* Open Positions */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${careerBg})` }}
        />
        {/* <div className="absolute inset-0 bg-black/45" /> */}
        <div className="relative z-10">
          {!showForm ? (
            <div className=" py-16 px-4 z-50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  {/* <div className="inline-block mb-6">
                                <span className="text-5xl">🍽️</span>
                            </div> */}
                  <div className="flex justify-center mb-10">
                    <Logo2 className="h-32 w-auto" />
                  </div>
                  <h3 className="text-[#8B4513] text-3xl md:text-4xl font-serif mb-4">
                    Openings
                  </h3>
                  <p className="text-gray-600 text-lg max-w-3xl mx-auto font-serif">
                    At Ba-Dastoor, we believe in the art of fine dining. Join
                    our team of passionate professionals dedicated to creating
                    exceptional culinary experiences.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
                  {openPositions.map((position) => (
                    <div
                      key={position._id}
                      className="relative w-full min-h-[220px] cursor-pointer overflow-hidden rounded-lg"
                      style={{
                        backgroundImage: `url(${jobImg})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* ===== Default Content ===== */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3">
                        <h3 className="relative bottom-2 text-lg font-semibold text-gray-800 font-serif">
                          {position.jobTitle}
                        </h3>

                        <div className="relative -bottom-2 flex flex-wrap justify-center gap-2">
                          {/* Location */}
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 mr-1 text-[#8B4513]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{position.location}</span>
                          </div>

                          {/* Experience */}
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 mr-1 text-[#8B4513]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051l4.75-2.05 4.75 2.05 2.644-1.131a1 1 0 000-1.838l-7-3z" />
                            </svg>
                            <span className="text-xs">
                              {position.experience}
                            </span>
                          </div>
                        </div>

                        {/* Apply Button */}

                        <button
                          onClick={() => handlePositionClick(position)}
                          className="relative top-2 mt-6 px-8 border border-[#C9A24D] text-[#C9A24D] text-sm font-medium py-1.5 rounded-md hover:bg-[#C9A24D] hover:text-black transition-colors duration-200"
                        >
                          Apply Now
                        </button>

                        {/* View More */}
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveJobId(position._id);
                            }}
                            className="mt-2 relative top-2
      flex items-center gap-1
      text-xs text-[#bd9133]
      hover:underline"
                          >
                            <span>View More</span>
                            <SquareArrowOutUpRight size={12} />
                          </button>
                        </div>
                      </div>

                      {/* ===== Click-based Overlay ===== */}
                      <div
                        className={`absolute inset-0 z-20 bg-black/10 backdrop-blur-sm
              flex flex-col justify-between px-4 py-4
              transition-all duration-300 ease-out
              ${
                activeJobId === position._id
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0 pointer-events-none"
              }
            `}
                      >
                        {/* Close Button */}
                        <button
                          onClick={() => setActiveJobId(null)}
                          className="absolute top-2 right-2 text-sm text-gray-700 hover:text-black"
                        >
                          ✕
                        </button>

                        {/* Description */}
                        <div>
                          <h4 className="text-md font-bold text-[#8B4513] mb-2 text-center">
                            Job Description
                          </h4>
                          <p className="text-xs font-semibold text-[#8B4513] line-clamp-5 text-center">
                            {position.description}
                          </p>
                        </div>

                        {/* Apply Button */}
                        {/* <button
                                                    onClick={() => handlePositionClick(position)}
                                                    className="mt-4 w-full border border-[#C9A24D] text-[#C9A24D]
                text-sm font-medium py-1.5 rounded-md
                hover:bg-[#C9A24D] hover:text-black
                transition-colors duration-200"
                                                >
                                                    Apply Now
                                                </button> */}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center bg-gradient-to-r from-[#f8f4f0] to-[#f0e6d6] rounded-2xl p-12 z-50">
                  <div className="max-w-3xl mx-auto">
                    <h4 className="text-2xl md:text-3xl font-serif text-[#bd9133] mb-4">
                      Passion for Hospitality?
                    </h4>
                    <p className="text-gray-600 text-lg mb-8 font-serif">
                      Even if you don't see the perfect role, we're always
                      looking for talented individuals passionate about food,
                      service, and creating memorable experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowForm(true)}
                        className=" border border-[#C9A24D] text-[#bd9133] py-3 px-8 rounded-lg hover:bg-[#C9A24D] hover:text-white transition-colors duration-300 text-lg "
                      >
                        Submit General Application
                      </button>
                      {/* <button className="bg-transparent border-2 border-[#8B4513] text-[#8B4513] font-semibold py-3 px-8 rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors duration-300 text-lg">
                                                Meet Our Team
                                            </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#7a7573] py-14 px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <Logo className="h-30 w-auto" />
                </div>
                <h3 className="text-[#FFD700] text-[2rem] tracking-widest mb-8">
                  JOIN THE BA-DASTOOR TEAM
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="career-input"
                    placeholder="Enter your Name"
                  />
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="career-input"
                    placeholder="Mobile Number"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="career-input"
                    placeholder="Email"
                  />
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="career-input"
                    placeholder="Position Applied For"
                  />
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="career-input"
                    placeholder="Years of Experience"
                  />

                  <textarea
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="career-textarea sm:col-span-2"
                    placeholder="Additional Information"
                    rows="3"
                  />
                  <div className="sm:col-span-2 flex justify-center mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`career-btn ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Submit...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CareerPage;
