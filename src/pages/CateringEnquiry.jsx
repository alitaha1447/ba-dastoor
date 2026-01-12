import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import cateringBg from "../assets/images/cateringBg.jpeg"
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

const CateringEnquiry = () => {
    const [isLoading, setisLoading] = useState(false)
    const initialState = {
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guests: "",
    }
    const [formData, setFormData] = useState(initialState);
    const [branches, setBranches] = useState([]);

    const [desktopBanner, setDesktopBanners] = useState([]);
    const [mobileBanner, setMobileBanner] = useState([])

    const location = useLocation();
    const page = location.pathname === "/catering-enquiry" && "catering"
    const [mapUrl, setMapUrl] = useState("https://www.google.com/maps?q=Kohefiza+Bhopal&output=embed");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchSelectedDesktopBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/get-selected-desktopBanner?page=${page}`);
        setDesktopBanners(res?.data?.data);
    }

    useEffect(() => { fetchSelectedDesktopBanners() }, [page]);

    const fetchMobileBanners = async () => {
        const res = await axios.get(`http://localhost:3000/api/banners/mobile/get-mobileBanner?page=${page}`);
        setMobileBanner(res?.data?.data)
    }

    useEffect(() => { fetchMobileBanners() }, [page]);

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

    const resetForm = () => {
        setFormData(initialState);
    }


    useEffect(() => {
        const fetchBranches = async () => {
            const res = await axios.get('http://localhost:3000/api/branches/get-branches');
            setBranches(res?.data?.data)
        }
        fetchBranches()
    }, [])

    const extractSrcFromIframe = (iframeString) => {
        const match = iframeString.match(/src="([^"]+)"/);
        return match ? match[1] : "";
    };

    const handleSetMap = (map) => {
        // console.log(map)
        //   setMapUrl(extractSrcFromIframe(iframeHtml));
        const url = extractSrcFromIframe(map);
        console.log(url)
        setMapUrl(url)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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
                enquiryType: "catering", // 🔑 mandatory
                ...formData,
            };

            const res = await axios.post(`http://localhost:3000/api/enquirys/create-enquiry`, payload);
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
                                    Catering
                                </h1>
                            </div>
                        </div>
                    ))}
            </div>
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
                                    Career
                                </h1>

                            </div>

                        </div>
                    ))}
            </div>
            <section className=" min-h-screen py-14 px-4 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-8"
                    style={{ backgroundImage: `url(${cateringBg})` }}
                />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative z-10">

                    {/* ================= LEFT SIDE ================= */}
                    <div className="">
                        {/* Map */}
                        <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-lg mb-6">
                            <iframe
                                title="Ba-Dastoor Location"
                                // src="https://www.google.com/maps?q=Kohefiza+Bhopal&output=embed"
                                src={mapUrl}
                                className="w-full h-full border-0"
                                loading="lazy"
                            />
                        </div>

                        {/* Heading */}
                        <h3 className="text-[#F39100] text-center font-semibold text-lg mb-4">
                            Our Branches
                        </h3>

                        {/* Branches */}
                        <div className="space-y-4 text-sm text-[#512800] ">
                            {branches.map((branch, index, arr) => {
                                // console.log(branch?.embedUrl)
                                return (
                                    <div
                                        key={branch._id}
                                        onClick={() => handleSetMap(branch?.embedUrl)}
                                        className={`cursor-pointer p-2 pb-2 hover:bg-gray-200 ${index !== arr.length - 1 ? "border-b border-[#E6DED4]" : ""
                                            }`}
                                    >
                                        <p className="">{branch.branchName}</p>
                                        <p>{branch.address}</p>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="bg-[#6F6A68] rounded-2xl px-6 py-10 sm:px-10 shadow-lg">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Logo className="h-30 w-auto text-white" />
                        </div>

                        {/* Title */}
                        <div className="flex justify-center mb-8">
                            <span className="bg-[#3e3e3e] text-[#FFD900] px-4 py-2 rounded-md text-xs tracking-widest">
                                CATERING ENQUIRY
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
                            <input name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Event Type"
                            />

                            <input type="date" name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Event Date"
                            />
                            <input type="number" name="guests" value={formData.guests} onChange={handleChange}
                                className="catering-input"
                                placeholder="Number of Guests"
                            />

                            <div className="sm:col-span-2 flex justify-center mt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`catering-btn flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
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
    );
};

export default CateringEnquiry;
