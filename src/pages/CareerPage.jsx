import React, { useEffect, useState } from 'react'
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react"
import Logo2 from "../assets/icons/logo-2.svg?react"

import careerpageBG from "../assets/images/careerpageBG.jpg"
import axios from 'axios'
import { toast } from "react-toastify";

const CareerPage = () => {
    const [isLoading, setisLoading] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [openPositions, setOpenPositions] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        position: "",
        experience: "",
        message: "",
    });
    const [cv, setCv] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const fetchJobList = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/jobs/all-jobs");
            console.log(res?.data?.data)
            setOpenPositions(res?.data?.data)
        } catch (error) {
            console.error("Error fetching job list:", error);
            // setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobList()
    }, [])

    const handlePositionClick = (position) => {
        setSelectedPosition(position)
        setShowForm(true)
    }

    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        const toastId = toast.loading("Submitting...", {
            style: {
                backgroundColor: "#1f2937", // slate-800 (universal)
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
            },
        });
        try {
            const data = new FormData();
            data.append("enquiryType", "career");
            // text fields
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            });
            // file
            if (cv) {
                data.append("cv", cv);
            }
            const res = await axios.post('http://localhost:3000/api/enquirys/create-enquiry', data);
            console.log(res)
            toast.update(toastId, {
                render: 'Your enquiry has been submitted successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
            setFormData({
                name: "",
                phone: "",
                email: "",
                position: "",
                experience: "",
                message: "",
            });
            setCv(null);
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
        <section className="relative min-h-screen w-full">
            {/* Banner */}
            <div className='relative h-[35vh] sm:h-[38vh] md:h-[40vh] w-full'>
                <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${careerpageBG})` }}
                >
                    {/* <div className="absolute inset-0 bg-black/40" /> */}
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold font-sans">
                            CAREER
                        </h1>
                    </div>
                </div>
            </div>

            {/* Open Positions */}
            {!showForm ? (
                <div className='bg-gradient-to-b from-[#f8f4f0] to-white py-16 px-4'>
                    <div className="max-w-7xl mx-auto">
                        <div className='text-center mb-16'>
                            {/* <div className="inline-block mb-6">
                                <span className="text-5xl">🍽️</span>
                            </div> */}
                            <div className="flex justify-center mb-10">
                                <Logo2 className="h-32 w-auto" />
                            </div>
                            <h3 className="text-[#8B4513] text-3xl md:text-4xl font-sans font-bold mb-4">
                                Openings
                            </h3>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                At Ba-Dastoor, we believe in the art of fine dining. Join our team of passionate
                                professionals dedicated to creating exceptional culinary experiences.
                            </p>
                        </div>
                        {/* Position card */}
                        {/* <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
                        >
                            {
                                openPositions.map((position) => (
                                    <div
                                        key={position._id}
                                        className="group bg-white rounded-xl shadow-md overflow-hidden
      hover:shadow-lg transition-all duration-300
      transform hover:-translate-y-1 border border-[#f0e6d6]"
                                    >
                                        <div className="pt-6 pb-4 px-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center font-serif">
                                                {position.jobTitle}
                                            </h3>

                                            <div className="flex flex-wrap justify-center gap-2 mb-3">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-3.5 h-3.5 mr-1 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-xs">{position.location}</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-3.5 h-3.5 mr-1 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                                    </svg>
                                                    <span className="text-xs">{position.experience}</span>
                                                </div>
                                            </div>

                                          
                                            <button
                                                onClick={() => handlePositionClick(position)}
                                                className="
    w-full
    bg-white
    text-[#8B4513]
    border border-[#8B4513]
    font-medium
    py-2 px-3
    rounded-md
    transition-all duration-200
    hover:bg-[#8B4513]
    hover:text-white
  "
                                            >
                                                Apply Now
                                            </button>

                                        </div>
                                    </div>
                                ))
                            }

                        </div> */}
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                            
                            <div className="bg-white rounded-xl shadow-md border border-[#e7d8c6] p-6 hover:shadow-xl transition">
                                <h3 className="text-xl font-semibold text-[#3b2a18]">
                                    Receptionist
                                </h3>

                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                    📍 Ashoka Garden, Bhopal
                                </div>

                                <div className="mt-6">
                                    <button className="w-full border border-[#c99a4d] text-[#c99a4d] py-2 rounded-lg hover:bg-[#c99a4d] hover:text-white transition">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        <div
                            // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"

                        // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6
                        >
                            {
                                openPositions.map((position) => (
                                    <div
                                        key={position._id}
                                        className="group bg-white rounded-xl shadow-md overflow-hidden
      hover:shadow-lg transition-all duration-300
      transform hover:-translate-y-1 border border-[#f0e6d6]"
                                    >
                                        <div className="pt-6 pb-4 px-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center font-serif">
                                                {position.jobTitle}
                                            </h3>

                                            <div className="flex flex-wrap justify-center gap-2 mb-3">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-3.5 h-3.5 mr-1 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-xs">{position.location}</span>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-3.5 h-3.5 mr-1 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                                    </svg>
                                                    <span className="text-xs">{position.experience}</span>
                                                </div>
                                            </div>

                                            {/* <button
                                                onClick={() => handlePositionClick(position)}
                                                className="w-full bg-linear-to-r from-[#8B4513] to-[#D2691E]
          text-white font-medium py-2 px-3 rounded-md
          hover:from-[#A0522D] hover:to-[#CD853F]
          transition-all duration-200"
                                            >
                                                Apply Now
                                            </button> */}
                                            <button
                                                onClick={() => handlePositionClick(position)}
                                                className="
    w-full
    bg-white
    text-[#8B4513]
    border border-[#8B4513]
    font-medium
    py-2 px-3
    rounded-md
    transition-all duration-200
    hover:bg-[#8B4513]
    hover:text-white
  "
                                            >
                                                Apply Now
                                            </button>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="text-center bg-gradient-to-r from-[#f8f4f0] to-[#f0e6d6] rounded-2xl p-12">
                            <div className="max-w-3xl mx-auto">
                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#8B4513] mb-4">
                                    Passion for Hospitality?
                                </h4>
                                <p className="text-gray-600 text-lg mb-8">
                                    Even if you don't see the perfect role, we're always looking for talented individuals
                                    passionate about food, service, and creating memorable experiences.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-[#8B4513] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#A0522D] transition-colors duration-300 text-lg"
                                    >
                                        Submit General Application
                                    </button>
                                    <button className="bg-transparent border-2 border-[#8B4513] text-[#8B4513] font-semibold py-3 px-8 rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors duration-300 text-lg">
                                        Meet Our Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#7a7573] py-14 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <Logo className="h-30 w-auto" />
                        </div>
                        <h3 className="text-[#FFD700] text-[2rem] tracking-widest mb-8">
                            JOIN THE BA-DASTOOR TEAM
                        </h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="career-input" placeholder="Enter your Name" />
                            <input type='number' name="phone"
                                value={formData.phone}
                                onChange={handleChange} className="career-input" placeholder="Mobile Number" />
                            <input name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="career-input"
                                placeholder="Email (Optional)"
                            />
                            <input name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="career-input"
                                placeholder="Position Applied For"
                            />
                            <input name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="career-input"
                                placeholder="Years of Experience"
                            />

                            <label className="career-upload cursor-pointer flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md">
                                <span className="text-gray-600">
                                    {cv ? cv.name : "Upload CV"}
                                </span>

                                <input
                                    type="file"
                                    name="cv"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                            </label>


                            <textarea type='text' name='message'
                                value={formData.message}
                                onChange={handleChange}
                                className="career-textarea sm:col-span-2"
                                placeholder="Additional Information"
                                rows="3"
                            />
                            <div className="sm:col-span-2 flex justify-center mt-6">
                                <button type='submit' disabled={isLoading} className={`career-btn ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}>
                                    {isLoading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Submit...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }

            {/* Form Section */}
            {/* <div className="bg-[#7a7573] py-14 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <Logo className="h-30 w-auto" />
                    </div>
                    <h3 className="text-[#FFD700] text-[2rem] tracking-widest mb-8">
                        JOIN THE BA-DASTOOR TEAM
                    </h3>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input className="career-input" placeholder="Enter your Name" />
                        <input className="career-input" placeholder="Mobile Number" />
                        <input
                            className="career-input"
                            placeholder="Email (Optional)"
                        />
                        <input
                            className="career-input"
                            placeholder="Position Applied For"
                        />
                        <input
                            className="career-input"
                            placeholder="Years of Experience"
                        />
                        <label className="career-upload">
                            <span>Upload CV</span>
                            <input type="file" className="hidden" />
                        </label>
                        <textarea
                            className="career-textarea sm:col-span-2"
                            placeholder="Additional Information"
                            rows="3"
                        />
                        <div className="sm:col-span-2 flex justify-center mt-6">
                            <button className="career-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div> */}
        </section >
    )
}

export default CareerPage