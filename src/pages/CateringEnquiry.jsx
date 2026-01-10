import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import careerpageBG from "../assets/images/careerpageBG.jpg"
import axios from "axios";
import { toast } from "react-toastify";

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            console.log(res)
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
            <div className='relative h-[35vh] sm:h-[38vh] md:h-[40vh] w-full'>
                <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${careerpageBG})` }}
                >
                    {/* <div className="absolute inset-0 bg-black/40" /> */}
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold font-sans">
                            Catering Enquiry
                        </h1>
                    </div>
                </div>
            </div>
            <section className="bg-[#eeeeee] min-h-screen py-14 px-4 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* ================= LEFT SIDE ================= */}
                    <div>
                        {/* Map */}
                        <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-lg mb-6">
                            <iframe
                                title="Ba-Dastoor Location"
                                src="https://www.google.com/maps?q=Kohefiza+Bhopal&output=embed"
                                className="w-full h-full border-0"
                                loading="lazy"
                            />
                        </div>

                        {/* Heading */}
                        <h3 className="text-[#F39100] text-center font-semibold text-lg mb-4">
                            Our Branches
                        </h3>

                        {/* Branches */}
                        <div className="space-y-4 text-sm text-[#512800]">
                            {branches.map((branch, index, arr) => (
                                <div
                                    key={branch._id}
                                    className={`pb-2 ${index !== arr.length - 1 ? "border-b border-[#E6DED4]" : ""
                                        }`}
                                >
                                    <p className="">{branch.branchName}</p>
                                    <p>{branch.address}</p>
                                </div>
                            ))}
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
                            <input name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Enter your Name"
                            />
                            <input type="number" name="phone" value={formData.phone}
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Mobile Number" />

                            <input name="email" value={formData.email}
                                onChange={handleChange}
                                className="catering-input"
                                placeholder="Email (Optional)"
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
