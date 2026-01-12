import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import formBg2 from "../assets/images/formBg2.jpeg";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

const Franchise = () => {
    const [isLoading, setisLoading] = useState(false)
    const initialState = {
        name: "",
        email: "",
        phone: "",
    }
    const [formData, setFormData] = useState(initialState);


    const [desktopBanner, setDesktopBanners] = useState([]);
    const [mobileBanner, setMobileBanner] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchSelectedDesktopBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/get-selected-desktopBanner?page=career`);
        setDesktopBanners(res?.data?.data);
    }

    useEffect(() => { fetchSelectedDesktopBanners() }, []);

    const fetchMobileBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=career`);
        setMobileBanner(res?.data?.data)
    }

    useEffect(() => { fetchMobileBanners() }, []);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setisLoading(true)
        // const toastId = toast.loading("Processing...", {
        //     style: {
        //         backgroundColor: "#1f2937", // slate-800 (universal)
        //         color: "#ffffff",
        //         fontSize: "14px",
        //         fontWeight: "500",
        //     },
        // });

        // try {
        //     const payload = {
        //         enquiryType: "catering", // 🔑 mandatory
        //         ...formData,
        //     };

        //     const res = await axios.post(`http://localhost:3000/api/enquirys/create-enquiry`, payload);
        //     // console.log(res)
        //     // alert("Your enquiry has been submitted successfully!");
        //     toast.update(toastId, {
        //         render: 'Your enquiry has been submitted successfully!',
        //         type: 'success',
        //         isLoading: false,
        //         autoClose: 3000,
        //     });
        //     resetForm();
        // } catch (error) {
        //     console.log(error)
        //     toast.update(toastId, {
        //         render:
        //             error?.response?.data?.message ||
        //             "Something went wrong. Please try again.",
        //         type: "error",
        //         isLoading: false,
        //         autoClose: 4000,
        //         style: {
        //             backgroundColor: "#7a1c1c",
        //             color: "#ffffff",
        //         },
        //     });
        // } finally {
        //     setisLoading(false)
        // }
    }

    return (
        <>
            <div className='relative hidden lg:block h-[40vh] w-full overflow-hidden'>
                {imageBanners &&
                    imageBanners.map((item, index) => (
                        <div
                            key={`desktop-${index}`}
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${item?.desktop?.url})`,
                                backgroundPosition: "center 30%",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/30" />

                            <div className="relative z-10 flex items-center justify-center h-full">
                                <h1 className="text-white text-5xl font-semibold">
                                    Franchise
                                </h1>
                            </div>
                        </div>
                    ))}
            </div>
            {/* MOBILE BANNER */}
            <div className="block lg:hidden">
                {imageMobileBanners &&
                    imageMobileBanners.map((item, index) => (
                        <div
                            key={`mobile-${index}`}
                            className="relative  h-[180px]  w-full bg-cover bg-center "
                            style={{
                                backgroundImage: `url(${item?.mobile?.url})`,
                                // backgroundPosition: "center 20%",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/25" />

                            <div className="relative z-10 h-full flex flex-col justify-end p-4">
                                <h1 className="text-white text-2xl font-semibold">
                                    Franchise
                                </h1>

                            </div>

                        </div>
                    ))}
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

                            <div className=" flex justify-center items-center">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full border-2 text-sm text-[white] border-white hover:bg-white hover:text-black transition px-8 py-2 rounded-full flex items-center justify-center gap-2  ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                                        }`}
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