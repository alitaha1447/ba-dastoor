import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import formBg2 from "../assets/images/formBg2.jpeg";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDesktopBanners, fetchMobileBanners } from "../api/banner/bannerApi";

const Franchise = () => {
    const [isLoading, setisLoading] = useState(false)
    const initialState = {
        name: "",
        email: "",
        phone: "",
        city: ""
    }
    const [formData, setFormData] = useState(initialState);

    const resetForm = () => {
        setFormData(initialState);
    }
    // const [desktopBanner, setDesktopBanners] = useState([]);
    // const [mobileBanner, setMobileBanner] = useState([]);

    const location = useLocation();

    const page = location.pathname === "/franchise" && "franchise"
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const fetchSelectedDesktopBanners = async () => {
    //     const res = await axios.get(`http://localhost:3000/api/banners/get-selected-desktopBanner?page=home`);
    //     setDesktopBanners(res?.data?.data);
    // }

    // useEffect(() => { fetchSelectedDesktopBanners() }, []);

    // const fetchMobileBanners = async () => {
    //     const res = await axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=home`);
    //     setMobileBanner(res?.data?.data)
    // }
    // console.log(mobileBanner)
    // useEffect(() => { fetchMobileBanners() }, []);

    const { data: desktopBanner = [] } = useQuery({
        queryKey: ["desktop-banners", page],
        queryFn: () => fetchDesktopBanners(page),
    });

    const { data: mobileBanner = [] } = useQuery({
        queryKey: ["mobile-banners", page],
        queryFn: () => fetchMobileBanners(page),
    });



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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // CARAOUSEL
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


    // useEffect(() => {
    //     if (imageBanners.length <= 1) return;

    //     const id = setInterval(() => {
    //         setCurrent(i => (i + 1) % imageBanners.length);
    //     }, 3000);

    //     return () => clearInterval(id);
    // }, [imageBanners.length]);

    // useEffect(() => {
    //     if (imageMobileBanners.length <= 1) return;

    //     const id = setInterval(() => {
    //         setCurrent(i => (i + 1) % imageMobileBanners.length);
    //     }, 3000);

    //     return () => clearInterval(id);
    // }, [imageMobileBanners.length]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true)
        const toastId = toast.loading("Processing...", {
            style: {
                backgroundColor: "#1f2937", // slate-800 (universal)
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
            },
        });

        try {
            const payload = {
                enquiryType: "franchise", // 🔑 mandatory
                ...formData,
            };

            const res = await axios.post(`https://ba-dastoor-backend.onrender.com/api/enquirys/create-enquiry`, payload);
            // console.log(res)
            // alert("Your enquiry has been submitted successfully!");
            toast.update(toastId, {
                render: 'Your enquiry has been submitted successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
            resetForm();
        } catch (error) {
            console.log(error)
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
            setisLoading(false)
        }
    }

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
                            <h1 className="text-white text-2xl font-semibold">
                                Catering
                            </h1>
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
                            <h1 className="text-white text-2xl font-semibold">
                                Catering
                            </h1>
                        </div>
                    </div>
                )}
            </div>

            {/*  */}
            <section className="w-full py-8 px-4 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-7"
                    style={{ backgroundImage: `url(${formBg2})` }}
                />

                {/* <div className="absolute inset-0 bg-black/45" /> */}

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start z-50">
                    {/* ================= LEFT SIDE ================= */}
                    <div className="flex flex-col justify-center h-full text-center">
                        <h3 className="text-[#8B4513] text-3xl md:text-4xl font-serif mb-4">
                            Openings Franchise
                        </h3>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto font-serif">
                            At Ba-Dastoor, we believe in the art of fine dining. Join our team of passionate
                            professionals dedicated to creating exceptional culinary experiences.
                        </p>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="bg-[#66615f] rounded-2xl px-6 py-10 sm:px-10 shadow-lg z-50">
                        {/* Background Image */}
                        {/* <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${})`,
                            }}
                        /> */}
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Logo className="h-30 w-auto text-white" />
                        </div>

                        {/* Title */}
                        <div className="flex justify-center mb-8">
                            <span className="bg-[#3e3e3e] text-[#FFD900] px-4 py-2 rounded-md text-xs tracking-widest">
                                FOR FRANCHISE
                            </span>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="name" value={formData.name} required
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Enter your Name"
                            />
                            <input type="number" name="phone" value={formData.phone} required
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Mobile Number" />

                            <input name="email" value={formData.email} required
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Email"
                            />
                            <input name="city" value={formData.city} required
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="City"
                            />

                            <div className=" col-span-full flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`border-2 text-sm text-white border-white hover:bg-white hover:text-black transition px-8 py-2 rounded-full inline-flex items-center gap-2
            ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        `}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        "Request a Call Back"
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Franchise