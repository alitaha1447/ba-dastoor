import { useEffect, useState, useRef, useMemo } from "react";
import { FaPlay } from "react-icons/fa";
import galleryBg from "../assets/images/5317656.jpg";
import { useLocation } from "react-router";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchDesktopBanners,
  fetchMobileBanners,
} from "../api/banner/bannerApi";
import { fetchGalleryImg } from "../api/gallerImage/galleryImgApi";
import { fetchGalleryVideo } from "../api/gallerVideo/galleryVideoApi";

/* ================== LOADER ================== */
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <span className="w-8 h-8 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
  </div>
);

const Gallery = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient();

  const location = useLocation();
  const page = location.pathname === "/gallery" && "gallery";
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("image");

  const [zoomMedia, setZoomMedia] = useState(null); // 🔥 SINGLE MODAL STATE

  const [loaded, setLoaded] = useState(false);

  /* ================= PREFETCH VIDEOS ONLY WHEN IDLE ================= */
  useEffect(() => {
    const prefetch = () =>
      queryClient.prefetchInfiniteQuery({
        queryKey: ["gallery-videos"],
        queryFn: fetchGalleryVideo,
        initialPageParam: 1,
      });

    const id = setTimeout(prefetch, 1500);
    return () => clearTimeout(id);
  }, [queryClient]);

  /* ================= BANNERS ================= */

  const { data: desktopBanner = [] } = useQuery({
    queryKey: ["desktop-banners", page],
    queryFn: () => fetchDesktopBanners(page),
    staleTime: 15 * 60 * 1000,
  });

  const { data: mobileBanner = [] } = useQuery({
    queryKey: ["mobile-banners", page],
    queryFn: () => fetchMobileBanners(page),
    staleTime: 15 * 60 * 1000,
  });

  /* ================= IMAGES ================= */

  const {
    data: imagePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: imageLoading,
  } = useInfiniteQuery({
    queryKey: ["gallery-images"],
    queryFn: fetchGalleryImg,

    enabled: activeTab === "image",

    initialPageParam: 1,

    staleTime: 15 * 60 * 1000,
    gcTime: 45 * 60 * 1000,

    keepPreviousData: true,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const gallerySlots = useMemo(
    () => imagePages?.pages.flatMap((p) => p.data) ?? [],
    [imagePages],
  );

  /* ================= VIDEOS ================= */

  const {
    data: videoPages,
    fetchNextPage: fetchNextVideoPage,
    hasNextPage: hasNextVideoPage,
    isFetchingNextPage: isFetchingNextVideoPage,
    isLoading: videoLoading,
  } = useInfiniteQuery({
    queryKey: ["gallery-videos"],
    queryFn: fetchGalleryVideo,

    enabled: activeTab === "video",

    initialPageParam: 1,

    staleTime: 15 * 60 * 1000,
    gcTime: 45 * 60 * 1000,

    keepPreviousData: true,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const galleryVideoSlots = useMemo(
    () => videoPages?.pages.flatMap((p) => p.data) ?? [],
    [videoPages],
  );

  const handleViewMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const selectedDesktopBanners = desktopBanner.filter(
    (item) => item.isSelected === true,
  );
  const imageBanners = selectedDesktopBanners.filter(
    (item) => item.desktop?.mediaType === "image",
  );

  const selectedMobileBanners = mobileBanner.filter(
    (item) => item.isSelected === true,
  );
  const imageMobileBanners = selectedMobileBanners.filter(
    (item) => item.mobile?.mediaType === "image",
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
    const [loaded, setLoaded] = useState(false);
    if (!src?.url) return null;

    const fullUrl = `${BASE_URL}${src.url}`;

    const mediaType = getMediaType(src.url);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const animationClass = {
      left: "animate-slideInLeft",
      right: "animate-slideInRight",
      top: "animate-slideInTop",
    }[animation];

    const handleClick = () => {
      if (mediaType === "image") {
        setZoomMedia({ url: fullUrl, type: "image" });
      }

      if (mediaType === "video") {
        setZoomMedia({ url: fullUrl, type: "video" });
      }
    };

    return (
      <div
        className={`group w-full h-full overflow-hidden border border-[#C9A24D] rounded-lg cursor-pointer flex items-center justify-center bg-[#fafafa]`}
        onClick={handleClick}
      >
        {/* 🔄 SPINNER (stays until FULLY loaded) */}
        {/* ================= SKELETON / LOADER ================= */}
        {!loaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse z-10" />
        )}
        {src.mediaType === "video" ? (
          <div className="">
            <video
              ref={videoRef}
              // src={src.url}
              src={fullUrl}
              preload="metadata"
              muted
              loop
              playsInline
              className={`w-full h-full object-cover ${animationClass}`}
              onLoadedData={() => setLoaded(true)}
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
                        w-10 h-10
                        flex items-center justify-center
                        rounded-full
                        bg-black/50
                        text-white/30
                        shadow-lg
                    "
                >
                  <FaPlay className="ml-1" size={10} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <img
            // src={src.url}
            src={fullUrl}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setLoaded(true)}
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

  return (
    <>
      <div className="relative hidden lg:block h-[40vh] w-full overflow-hidden">
        {imageBanners?.length > 0 && imageBanners[current] && (
          <div className="absolute inset-0">
            <img
              // src={imageBanners[current].desktop.url}
              src={`${BASE_URL}${imageBanners[current].desktop.url}`}
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
              loading="eager"
            />
          </div>
        )}
      </div>

      <div className="relative block lg:hidden h-[180px] w-full overflow-hidden">
        {imageMobileBanners?.length > 0 && imageMobileBanners[current] && (
          <div className="absolute inset-0">
            <img
              // src={imageMobileBanners[current].mobile.url}
              src={`${BASE_URL}${imageMobileBanners[current].mobile.url}`}
              onLoad={() => setLoaded(true)}
              alt="Catering Banner"
              className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
              loading="eager"
            />
          </div>
        )}
      </div>
      <div className="mt-4 mb-2   flex justify-center flex-col text-center">
        <p className="font-serif text-[#C9A24D] text-2xl sm:text-4xl">
          Celebrations, the Ba-Dastoor Way
        </p>
        <p className="font-serif text-[#C9A24D] text-xl sm:text-xl">
          Legacy in Every Frame
        </p>
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
                                        text-center whitespace-nowrap  cursor-pointer
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
                                        text-center whitespace-nowrap  cursor-pointer
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

        <section className="relative px-4 py-6 max-w-6xl mx-auto">
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
                      <div className="grid gap-2 grid-cols-2 auto-rows-[140px] lg:grid-cols-3 lg:auto-rows-[200px]">
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

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewMore}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className="px-8 py-2 border border-[#C9A24D] text-[#bd9133]
             rounded-full hover:bg-[#C9A24D] hover:text-white"
                  >
                    {isFetchingNextPage ? "Loading..." : "View More"}
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
                    onClick={() => hasNextVideoPage && fetchNextVideoPage()}
                    disabled={!hasNextVideoPage || isFetchingNextVideoPage}
                    className="px-8 py-2 border border-[#C9A24D] text-[#bd9133]
             rounded-full hover:bg-[#C9A24D] hover:text-white"
                  >
                    {isFetchingNextVideoPage ? "Loading..." : "View More"}
                  </button>
                </div>
              </>
            ) : (
              <EmptyState text="No videos found" />
            ))}
        </section>

        {/*  */}
        <div className="text-center bg-gradient-to-r from-[#f8f4f0] to-[#f0e6d6] rounded-2xl  p-4 sm:p-6 md:p-8 lg:p-12 z-50   m-3 sm:m-4 md:m-6">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-2xl md:text-3xl font-serif text-[#8B4513] mb-4">
              Events & Celebrations
            </h4>
            <p className="text-gray-600 text-base sm:text-lg  mb-4 sm:mb-0 font-serif">
              From intimate family gatherings to grand celebrations, our
              restaurant provides the perfect setting for memorable moments.
              Every event is hosted with warmth, elegance, and attention to
              details making each occasion truly special.
            </p>
          </div>
        </div>
      </div>
      {/* 🔥 MODAL CALLED HERE */}
      {zoomMedia && (
        <ZoomModal media={zoomMedia} onClose={() => setZoomMedia(null)} />
      )}
    </>
  );
};

export default Gallery;
