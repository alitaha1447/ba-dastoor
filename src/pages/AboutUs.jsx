import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Logo2 from "../assets/icons/logo-2.svg?react"
import video1 from "../assets/video/taj.mp4"
import chef from "../assets/images/chef.jpg"

const AboutUs = () => {

    const location = useLocation();
    console.log(location)

    const [desktopBanners, setDesktopBanners] = useState([])
    const [mobileBanner, setMobileBanner] = useState([])

    const [current, setCurrent] = useState(0);

    const [aboutUs, setAboutUs] = useState({})
    const [team, setTeam] = useState({})
    const [generalContent, setGeneralContent] = useState({})

    const page = location.pathname === "/about" && "about"

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchDesktopBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/get-desktopBanner?page=${page}`);
        console.log(res?.data?.data)
        setDesktopBanners(res?.data?.data)
    }

    useEffect(() => {
        fetchDesktopBanners()
    }, [page]);

    const fetchMobileBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=${page}`);
        console.log(res?.data?.data)
        setMobileBanner(res?.data?.data)
    }

    useEffect(() => {
        fetchMobileBanners()
    }, [page]);

    const fetchAboutUs = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/aboutUs/get-aboutus`)
            console.log(res?.data?.data)
            setAboutUs(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchAboutUs() }, [])

    const fetchTeam = async () => {
        console.log('..............')
        try {
            const res = await axios.get(`http://localhost:3000/api/team/get-team`)
            console.log(res)
            console.log(res?.data?.data)
            console.log('..............')
            setTeam(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchTeam() }, [])

    console.log(team)
    const fetchGeneralContent = async (p) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/generalContent/get-content?page=${p}`)
            console.log(res?.data?.data)
            setGeneralContent(res?.data?.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchGeneralContent(page) }, [])

    const imageBanners = desktopBanners.filter(
        (item) => item.desktop?.mediaType === "image"
    );
    const hasDesktopImages = Array.isArray(imageBanners) && imageBanners.length > 0;


    return (
        <div className="w-full overflow-hidden bg-white">

            {/* ================= HERO ================= */}
            <section className="relative h-[85vh] w-screen">
                {/* <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                    alt="Luxury Hotel"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 h-full flex flex-col justify-end items-center pb-16">
                    <h1 className="text-white text-4xl md:text-5xl font-[Playfair_Display] tracking-wide">
                        About Us
                    </h1>
                    <span className="mt-4 h-[2px] w-20 bg-[#C6A15B]" />
                </div> */}
                {hasDesktopImages ? (
                    imageBanners.map((item, index) => (
                        <div
                            key={`desktop-${item?._id || index}`}
                            className={`hidden md:block w-[100%] absolute inset-0 bg-no-repeat bg-center transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'
                                } bg-cover`}
                            style={{
                                backgroundImage: item?.desktop?.url ? `url(${item.desktop.url})` : 'none',
                            }}
                        />
                    ))
                ) : (
                    <div className="hidden md:block absolute inset-0 bg-gray-400" />
                )}
                {/* 📱 MOBILE BANNER */}
                {mobileBanner?.length > 0 ? (
                    mobileBanner.length === 1 ? (
                        // ✅ SINGLE IMAGE (NO CAROUSEL)
                        <div
                            className="block md:hidden absolute inset-0 bg-no-repeat bg-center bg-cover"
                            style={{
                                backgroundImage: mobileBanner[0]?.mobile?.url
                                    ? `url(${mobileBanner[0].mobile.url})`
                                    : "none",
                            }}
                        />
                    ) : (
                        // 🔁 MULTIPLE IMAGES (CAROUSEL)
                        mobileBanner.map((item, index) => (
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
                    // ❌ NO IMAGE → FALLBACK
                    <div className="block md:hidden absolute inset-0 bg-gray-400" />
                )}

            </section>

            {/* ================= HERITAGE ================= */}
            <section className="relative max-w-7xl mx-auto px-6 py-12 bg-white">
                {/* Heading */}
                <div className="relative z-10 max-w-3xl mx-auto mb-16 text-center">
                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[#2E2A27] mb-6"
                    >
                        {aboutUs?.aboutUsHeading}
                    </h1>
                    <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[#5A5551] mb-14">

                        {aboutUs?.aboutUsPara}
                    </p>
                </div>

                {/* TWO SECTIONS */}
                <div className="flex flex-col md:flex-row gap-10">

                    {/* 🌸 PINK SECTION — 60% */}
                    <div className="relative md:w-3/5 bg-white shadow-2xl rounded-2xl p-6 md:p-8 overflow-hidden  md:h-[380px]">

                        <div className="relative flex flex-col md:flex-row md:items-center">

                            {/* IMAGE */}
                            <div className="w-full md:w-[70%] md:ml-auto">
                                <img
                                    src={aboutUs?.ownerImage?.url}
                                    alt="Owner"
                                    className="w-full h-[300px] md:h-[340px] object-cover shadow-xl"
                                />
                            </div>

                            {/* OVERLAY CARD */}
                            <div
                                className="bg-white max-w-xs p-5 md:p-6 shadow-2xl z-20 relative mt-5 md:absolute md:left-0 md:top-[43%] md:-translate-y-1/2  "
                            >
                                <h2 className="text-xl md:text-2xl font-[Playfair_Display] mb-3">
                                    {aboutUs?.heading}
                                </h2>

                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {aboutUs?.description}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* 🔴 RED SECTION — 40% : CHEF SPOTLIGHT */}
                    <div className="md:w-2/5 relative overflow-hidden rounded-xl  p-6 md:p-8  shadow-2xl md:h-[380px]">

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
                            <h3 className="text-2xl md:text-3xl font-[Playfair_Display] text-white mb-3">
                                {team?.role}
                            </h3>
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
                <div className="relative z-10 w-full flex flex-col items-center">

                    {/* HEADING */}
                    <div className="max-w-3xl mx-auto mb-14 text-center px-4">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[white] mb-6"
                        >

                            {generalContent?.heading}
                        </h1>
                        {/* <h1 className="text-white text-4xl md:text-5xl leading-tight mb-6 font-[Playfair_Display]">
                        </h1> */}

                        <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[white] ">

                            {generalContent?.description}
                        </p>
                    </div>

                    {/* VIDEO BOX */}
                    <div className="w-full max-w-5xl px-4">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black  h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]      ">
                            {/* <video
                                className="w-full h-full object-cover"
                                src={video1}
                                poster="/images/video-poster.jpg"
                                controls
                                playsInline
                                autoPlay
                                loop
                            // muted

                            /> */}
                            <video
                                className=" w-full h-full object-cover"
                                src={generalContent?.media?.url}
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default AboutUs;
