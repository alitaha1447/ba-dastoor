import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDesktopBanners,
  fetchMobileBanners,
} from "../api/banner/bannerApi";

const AboutUs = () => {
  const location = useLocation();

  const [current, setCurrent] = useState(0);

  const [aboutUs, setAboutUs] = useState({});
  const [team, setTeam] = useState({});
  const [generalContent, setGeneralContent] = useState({});

  const page = location.pathname === "/about" && "about";

  // =========BANNERs API'S=================

  const { data: desktopBanners = [] } = useQuery({
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

  //   ---------ANIMATION EFFECT------------
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.1, // lower threshold
    rootMargin: "-80px 0px", // 👈 KEY FIX
    triggerOnce: false,
  });
  const { ref: headingSecondaryRef, inView: headingSecondaryInView } =
    useInView({
      threshold: 0.1, // lower threshold
      rootMargin: "-80px 0px", // 👈 KEY FIX
      triggerOnce: false,
    });

  const { ref: leftCardRef, inView: leftCardInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const { ref: rightCardRef, inView: rightCardInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const fetchAboutUs = async () => {
    try {
      const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/aboutUs/get-aboutus`,
      );
      setAboutUs(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/team/get-team`,
      );
      setTeam(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchGeneralContent = async (p) => {
    try {
      const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/generalContent/get-content?page=${p}`,
      );
      console.log("RES --> ", res);
      setGeneralContent(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGeneralContent(page);
  }, []);

  const selectedDesktopBanners = desktopBanners.filter(
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

  // ==========MOBILE================

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

  useEffect(() => {
    const desktopVisible = window.matchMedia("(min-width: 1024px)").matches;
    const banners = desktopVisible ? imageBanners : imageMobileBanners;

    if (banners.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % banners.length);
    }, 3000); // ✅ now 8000 REALLY means 8 seconds

    return () => clearInterval(id);
  }, [imageBanners.length, imageMobileBanners.length]);

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-screen overflow-hidden">
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
                src={item?.desktop?.url}
                loading="lazy"
                alt="Banner"
                className="w-full h-full  object-cover object-center        "
              />
            </div>
          ))}
        {/* 🎥 VIDEO (NO CAROUSEL AT ALL) */}
        {!hasDesktopImages && videoBanner && (
          <video
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            src={videoBanner.desktop.url}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {/* 📱 MOBILE BANNER */}
        {hasMobileImages ? (
          imageMobileBanners.length === 1 ? (
            // ✅ SINGLE IMAGE (NO CAROUSEL)
            <div
              className="block md:hidden absolute inset-0 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: imageMobileBanners[0]?.mobile?.url
                  ? `url(${imageMobileBanners[0].mobile.url})`
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
                  backgroundImage: item?.mobile?.url
                    ? `url(${item.mobile.url})`
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
            src={videoMobileBanner.mobile.url}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </section>

      {/* ================= HERITAGE ================= */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 bg-white overflow-hidden">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`relative z-10 max-w-3xl mx-auto mb-16 text-center  transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]  ${
            headingInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#C9A24D] mb-6">
            {generalContent?.heading}
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relxed text-[#5A5551] mb-14">
            {generalContent?.description}
          </p>
        </div>

        {/* TWO SECTIONS */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* 🌸 PINK SECTION — 60% */}
          <div
            ref={leftCardRef}
            className={` md:w-3/5 bg-white shadow-2xl rounded-2xl p-6 md:p-8 overflow-hidden md:h-[380px]   transition-all duration-700 ease-out  ${
              leftCardInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-14"
            }`}
          >
            <div className="relative flex flex-col md:flex-row md:items-center">
              {/* IMAGE */}
              <div className="relative w-full md:w-[70%] md:ml-auto">
                <img
                  src={aboutUs?.ownerImage?.url}
                  alt="Owner"
                  className="w-full h-[400px] md:h-[540px]  object-cover shadow-xl"
                />
              </div>
              {/* <div className="absolute top-4 right-4">
                                <h3 className="text-white text-2xl md:text-3xl font-[Playfair_Display] drop-shadow-lg">
                                    {aboutUs?.ownerName}
                                </h3>
                            </div> */}
              {/* <div className="absolute top-4 right-4">
                <div
                  className="
        px-4 py-2
        rounded-lg
        bg-black/50
        backdrop-blur-md
        shadow-lg
    "
                >
                  <h3 className="text-white text-2xl md:text-3xl font-[Playfair_Display]">
                    {aboutUs?.ownerName}
                  </h3>
                </div>
              </div> */}

              {/* OVERLAY CARD */}
              <div className="bg-[#000000d1] rounded-lg max-w-xs p-4 shadow-2xl z-20 relative mt-5 md:absolute md:left-0 md:top-[43%] md:-translate-y-3/4  ">
                <div
                  className=" px-4 py-2
        rounded-lg
        bg-black/50
        backdrop-blur-md
        shadow-lg"
                >
                  <h3 className="text-white text-2xl md:text-3xl font-[Playfair_Display]">
                    {aboutUs?.ownerName}
                  </h3>
                </div>
                <h2
                  class="text-xl md:text-xl  mb-3"
                  style={{ color: "#faffce" }}
                >
                  {aboutUs?.heading}
                </h2>
                {/* class="text-gray-600 leading-relaxed text-sm md:text-base"
                style=" color: #d7cfcf; */}
                <p
                  className=" leading-relaxed text-sm md:text-base"
                  style={{ color: "#d7cfcf" }}
                >
                  {aboutUs?.description}
                </p>
              </div>
            </div>
          </div>

          {/* 🔴 RED SECTION — 40% : CHEF SPOTLIGHT */}
          <div
            ref={rightCardRef}
            className={`md:w-2/5 relative overflow-hidden rounded-xl  p-6 md:p-8  shadow-2xl md:h-[380px] transition-all duration-700 ease-out ${
              rightCardInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-14"
            }`}
          >
            {/* Chef Image */}
            <img
              src={team?.teamImage?.url}
              alt="Head Chef"
              className="w-full h-[420px] md:h-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Blurred Content */}
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 p-5 md:p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3 whitespace-nowrap overflow-hidden">
                {/* Name */}
                <h3 className="text-2xl md:text-3xl font-[Playfair_Display] text-white truncate">
                  {team?.teamName}
                </h3>

                {/* Separator */}
                <span className="text-white/70 text-xl shrink-0">|</span>

                {/* Role */}
                <h4 className="text-lg md:text-xl font-[Playfair_Display] text-white/80 truncate">
                  {team?.role}
                </h4>
              </div>
              <p className="text-white text-lg leading-relaxed">
                {team?.description}
              </p>
              {/* <p className="text-white/90 leading-relaxed text-sm md:text-base">
                                {aboutUs?.employeeDescription}
                            </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="relative bg-[#632a057a] min-h-[70vh] py-20 flex flex-col items-center overflow-hidden">
        {/* DARK BLUR OVERLAY */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px]" />

        {/* CONTENT */}
        <div className="w-full max-w-6xl mx-auto relative z-10  flex flex-col items-center">
          {/* HEADING */}
          <div
            ref={headingSecondaryRef}
            className={` mb-14 text-center px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              headingSecondaryInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[#C9A24D] mb-6">
              {generalContent?.secondaryHeading}
            </h1>
            <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[white] ">
              {generalContent?.secondaryDescription}
            </p>
          </div>

          {/* VIDEO BOX */}
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl   h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]      ">
              {generalContent?.media?.mediaType === "video" ? (
                <video
                  className="w-full h-full object-cover"
                  src={generalContent?.media?.url}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : generalContent?.media?.mediaType === "image" ? (
                <img
                  src={generalContent?.media?.url}
                  alt={generalContent?.heading || "Content media"}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
