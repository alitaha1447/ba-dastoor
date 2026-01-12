import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router';
import Logo2 from "../assets/icons/logo-2.svg?react"
import bannerImg2 from "../assets/images/bannerImage2.jpg"
import bannerImg3 from "../assets/images/bannerImage3.jpg"
import charMinar from "../assets/images/charMinar.jpg"
import galleryBg from '../assets/images/5317656.jpg'
import bg1 from "../assets/images/WhatsApp Image1 2026-01-10 at 16.03.43.jpeg"
import underLine from "../assets/images/underLine.png"
import menuBG from "../assets/images/menuBG.jpeg"
import frame2 from "../assets/images/frame2.jpeg"


import GoogleReviewsCarousel from '../components/googleReview/GoogleReviewWidget';
import axios from 'axios';


const Home = () => {
    const [totalReviewCount, setTotalReviewCount] = useState(null)
    const [avgRating, setAvgRating] = useState(null)
    const [reviews, setReviews] = useState([]);

    const [desktopBanner, setDesktopBanners] = useState([])
    const [mobileBanner, setMobileBanner] = useState([])
    const [content, setContent] = useState({})

    const [menuLists, setMenuLists] = useState([])

    const location = useLocation();
    const menuRef = useRef(null);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);


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
                        block: "start"
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


    const page = location.pathname === "/" ? "home" : location.pathname.replace("/", "");


    // const fetchSelectedDesktopBanners = async () => {
    //     const res = await axios.get(`http://localhost:3000/api/banners/get-selected-desktopBanner?page=${page}`);
    //     setDesktopBanners(res?.data?.data);
    // }

    //     const fetchMobileBanners = async () => {
    //         const res = await axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=${page}`);
    //         setMobileBanner(res?.data?.data)
    //     }

    // useEffect(() => {
    //     fetchSelectedDesktopBanners()
    // }, [page]);

    // useEffect(() => {
    //     fetchMobileBanners()
    // }, [page]);

    // OPTIMIZE CODE
    // useEffect(() => {
    //     if (isMobileView) {
    //         fetchMobileBanners();
    //     } else {
    //         fetchSelectedDesktopBanners();
    //     }
    // }, [page, isMobileView]);

    // ----------------- //

    //  WITHOUT OPTIMIZE CODE

    // const fetchContent = async () => {
    //     const res = await axios.get(`http://localhost:3000/api/generalContent/get-content?page=${page}`);
    //     setContent(res?.data?.data)
    // }

    // const fetchMenuLists = async () => {
    //     const res = await axios.get(`http://localhost:3000/api/categories/get-categorywithdishes`);
    //     setMenuLists(res?.data?.data || [])
    // }

    // useEffect(() => { fetchContent() }, [page])
    // useEffect(() => { fetchMenuLists() }, []);

    //  // OPTIMIZE CODE

    // OPTIMIZE CODE FOR BANNER IMAGES
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const [desktopRes, mobileRes] = await Promise.all([
                    axios.get(`http://localhost:3000/api/banners/get-selected-desktopBanner?page=${page}`),
                    axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=${page}`)
                ]);

                setDesktopBanners(desktopRes?.data?.data || []);
                setMobileBanner(mobileRes?.data?.data || []);
            } catch (err) {
                console.error("Banner fetch error", err);
            }
        };

        fetchBanners();
    }, [page]);

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:3000/api/generalContent/get-content?page=${page}`),
            axios.get(`http://localhost:3000/api/categories/get-categorywithdishes`)
        ]).then(([contentRes, menuRes]) => {
            setContent(contentRes.data.data);
            setMenuLists(menuRes.data.data || []);
        });
    }, [page]);

    // ----------------- //

    useEffect(() => {
        const fetchReview = async () => {
            const res = await axios("https://featurable.com/api/v1/widgets/11b960ce-b735-4b9a-9cb1-808b4a28c17c");
            setAvgRating(res?.data?.averageRating)
            setTotalReviewCount(res?.data?.totalReviewCount)
            setReviews(res?.data?.reviews)

        }
        fetchReview()
    }, []);

    const selectedDesktopBanners = desktopBanner.filter(
        (item) => item.isSelected === true
    );


    const imageBanners = selectedDesktopBanners.filter(
        (item) => item.desktop?.mediaType === "image"
    );
    const hasDesktopImages = Array.isArray(imageBanners) && imageBanners.length > 0;

    const videoBanner = selectedDesktopBanners.find(
        (item) => item.desktop?.mediaType === "video"
    );
    // Mobile
    const selectedMobileBanners = mobileBanner.filter(
        (item) => item.isSelected === true
    );
    const imageMobileBanners = selectedMobileBanners.filter(
        (item) => item.mobile?.mediaType === "image"
    );
    const hasMobileImages = Array.isArray(imageMobileBanners) && imageMobileBanners.length > 0;

    const videoMobileBanner = selectedMobileBanners.find(
        (item) => item.mobile?.mediaType === "video"
    );

    const [current, setCurrent] = useState(0);
    // const activeBanners = isMobileView ? imageMobileBanners : imageBanners;

    // OPTIMIZE CODE
    const activeBanners = React.useMemo(() => {
        return isMobileView ? imageMobileBanners : imageBanners;
    }, [isMobileView, imageMobileBanners, imageBanners]);
    const activeBannersLength = activeBanners ? activeBanners.length : 0;
    // Auto slide
    // useEffect(() => {
    //     if (activeBannersLength <= 1) return;

    //     const interval = setInterval(() => {
    //         setCurrent(prev =>
    //             prev === activeBannersLength - 1 ? 0 : prev + 1
    //         );
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, [activeBannersLength, isMobileView]);
    // OPTIMIZE CODE
    useEffect(() => {
        if (activeBannersLength <= 1) return;

        const interval = setInterval(() => {
            setCurrent(c => (c + 1) % activeBannersLength);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeBannersLength]);
    useEffect(() => {
        setCurrent(0);
    }, [isMobileView])

    // useEffect(() => {
    //     if (!imageBanners.length) return;

    //     const interval = setInterval(() => {
    //         setCurrent(prev =>
    //             prev === imageBanners.length - 1 ? 0 : prev + 1
    //         );
    //     }, 3000); // Changed to 3 seconds for better UX


    //     return () => clearInterval(interval);
    // }, [imageBanners.length,]);

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden bg-gray-200">
                {/* 🖼️ IMAGE CAROUSEL (Desktop) */}
                {hasDesktopImages && (
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
                    ))
                )}
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

                {/* Desktop Images */}
                {/* {hasDesktopImages ? (
                    imageBanners.map((item, index) => (
                        <div
                            key={`desktop-${item?._id || index}`}
                            className={`hidden md:block absolute inset-0 bg-no-repeat bg-center transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'
                                } bg-cover`}
                            style={{
                                backgroundImage: item?.desktop?.url ? `url(${item.desktop.url})` : 'none',
                            }}
                        />
                    ))
                ) : (
                    <div className="hidden md:block absolute inset-0 bg-gray-400" />
                )} */}

                {/* 🎥 VIDEO (NO CAROUSEL AT ALL) */}
                {/* {videoBanner && (
                    <video
                        className="hidden md:block absolute inset-0 w-full h-full object-cover"
                        src={videoBanner.desktop.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )} */}


                {/* Mobile Images */}
                {/* {mobileBanner.map((item, index) => (
                    <div
                        key={`mobile-${item?._id || index}`}
                        className={`block md:hidden absolute inset-0 bg-no-repeat bg-center transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'
                            } bg-cover`}
                        style={{
                            backgroundImage: item?.mobile?.url ? `url(${item.mobile.url})` : 'none',
                        }}
                    />
                ))} */}
                {/* 📱 MOBILE BANNER */}
                {/* {hasMobileImages && (
                    imageBanners.map((item, index) => (
                        <div
                            key={`desktop-${item?._id || index}`}
                            className={`w-full h-full hidden md:block absolute inset-0 bg-no-repeat bg-center transition-opacity duration-700
                ${index === current ? 'opacity-100' : 'opacity-0'}
                bg-cover`}
                            style={{
                                backgroundImage: item?.desktop?.url
                                    ? `url(${item.desktop.url})`
                                    : 'none',
                            }}
                        />
                    ))
                )} */}
                {
                    hasMobileImages ? (
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
                    )
                }




                {/* Overlay for better text visibility */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" /> */}

                {/* Call to Action Button */}
                <div className="relative h-full flex items-end justify-center pb-10 sm:pb-16 lg:pb-20 px-3 sm:px-4 z-0">
                    <Link
                        // href="/contact"
                        className="bg-[#FFD900] text-[#4D3F31] px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3.5 text-sm sm:text-base lg:text-lg font-semibold sm:font-bold rounded-md sm:rounded-lg text-center shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                        <p className="leading-tight">Call for Reservation</p>
                        <p className="text-xs sm:text-sm lg:text-base font-medium">
                            8269245564
                        </p>
                    </Link>
                </div>
            </div>

            {/* Section-2 */}
            <section className="w-full bg-[white] py-10 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        {/* <Logo2 className="h-32 w-auto" /> */}
                        <img
                            src={content?.logo?.url}   // replace with your image import
                            alt="Ba-Dastoor Heritage"
                            className=" h-32 object-fill"
                        />
                        {/* {content?.logo?.url} */}
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[#2E2A27] mb-6"
                    >
                        {content?.heading}
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[#5A5551] mb-14">
                        {content?.description}
                    </p>

                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                        <img
                            src={content?.media?.url}   // replace with your image import
                            alt="Ba-Dastoor Heritage"
                            className="w-full object-fill"
                        />
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
                            <h1 style={{ fontFamily: "Cinzel" }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white mb-4">
                                Hand Crafted Menu
                            </h1>
                            <p style={{ fontFamily: "Cinzel" }} className="max-w-3xl mx-auto  text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
                                Indulge in a culinary journey where every meal is a masterpiece,
                                meticulously crafted by our expert chefs. Experience authentic flavors,
                                exceptional taste, and a personalized dining experience that caters to
                                your every need.
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
                                    <div
                                        key={index}
                                        className="h-[420px] flex flex-col"
                                    >
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
            <div className='relative max-w-full overflow-hidden'>
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        width: '100%',
                        backgroundImage: `url(${frame2})`,
                        backgroundSize: 'cover',
                        // backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <GoogleReviewsCarousel reviewCounts={totalReviewCount} avgRating={avgRating} reviews={reviews} />
            </div>

        </>
    )
}

export default Home