import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import bannerImg3 from "../assets/images/bannerImage3.jpg";
import underLine from "../assets/images/underLine.png";
import menuBG from "../assets/images/menuBG.jpeg";
import frame2 from "../assets/images/frame2.jpeg";
import RuhCafeLogo from "../assets/images/RuhCafeLogo.png";

import GoogleReviewsCarousel from "../components/googleReview/GoogleReviewWidget";
import axios from "axios";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDesktopBanners,
  fetchMobileBanners,
} from "../api/banner/bannerApi";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [totalReviewCount, setTotalReviewCount] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [content, setContent] = useState({});
  const [mainContent, setMainContent] = useState({});

  const [menuLists, setMenuLists] = useState([]);

  const location = useLocation();
  const menuRef = useRef(null);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const page =
    location.pathname === "/" ? "home" : location.pathname.replace("/", "");

  const { data: desktopBanner = [] } = useQuery({
    queryKey: ["desktop-banners", page],
    queryFn: () => fetchDesktopBanners(page),
  });
  const { data: mobileBanner = [] } = useQuery({
    queryKey: ["mobile-banners", page],
    queryFn: () => fetchMobileBanners(page),
  });

  //   ---------ANIMATION EFFECT------------
  const { ref: logoRef, inView: logoInView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });
  const { ref: descRef, inView: descInView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });
  const { ref: imageRef, inView: imageInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === "menu") {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const menuElement = document.getElementById("menu");
        if (menuElement) {
          menuElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }

    // Clear the state after scrolling to prevent re-triggering
    if (location.state?.scrollTo) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  // Scroll to top on initial load

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchMainContent = async () => {
    try {
      const res = await api.get(`/api/content/get-content`);
      setMainContent(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMainContent();
  }, []);

  useEffect(() => {
    Promise.all([
      api.get(`/api/generalContent/get-content?page=${page}`),
      api.get(`/api/categories/get-categorywithdishes`),
    ]).then(([contentRes, menuRes]) => {
      setContent(contentRes.data.data);
      setMenuLists(menuRes.data.data || []);
    });
  }, [page]);

  // ----------------- //

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios(
        "https://featurable.com/api/v1/widgets/11b960ce-b735-4b9a-9cb1-808b4a28c17c",
      );
      setAvgRating(res?.data?.averageRating);
      setTotalReviewCount(res?.data?.totalReviewCount);
      setReviews(res?.data?.reviews);
    };
    fetchReview();
  }, []);

  const selectedDesktopBanners = desktopBanner.filter(
    (item) => item.isSelected === true,
  );

  const imageBanners = selectedDesktopBanners.filter(
    (item) => item.desktop?.mediaType === "image",
  );
  const hasDesktopImages =
    Array.isArray(imageBanners) && imageBanners.length > 0;

  const videoBanner = selectedDesktopBanners.find(
    (item) => item.desktop?.mediaType === "video",
  );
  // Mobile
  const selectedMobileBanners = mobileBanner.filter(
    (item) => item.isSelected === true,
  );
  const imageMobileBanners = selectedMobileBanners.filter(
    (item) => item.mobile?.mediaType === "image",
  );
  const hasMobileImages =
    Array.isArray(imageMobileBanners) && imageMobileBanners.length > 0;

  const videoMobileBanner = selectedMobileBanners.find(
    (item) => item.mobile?.mediaType === "video",
  );
  const [current, setCurrent] = useState(0);
  // const activeBanners = isMobileView ? imageMobileBanners : imageBanners;

  // OPTIMIZE CODE
  const activeBanners = React.useMemo(() => {
    return isMobileView ? imageMobileBanners : imageBanners;
  }, [isMobileView, imageMobileBanners, imageBanners]);
  const activeBannersLength = activeBanners ? activeBanners.length : 0;

  // OPTIMIZE CODE
  useEffect(() => {
    if (activeBannersLength <= 1) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % activeBannersLength);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBannersLength]);
  useEffect(() => {
    setCurrent(0);
  }, [isMobileView]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-gray-200">
        {/* 🖼️ IMAGE CAROUSEL (Desktop) */}
        {hasDesktopImages &&
          imageBanners.map((item, index) => (
            <div
              key={`desktop-${item?._id || index}`}
              className={`
        w-full h-full hidden md:block absolute inset-0
        transition-opacity duration-700
        ${index === current ? "opacity-100" : "opacity-0"}
    `}
            >
              <img
                // src={item?.desktop?.url}
                src={`${BASE_URL}${item?.desktop?.url}`}
                loading="lazy"
                alt="Banner"
                className="
            w-full h-full
            object-cover
            object-center
        "
              />
            </div>

            //         <div
            //             key={`desktop-${item?._id || index}`}
            //             className={`w-full h-full hidden md:block absolute inset-0 bg-no-repeat bg-center transition-opacity duration-700
            // ${index === current ? 'opacity-100' : 'opacity-0'}
            // bg-cover`}
            //             style={{
            //                 backgroundImage: item?.desktop?.url
            //                     ? `url(${item.desktop.url})`
            //                     : 'none',
            //             }}
            //         />
          ))}
        {/* 🎥 VIDEO (NO CAROUSEL AT ALL) */}
        {!hasDesktopImages && videoBanner && (
          <video
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            // src={videoBanner.desktop.url}
            src={`${BASE_URL}${videoBanner.desktop.url}`}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {hasMobileImages ? (
          imageMobileBanners.length === 1 ? (
            // ✅ SINGLE IMAGE (NO CAROUSEL)
            <div
              className="block md:hidden absolute inset-0 bg-no-repeat bg-center bg-cover"
              style={{
                // backgroundImage: imageMobileBanners[0]?.mobile?.url
                //   ? `url(${imageMobileBanners[0].mobile.url})`
                //   : "none",
                backgroundImage: imageMobileBanners[0]?.mobile?.url
                  ? `url(${BASE_URL}${imageMobileBanners[0].mobile.url})`
                  : "none",
              }}
            />
          ) : (
            // 🔁 MULTIPLE IMAGES (CAROUSEL)
            imageMobileBanners.map((item, index) => (
              <div
                key={`mobile-${item?._id || index}`}
                className={`block md:hidden absolute inset-0
                    bg-no-repeat bg-center bg-cover
                    transition-opacity duration-700 ease-in-out
                    ${index === current ? "opacity-100" : "opacity-0"}`}
                style={{
                  // backgroundImage: item?.mobile?.url
                  //   ? `url(${item.mobile.url})`
                  //   : "none",
                  backgroundImage: item?.mobile?.url
                    ? `url(${BASE_URL}${item?.mobile.url})`
                    : "none",
                }}
              />
            ))
          )
        ) : (
          // ❌ NO MOBILE IMAGE → FALLBACK
          <div className="block md:hidden absolute inset-0 bg-gray-400" />
        )}
        {/* 🎥 VIDEO (NO CAROUSEL AT ALL) */}
        {!hasMobileImages && videoMobileBanner && (
          <video
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
            // src={videoMobileBanner.mobile.url}
            src={`${BASE_URL}${videoMobileBanner.mobile.url}`}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
      {/* ANIMATED RUH CAFE LOGO */}
      {/* <div className="fixed top-25 right-10 sm:right-6 md:right-20 z-50 flip-wrapper"> */}
      <div
        className="fixed top-20 md:top-24 right-4 md:right-10
-translate-x-1 md:translate-x-0
translate-y-1 md:translate-y-0
z-50 flip-wrapper
"
      >
        <div className="group w-24 h-24 sm:w-32 sm:h-32 md:w-35 md:h-35 lg:w-35 lg:h-35 [perspective:1000px] cursor-pointer">
          <div className="relative w-full h-full transition-transform duration-700 ease-in-out auto-flip">
            {/* FRONT */}
            <div className="backface-hidden rounded-full w-full h-full bg-[#e3780fd4]">
              <a
                href="https://ruhcafe.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={RuhCafeLogo}
                  alt="RuhCafeLogo"
                  className="w-full h-full object-contain rounded-full"
                />
              </a>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-[#e3780fd4] text-center px-3 [transform:rotateY(180deg)] backface-hidden overflow-hidden">
              <a
                href="https://ruh-cafe-webpage.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="text-sm sm:text-lg md:text-xl text-white">
                  Welcome
                </h1>

                <h2 className="text-xs sm:text-sm md:text-base font-semibold text-white mt-1">
                  Ruh Cafe
                </h2>
              </a>

              {/* Bottom Circular Text */}
              {/* Bottom Circular Text */}
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    {/* Better positioned circle path */}
                    <path id="bottomCircle" d="M 20,120 a 80,65 0 1,0 160,0" />
                  </defs>

                  <text fill="#EFBF04" fontSize="14" letterSpacing="4">
                    <textPath
                      href="#bottomCircle"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      Powered By Ba-Dastoor
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section-2 */}
      <section className="w-full bg-[white] py-10 sm:py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Logo */}
          <div
            ref={logoRef}
            className={`flex justify-center mb-10 transition-all duration-700 ease-out ${
              logoInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
            }`}
          >
            {/* <Logo2 className="h-32 w-auto" /> */}
            <img
              // src={content?.logo?.url}
              src={`${BASE_URL}${content?.logo?.url}`} // replace with your image import
              alt="Ba-Dastoor Heritage"
              className=" h-32 object-fill"
            />
            {/* {content?.logo?.url} */}
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className={`text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[#2E2A27] mb-6  transition-all duration-700 ease-out ${
              headingInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {content?.heading}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className={`
            max-w-3xl mx-auto text-sm sm:text-base leading-relaxed
            text-[#5A5551] mb-14
            transition-all duration-700 ease-out
            ${
              descInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }
          `}
          >
            {content?.description}
          </p>

          {/* Image */}
          <div
            ref={imageRef}
            className={` w-full  aspect-[4/3] sm:aspect-[16/9]  max-h-[260px] sm:max-h-[360px] lg:max-h-[420px]
    overflow-hidden
    rounded-2xl
    shadow-lg    transition-all duration-700 ease-out ${
      imageInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    }
`}
          >
            {content?.media?.url && (
              <img
                // src={content.media.url}
                src={`${BASE_URL}${content.media.url}`}
                alt="Ba-Dastoor Heritage"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>
      {/* Section-3 */}
      <section id="menu" ref={menuRef} className="">
        <section className="relative w-full h-[280px] md:h-[350px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bannerImg3})`,
            }}
          />
          {/* Overlay for readability */}
          {/* <div className="absolute inset-0 bg-black/40" /> */}

          {/* Centered Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                style={{ fontFamily: "Cinzel" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white mb-4"
              >
                {mainContent?.heading}
              </h1>
              <p
                style={{ fontFamily: "Cinzel" }}
                className="max-w-3xl mx-auto  text-sm sm:text-base md:text-lg lg:text-xl text-white/90"
              >
                {mainContent?.paragraph}
              </p>
            </div>
          </div>
        </section>
        {/* Section-3 */}
        {/* Dish Section */}
        <section className="relative w-full h-screen overflow-hidden ">
          {/* 🔒 Background + Overlay (FIXED HEIGHT) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${menuBG})`,
            }}
          >
            {/* ✅ Overlay (NO REPEAT, FULL HEIGHT) */}
            <div className="absolute inset-0 bg-[#fff3e4]/60" />
          </div>

          {/* ✅ SCROLLING CONTENT ONLY */}
          <div className="relative z-10 h-full overflow-y-auto scrollbar-thin-custom2">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {menuLists.map((menu, index) => (
                  <div key={index} className="h-[420px] flex flex-col">
                    {/* Header */}
                    <div className="relative px-8 pt-8 pb-6 flex-shrink-0">
                      <h3
                        style={{ fontFamily: "Cinzel" }}
                        className="text-xl font-semibold text-center text-[#264a35]"
                      >
                        {menu.categoryName}
                        <span
                          className="opacity-80 pointer-events-none absolute left-1/2 -bottom-3 -translate-x-1/2
                                    w-80 h-10 bg-no-repeat bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${underLine})`,
                          }}
                        />
                      </h3>
                    </div>

                    {/* Scrollable dishes */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin-custom px-8 py-4">
                      <ul className="space-y-4">
                        {menu.dishes.map((dish, idx) => (
                          <li
                            key={idx}
                            className="flex flex-col gap-1 pb-3 border-b border-[#E6DED4]/60 last:border-none"
                          >
                            <div className="flex justify-between items-start">
                              <span
                                style={{ fontFamily: "Cinzel" }}
                                className="text-[#264a35] text-sm md:text-base font-medium"
                              >
                                {dish.dishName}
                              </span>
                              <span
                                style={{ fontFamily: "Cinzel" }}
                                className="text-black font-semibold text-sm whitespace-nowrap"
                              >
                                {dish.fullPrice} / {dish.halfPrice}
                              </span>
                            </div>

                            <p className="text-xs md:text-sm text-[#715129] italic leading-snug max-w-[90%]">
                              {dish.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* Review Section */}
      <div className="relative max-w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            width: "100%",
            backgroundImage: `url(${frame2})`,
            backgroundSize: "cover",
            // backgroundPosition: 'center',
            backgroundRepeat: "no-repeat",
          }}
        />
        <GoogleReviewsCarousel
          reviewCounts={totalReviewCount}
          avgRating={avgRating}
          reviews={reviews}
        />
      </div>
    </>
  );
};

export default Home;
