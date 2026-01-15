import React, { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import galleryBg from "../assets/images/5317656.jpg";
import { useLocation } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDesktopBanners,
  fetchMobileBanners,
} from "../api/banner/bannerApi";

/* ================== LOADER ================== */
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <span className="w-8 h-8 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
  </div>
);

/* ================== EMPTY STATE ================== */
const EmptyState = ({ text }) => (
  <div className="flex justify-center items-center py-20">
    <p className="text-gray-500 text-lg">{text}</p>
  </div>
);

const Gallery = () => {
  const location = useLocation();
  const page = location.pathname === "/gallery" && "gallery";
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("image");

  // images
  const [gallerySlots, setGallerySlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // videos
  const [galleryVideoSlots, setGalleryVideoSlots] = useState([]);
  const [videoCurrentPage, setVideoCurrentPage] = useState(1);
  const [videoTotalPages, setVideoTotalPages] = useState(1);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoPageLoading, setVideoPageLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomMedia, setZoomMedia] = useState(null); // 🔥 SINGLE MODAL STATE

  const imageFetchedRef = useRef(false);
  const videoFetchedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const { data: desktopBanner = [] } = useQuery({
    queryKey: ["desktop-banners", page],
    queryFn: () => fetchDesktopBanners(page),
  });

  const { data: mobileBanner = [] } = useQuery({
    queryKey: ["mobile-banners", page],
    queryFn: () => fetchMobileBanners(page),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const selectedDesktopBanners = desktopBanner.filter(
    (item) => item.isSelected === true
  );
  const imageBanners = selectedDesktopBanners.filter(
    (item) => item.desktop?.mediaType === "image"
  );

  const selectedMobileBanners = mobileBanner.filter(
    (item) => item.isSelected === true
  );
  const imageMobileBanners = selectedMobileBanners.filter(
    (item) => item.mobile?.mediaType === "image"
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

  const getMediaType = (url = "") => {
    const videoExt = ["mp4", "webm", "ogg", "mov"];
    const ext = url.split(".").pop()?.toLowerCase();
    return videoExt.includes(ext) ? "video" : "image";
  };

  /* ------------------ IMAGE / VIDEO BOX ------------------ */
  const ImageBox = ({ src, animation = "left" }) => {
    console.log("src", src);
    const [loaded, setLoaded] = useState(false);
    if (!src?.url) return null;

    const mediaType = getMediaType(src.url);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
      if (!videoRef.current) return;
      videoRef.current.play();
      setIsPlaying(true);
    };

    const handleMouseLeave = () => {
      if (!videoRef.current) return;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    };

    const animationClass = {
      left: "animate-slideInLeft",
      right: "animate-slideInRight",
      top: "animate-slideInTop",
    }[animation];

    // const isImage = src.mediaType !== "video";
    const handleClick = () => {
      if (mediaType !== "image") return; // 🔥 image only zoom
      setZoomMedia({ url: src.url, type: "image" });
    };

    return (
      <div
        className={`group w-full h-full overflow-hidden border border-[#C9A24D] rounded-lg cursor-pointer flex items-center justify-center bg-[#fafafa]`}
        onClick={handleClick}
      >
        {/* 🔄 SPINNER (stays until FULLY loaded) */}
        {/* ================= SKELETON / LOADER ================= */}
        {/* {!loaded && (
                    <div className="absolute inset-0 z-10 bg-gray-100 animate-pulse" />
                )} */}
        {src.mediaType === "video" ? (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <video
              ref={videoRef}
              src={src.url}
              muted
              loop
              // autoPlay
              playsInline
              // onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover ${animationClass}`}
            />
            {/* ▶ PLAY BUTTON (VISIBLE ONLY WHEN PAUSED) */}
            {!isPlaying && (
              <div
                className="
                    absolute inset-0 z-10
                    flex items-center justify-center
                    bg-black/30
                    transition-opacity duration-300
                "
              >
                <div
                  className="
                        w-16 h-16
                        flex items-center justify-center
                        rounded-full
                        bg-black/50
                        text-[#C9A24D]
                        shadow-lg
                    "
                >
                  <FaPlay className="ml-1" size={20} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <img
            src={src.url}
            loading="lazy"
            decoding="async"
            // onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity       duration-500      ${animationClass} `}
            alt=""
          />
        )}
      </div>
    );
  };

  /* ------------------ ZOOM MODAL ------------------ */
  const ZoomModal = ({ media, onClose }) => {
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };

      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [onClose]);

    if (!media) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          {/* 🔥 MEDIA WRAPPER */}
          <div className="relative inline-block">
            {/* ❌ CLOSE BUTTON INSIDE MEDIA */}
            <button
              onClick={onClose}
              className="
                            absolute
                            top-2
                            right-2
                            z-20
                            w-9
                            h-9
                            rounded-full
                            bg-black/70
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-black
                            transition
                        "
            >
              ✕
            </button>

            {media.type === "image" ? (
              <img
                src={media.url}
                alt="Zoomed"
                className="
                                block
                                max-w-full
                                max-h-[60vh]
                                w-auto
                                h-auto
                                object-contain
                                rounded-lg
                                animate-zoomIn
                            "
              />
            ) : (
              <video
                src={media.url}
                controls
                autoPlay
                className="
                                block
                                max-w-full
                                max-h-[60vh]
                                w-auto
                                h-auto
                                object-contain
                                rounded-lg
                                bg-black
                            "
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ------------------ EMPTY STATE ------------------ */
  const EmptyState = ({ text }) => (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-500 text-lg">{text}</p>
    </div>
  );

  /* ------------------ FETCH IMAGE GALLERY ------------------ */
  const fetchGalleryImg = async (page = 1, isLoadMore = false) => {
    try {
      isLoadMore ? setPageLoading(true) : setImageLoading(true);
      const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/newGalleryImg/new-get-galleryImg?page=${page}`
      );
      const newData = res?.data?.data || [];
      // console.log(newData)
      // ✅ APPEND instead of replace
      setGallerySlots((prev) => [...prev, ...newData]);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      isLoadMore ? setPageLoading(false) : setImageLoading(false);
    }
  };

  /* ------------------ FETCH VIDEO GALLERY ------------------ */
  const fetchGalleryVideo = async (page = 1, isLoadMore = false) => {
    try {
      isLoadMore ? setVideoPageLoading(true) : setVideoLoading(true);
      const res = await axios.get(
        // `http://localhost:3000/api/newGalleryVideo/new-get-galleryVideoByPage?page=${page}`
        `https://ba-dastoor-backend.onrender.com/api/newGalleryVideo/new-get-galleryVideoByPage?page=${page}`
      );
      console.log("gallery video --> ", res?.data);
      const newData = res?.data?.data || [];
      setGalleryVideoSlots((prev) => [...prev, ...newData]);
      setVideoTotalPages(res?.data?.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      isLoadMore ? setVideoPageLoading(false) : setVideoLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "image" && !imageFetchedRef.current) {
      imageFetchedRef.current = true;
      fetchGalleryImg(1);
    }

    if (activeTab === "video" && !videoFetchedRef.current) {
      videoFetchedRef.current = true;
      fetchGalleryVideo(1);
    }
  }, [activeTab]);

  const handleViewMore = () => {
    if (currentPage < 10 && !imageLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchGalleryImg(nextPage, true);
    }
  };
  const handleViewMoreVideo = () => {
    if (videoCurrentPage < 10 && !videoLoading) {
      const nextPage = videoCurrentPage + 1;
      setVideoCurrentPage(nextPage);
      fetchGalleryVideo(nextPage, true);
    }
  };
  /* ================== TAB BASED FETCH ================== */
  useEffect(() => {
    if (activeTab === "image" && !imageFetchedRef.current) {
      imageFetchedRef.current = true;
      fetchGalleryImg(1);
    }

    if (activeTab === "video" && !videoFetchedRef.current) {
      videoFetchedRef.current = true;
      fetchGalleryVideo(1);
    }
  }, [activeTab]);

  /* ------------------ AUTO SLIDER ------------------ */
  // CARAOUSEL

  useEffect(() => {
    const desktopVisible = window.matchMedia("(min-width: 1024px)").matches;
    const banners = desktopVisible ? imageBanners : imageMobileBanners;

    if (banners.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % banners.length);
    }, 3000); // ✅ now 8000 REALLY means 8 seconds

    return () => clearInterval(id);
  }, [imageBanners.length, imageMobileBanners.length]);

  /* ------------------ IMAGE DATA ------------------ */

  /* ------------------ VIDEO DATA ------------------ */
  // const activeVideoGallery = galleryVideoSlots[activeIndex];
  // const videoItems = activeVideoGallery
  //     ? [
  //         activeVideoGallery.primaryVideo,
  //         ...activeVideoGallery.siblings
  //     ].map(v => ({ ...v, mediaType: "video" }))
  //     : [];

  // -----------------
  const GoldFrame = ({ children, className = "" }) => {
    return (
      <div
        className={`relative p-2 rounded-lg border border-[#C9A24D]/40 bg-white ${className}`}
      >
        {/* Corner accents */}
        {["tl", "tr", "bl", "br"].map((pos, i) => (
          <span
            key={i}
            className={`absolute w-6 h-6 border-[#C9A24D]
                        ${
                          pos === "tl" &&
                          "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg"
                        }
                        ${
                          pos === "tr" &&
                          "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg"
                        }
                        ${
                          pos === "bl" &&
                          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg"
                        }
                        ${
                          pos === "br" &&
                          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg"
                        }
                    `}
          />
        ))}

        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    );
  };
  // -----------------

  // useEffect(() => {
  //     if (!pageLoading && currentPage > 1) {
  //         window.scrollBy({ top: 200, behavior: "smooth" });
  //     }
  // }, [pageLoading]);

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

            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-2xl font-semibold">Catering</h1>
            </div>
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
      <div className="relative max-w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${galleryBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px]" /> */}
        <div className="mt-4 flex justify-center">
          <div className="w-full sm:w-auto flex justify-center">
            <div
              className="relative inline-flex w-full max-w-xs sm:w-md rounded-full bg-[#fafafa] p-1
                    border border-[#C9A24D]
                    overflow-hidden"
            >
              {/* Sliding Capsule (STAYS INSIDE BORDER) */}
              <span
                className={`absolute top-1 bottom-1
                                    w-1/2
                                    rounded-full
                                    bg-white
                                    shadow-sm
                                    transform
                                    transition-transform
                                    duration-300
                                    ease-in-out
                                    ${
                                      activeTab === "video"
                                        ? "translate-x-full"
                                        : "translate-x-0"
                                    }`}
              />

              {/* IMAGE TAB */}
              <button
                type="button"
                onClick={() => setActiveTab("image")}
                className={`relative z-10 flex-1 px-4 py-1.5
                                        text-sm rounded-full
                                        transition-colors duration-200
                                        text-center whitespace-nowrap
                                        ${
                                          activeTab === "image"
                                            ? "text-[#C9A24D] font-semibold ring-1 ring-[#C9A24D]"
                                            : "text-gray-400 hover:text-gray-500"
                                        }`}
              >
                Image
              </button>

              {/* VIDEO TAB */}
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className={`relative z-10 flex-1 px-4 py-1.5
                                        text-sm rounded-full
                                        transition-colors duration-200
                                        text-center whitespace-nowrap
                                        ${
                                          activeTab === "video"
                                            ? "text-[#C9A24D] font-semibold ring-1 ring-[#C9A24D]"
                                            : "text-gray-400 hover:text-gray-500"
                                        }`}
              >
                Video
              </button>
            </div>
          </div>
        </div>

        <section className="relative px-4 py-12 max-w-6xl mx-auto">
          {/* ================= IMAGE TAB ================= */}
          {activeTab === "image" &&
            (imageLoading ? (
              <Loader />
            ) : gallerySlots.length > 0 ? (
              <>
                {gallerySlots.map((gallery) => {
                  const imageItems = [
                    gallery.primaryImage,
                    ...gallery.siblings,
                  ];

                  return (
                    <div key={gallery._id} className="mb-10">
                      <div
                        className="                                                        grid gap-2                                                        grid-cols-2
                                                        auto-rows-[140px]
                                                        lg:grid-cols-3
                                                        lg:auto-rows-[200px]
                                                        "
                      >
                        <GoldFrame className="col-span-2 lg:col-span-2 lg:row-span-2">
                          <ImageBox src={imageItems[0]} animation="left" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={imageItems[1]} animation="right" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={imageItems[2]} animation="top" />
                        </GoldFrame>

                        <GoldFrame className="col-span-2 lg:col-span-1 lg:row-span-1">
                          <ImageBox src={imageItems[3]} animation="left" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={imageItems[4]} animation="top" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={imageItems[5]} animation="right" />
                        </GoldFrame>
                      </div>
                    </div>
                  );
                })}

                {/* VIEW MORE (IMAGE ONLY) */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewMore}
                    disabled={pageLoading || currentPage >= totalPages}
                    className="px-8 py-2 border border-[#C9A24D] text-[#bd9133] text-sm font-medium
      rounded-full transition hover:bg-[#C9A24D] hover:text-white
      flex items-center gap-2 cursor-pointer"
                  >
                    {pageLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "View More"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <EmptyState text="No images found" />
            ))}

          {/* ================= VIDEO TAB ================= */}
          {activeTab === "video" &&
            (videoLoading ? (
              <Loader />
            ) : galleryVideoSlots.length > 0 ? (
              <>
                {galleryVideoSlots.map((gallery) => {
                  console.log("--->", gallery.primaryVideo.url);
                  const videoItems = [
                    gallery.primaryVideo,
                    ...(Array.isArray(gallery.siblings)
                      ? gallery.siblings
                      : []),
                  ].map((v) => ({ ...v, mediaType: "video" }));

                  return (
                    <div key={gallery._id} className="mb-10">
                      <div
                        className="     grid gap-2                            grid-cols-2                            auto-rows-[140px]
                            lg:grid-cols-3
                            lg:auto-rows-[200px]
                            "
                      >
                        <GoldFrame className="col-span-2 lg:col-span-2 lg:row-span-2">
                          <ImageBox src={videoItems[0]} animation="left" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={videoItems[1]} animation="right" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={videoItems[2]} animation="top" />
                        </GoldFrame>

                        <GoldFrame className="col-span-2 lg:col-span-1 lg:row-span-1">
                          <ImageBox src={videoItems[3]} animation="left" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={videoItems[4]} animation="top" />
                        </GoldFrame>

                        <GoldFrame>
                          <ImageBox src={videoItems[5]} animation="right" />
                        </GoldFrame>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewMoreVideo}
                    disabled={
                      videoPageLoading || videoCurrentPage >= videoTotalPages
                    }
                    className="px-8 py-2 border border-[#C9A24D] text-[#bd9133] text-sm font-medium
      rounded-full transition hover:bg-[#C9A24D] hover:text-white
      flex items-center gap-2 cursor-pointer"
                  >
                    {videoPageLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "View More"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <EmptyState text="No videos found" />
            ))}

          {/* {activeTab === "video" && (
                        videoItems.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3 gap-4">
                                    <GoldFrame className="col-span-2 h-50">
                                        <ImageBox src={videoItems[0]} animation="left" />
                                    </GoldFrame>

                                    <GoldFrame className="col-span-1 h-50">
                                        <ImageBox src={videoItems[1]} animation="right" />
                                    </GoldFrame>
                                </div>

                                <div className="grid grid-cols-3 gap-4 auto-rows-[110px]">
                                    <GoldFrame className="row-span-2">
                                        <ImageBox src={videoItems[2]} animation="top" />
                                    </GoldFrame>

                                    <GoldFrame className="row-span-2">
                                        <ImageBox src={videoItems[3]} animation="left" />
                                    </GoldFrame>

                                    <GoldFrame className="row-span-2 grid grid-rows-2 gap-4">
                                        <ImageBox src={videoItems[4]} animation="right" />
                                        <ImageBox src={videoItems[5]} animation="top" />
                                    </GoldFrame>
                                </div>
                            </>
                        ) : (
                            <EmptyState text="No videos found" />
                        )
                    )} */}
        </section>

        {/*  */}
        <div className="text-center bg-gradient-to-r from-[#f8f4f0] to-[#f0e6d6] rounded-2xl p-12 z-50 m-6">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-2xl md:text-3xl font-serif text-[#8B4513] mb-4">
              Events & Celebrations
            </h4>
            <p className="text-gray-600 text-lg mb-8 font-serif">
              From intimate family gatherings to grand celebrations, our
              restaurant provides the perfect setting for memorable moments.
              Every event is hosted with warmth, elegance, and attention to
              details making each occasion truly special.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                // onClick={() => setShowForm(true)}
                                className="bg-[#8B4513] text-white py-3 px-8 rounded-lg hover:bg-[#A0522D] transition-colors duration-300 text-lg "
                            >
                                Submit General Application
                            </button>
                            <button className="bg-transparent border-2 border-[#8B4513] text-[#8B4513] font-semibold py-3 px-8 rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors duration-300 text-lg">
                                Meet Our Team
                            </button>
                        </div> */}
          </div>
        </div>
      </div>
      {/* 🔥 MODAL CALLED HERE */}
      {zoomMedia && (
        <ZoomModal media={zoomMedia} onClose={() => setZoomMedia(null)} />
      )}

      {/* Pagination */}
      {/* {totalPages >= 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-sm rounded-lg border
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-gray-100"
                        >
                            Prev
                        </button>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-sm rounded-lg border
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )} */}
    </>
  );
};

export default Gallery;
