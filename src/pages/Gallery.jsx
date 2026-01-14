import React, { useEffect, useState, useRef } from 'react';
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import careerpageBG from "../assets/images/careerpageBG.jpg";
import galleryBg from '../assets/images/5317656.jpg'
// import galleryBg from '../assets/images/5317656.jpg'
import frame3 from '../assets/images/frame3.jpeg'
import frame4 from '../assets/images/frame4.jpeg'
import { useLocation } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchDesktopBanners, fetchMobileBanners } from '../api/banner/bannerApi';


const Gallery = () => {
    // const [galleryImg, setGalleryImg] = useState([]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    // const [desktopBanner, setDesktopBanners] = useState([]);
    // const [mobileBanner, setMobileBanner] = useState([])

    const location = useLocation();
    const page = location.pathname === "/gallery" && "gallery"


    const [activeTab, setActiveTab] = useState("image")

    // const pagesCacheRef = React.useRef({});

    // images
    const [gallerySlots, setGallerySlots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    // videos
    const [galleryVideoSlots, setGalleryVideoSlots] = useState([]);
    // const [newGalleryVideoSlots, setNewGallerySlots] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomMedia, setZoomMedia] = useState(null); // 🔥 SINGLE MODAL STATE

    const hasFetchedRef = useRef(false);


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

    // useEffect(() => { fetchSelectedDesktopBanners() }, [page]);

    // const fetchMobileBanners = async () => {
    //     const res = await axios.get(`https://ba-dastoor-backend.onrender.com/api/banners/mobile/get-mobileBanner?page=${page}`);
    //     setMobileBanner(res?.data?.data)
    // }

    // useEffect(() => { fetchMobileBanners() }, [page]);

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

    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const desktopVisible = window.matchMedia("(min-width: 1024px)").matches;
        const banners = desktopVisible ? imageBanners : imageMobileBanners;

        if (banners.length <= 1) return;

        const id = setInterval(() => {
            setCurrent(i => (i + 1) % banners.length);
        }, 3000); // ✅ now 8000 REALLY means 8 seconds

        return () => clearInterval(id);
    }, [imageBanners.length, imageMobileBanners.length]);



    /* ------------------ IMAGE / VIDEO BOX ------------------ */
    const ImageBox = ({ src, animation = "left" }) => {
        const [loaded, setLoaded] = useState(false);
        if (!src?.url) return null;

        const animationClass = {
            left: "animate-slideInLeft",
            right: "animate-slideInRight",
            top: "animate-slideInTop",
        }[animation];

        // const isImage = src.mediaType !== "video";


        return (
            <div className={`group w-full h-full overflow-hidden border border-[#C9A24D] rounded-lg cursor-pointer flex items-center justify-center bg-[#fafafa]`}
                onClick={() =>
                    setZoomMedia({
                        url: src.url,
                        type: src.mediaType,
                    })
                }
            >
                {/* 🔄 SPINNER (stays until FULLY loaded) */}
                {/* {!loaded && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                        <span className="w-6 h-6 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
                    </div>
                )} */}
                {src.mediaType === "video" ? (
                    <video
                        src={src.url}
                        muted
                        loop
                        autoPlay
                        playsInline
                        // onLoad={() => setLoaded(true)}
                        className={`w-full h-full object-cover ${animationClass}`}
                    />
                ) : (
                    <img
                        src={src.url}
                        loading="lazy"
                        decoding="async"
                        // onLoad={() => setLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-300 
                            `}
                    />
                    // ${loaded ? "opacity-100" : "opacity-0"}
                )}
            </div >
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
                <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                >
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
    const fetchGalleryImg = async (page = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:3000/api/newGalleryImg/new-get-galleryImg?page=${page}`
            );
            const newData = res?.data?.data || [];
            // console.log(newData)
            // ✅ APPEND instead of replace
            setGallerySlots((prev) => [...prev, ...newData]);
            setTotalPages(res?.data?.totalPages || 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    };

    console.log(gallerySlots)

    /* ------------------ FETCH VIDEO GALLERY ------------------ */
    const fetchGalleryVideo = async () => {
        try {
            const res = await axios.get(
                "https://ba-dastoor-backend.onrender.com/api/newGalleryVideo/new-get-galleryVideo"
            );
            setGalleryVideoSlots(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        fetchGalleryImg(1);
    }, []);
    useEffect(() => {
        // fetchGalleryImg(1);
        fetchGalleryVideo();
    }, []);

    const handleViewMore = () => {
        if (currentPage < 10 && !loading) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchGalleryImg(nextPage);
        }
    }

    // useEffect(() => {
    //     if (activeTab === "image" && gallerySlots.length === 0) {
    //         fetchGalleryImg();
    //     }

    //     if (activeTab === "video" && galleryVideoSlots.length === 0) {
    //         fetchGalleryVideo();
    //     }

    //     setActiveIndex(0);
    // }, [activeTab]);


    /* ------------------ AUTO SLIDER ------------------ */
    // useEffect(() => {
    //     const source =
    //         activeTab === "image" ? gallerySlots : galleryVideoSlots;

    //     if (source.length <= 1) return;

    //     const interval = setInterval(() => {
    //         setActiveIndex(prev =>
    //             prev === source.length - 1 ? 0 : prev + 1
    //         );
    //     }, 6000);

    //     return () => clearInterval(interval);
    // }, [gallerySlots, galleryVideoSlots, activeTab]);


    /* ------------------ IMAGE DATA ------------------ */
    // const activeImageGallery = gallerySlots[activeIndex];
    // const imageItems = activeImageGallery
    //     ? [
    //         activeImageGallery.primaryImage,
    //         ...activeImageGallery.siblings
    //     ].map(img => ({ ...img, mediaType: "image" }))
    //     : [];

    /* ------------------ VIDEO DATA ------------------ */
    const activeVideoGallery = galleryVideoSlots[activeIndex];
    const videoItems = activeVideoGallery
        ? [
            activeVideoGallery.primaryVideo,
            ...activeVideoGallery.siblings
        ].map(v => ({ ...v, mediaType: "video" }))
        : [];


    // const CornerCurve = ({ className }) => (
    //     <svg
    //         viewBox="0 0 40 40"
    //         fill="none"
    //         className={className}
    //         xmlns="http://www.w3.org/2000/svg"
    //     >
    //         <path
    //             d="M40 0 H20 C8 0 0 8 0 20 V40"
    //             stroke="#C9A24D"
    //             strokeWidth="2"
    //         />
    //     </svg>
    // );

    // -----------------
    const GoldFrame = ({ children, className = "" }) => {
        return (
            <div
                className={`relative p-2 rounded-lg border border-[#C9A24D]/40 bg-white ${className}`}
            >
                {/* Corner accents */}
                {['tl', 'tr', 'bl', 'br'].map((pos, i) => (
                    <span
                        key={i}
                        className={`absolute w-6 h-6 border-[#C9A24D]
                        ${pos === 'tl' && 'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg'}
                        ${pos === 'tr' && 'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg'}
                        ${pos === 'bl' && 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg'}
                        ${pos === 'br' && 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg'}
                    `}
                    />
                ))}

                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </div>
        );
    };
    // -----------------



    return (
        <>
            {/* 🔹 PAGE HEADER */}
            {/* <div className="relative h-[35vh] sm:h-[38vh] md:h-[40vh] w-full">
                <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${careerpageBG})` }}
                >
                    <div className="flex items-center justify-center h-full">
                        <div className='flex flex-col'>

                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold">
                                Gallery
                            </h1>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='relative hidden lg:block h-[40vh] w-full overflow-hidden'>
                {imageBanners &&
                    imageBanners.map((item, index) => (
                        <div
                            key={`desktop-${index}`}
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full"
                            style={{
                                backgroundImage: `url(${item?.desktop?.url})`,
                                backgroundPosition: "center 30%",
                            }}
                        >

                            <div className="relative z-10 flex items-center justify-center h-full">
                                <h1 className="text-white text-5xl font-semibold">
                                    Gallery
                                </h1>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="relative block lg:hidden h-[180px] w-full overflow-hidden">
                {imageMobileBanners &&
                    imageMobileBanners.map((item, index) => (
                        <div
                            key={`mobile-${index}`}
                            className={`absolute inset-0 transition-opacity duration-700
            ${index === current ? "opacity-100" : "opacity-0"}`}
                            style={{
                                backgroundImage: `url(${item?.mobile?.url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/25" />

                            <div className="relative z-10 h-full flex flex-col justify-end items-center p-4">
                                <h1 className="text-white text-2xl font-semibold">
                                    Gallery
                                </h1>

                            </div>

                        </div>
                    ))}
            </div>
            <div className="relative max-w-full overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url(${galleryBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px]" /> */}
                <div className="mt-4 flex justify-center">
                    <div className="w-full sm:w-auto flex justify-center">
                        <div
                            className="relative inline-flex w-full max-w-xs sm:w-md
            rounded-full
            bg-[#fafafa]
            p-1
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
                ${activeTab === 'video'
                                        ? 'translate-x-full'
                                        : 'translate-x-0'
                                    }`}
                            />

                            {/* IMAGE TAB */}
                            <button
                                type="button"
                                onClick={() => setActiveTab('image')}
                                className={`relative z-10 flex-1 px-4 py-1.5
                text-sm rounded-full
                transition-colors duration-200
                text-center whitespace-nowrap
                ${activeTab === 'image'
                                        ? 'text-[#C9A24D] font-semibold ring-1 ring-[#C9A24D]'
                                        : 'text-gray-400 hover:text-gray-500'
                                    }`}
                            >
                                Image
                            </button>

                            {/* VIDEO TAB */}
                            <button
                                type="button"
                                onClick={() => setActiveTab('video')}
                                className={`relative z-10 flex-1 px-4 py-1.5
                text-sm rounded-full
                transition-colors duration-200
                text-center whitespace-nowrap
                ${activeTab === 'video'
                                        ? 'text-[#C9A24D] font-semibold ring-1 ring-[#C9A24D]'
                                        : 'text-gray-400 hover:text-gray-500'
                                    }`}
                            >
                                Video
                            </button>
                        </div>
                    </div>
                </div>



                {/* 🔹 GALLERY SECTION */}
                {/* <section key={currentPage} className=" px-4 py-12 space-y-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-50">
                        <ImageBox src={filteredGallery[0]} animation="left" />
                    </div>
                    <div className="col-span-1 h-50">
                        <ImageBox src={filteredGallery[1]} animation="right" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 auto-rows-[110px]">

                    <div className="row-span-2">
                        <ImageBox src={filteredGallery[2]} animation="top" />
                    </div>

                    <div className="row-span-2">
                        <ImageBox src={filteredGallery[3]} animation="left" />
                    </div>

                    <div className="row-span-2 grid grid-rows-2 gap-4">
                        <ImageBox src={filteredGallery[4]} animation="right" />
                        <ImageBox src={filteredGallery[5]} animation="top" />
                    </div>
                </div>

            </section> */}
                <section className="relative px-4 py-12 max-w-6xl mx-auto space-y-4">
                    {/* 🔲 Overlay for blur + opacity */}


                    {/* 🔹 Content */}
                    {/* {
                        gallerySlots.map((ImGlass.index))
                    } */}
                    {activeTab === "image" ? (
                        gallerySlots.length > 0 ? (
                            <>
                                {gallerySlots.map((gallery, galleryIndex) => {
                                    const imageItems = [
                                        gallery.primaryImage,
                                        ...gallery.siblings,
                                    ];

                                    return (
                                        <div key={gallery._id} className="mb-10">
                                            <div
                                                className="
                grid gap-2

                grid-cols-2
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
                            </>
                        ) : (
                            <EmptyState text="No images found" />
                        )
                    ) : videoItems.length > 0 ? (
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
                    )}


                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleViewMore}
                            disabled={loading || currentPage >= totalPages}
                            className="px-8 py-2 border border-[#C9A24D] text-[#bd9133] text-sm font-medium
                                    rounded-full
                                    transition
                                    hover:bg-[#C9A24D]
                                    hover:text-white
                                    cursor-pointer
                                        "
                        >
                            View More
                        </button>
                    </div>

                </section>
                {/*  */}
                <div className="text-center bg-gradient-to-r from-[#f8f4f0] to-[#f0e6d6] rounded-2xl p-12 z-50 m-6">
                    <div className="max-w-3xl mx-auto">
                        <h4 className="text-2xl md:text-3xl font-serif text-[#8B4513] mb-4">
                            Events & Celebrations
                        </h4>
                        <p className="text-gray-600 text-lg mb-8 font-serif">
                            From intimate family gatherings to grand celebrations, our restaurant provides the perfect setting for memorable moments. Every event is hosted with warmth, elegance, and attention to details making each occasion truly special.
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
                <ZoomModal
                    media={zoomMedia}
                    onClose={() => setZoomMedia(null)}
                />
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
