import React, { useEffect } from 'react'
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react"
import careerpageBG from "../assets/images/careerpageBG.jpg"

const CareerPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative min-h-[100vh] w-full">
            {/* Banner */}
            <div className='relative h-[35vh] sm:h-[38vh] md:h-[40vh] w-full'>
                <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${careerpageBG})` }}
                >
                    {/* <div className="absolute inset-0 bg-black/40" /> */}
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold">
                            CAREER
                        </h1>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-[#7a7573] py-14 px-4">
                {/* <CareerForm /> */}

                <div className="max-w-3xl mx-auto text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Logo className="h-30 w-auto" />
                    </div>
                    <h3 className="text-[#FFD700] text-[2rem] tracking-widest mb-8">
                        JOIN THE BA-DASTOOR TEAM
                    </h3>
                    {/* Form */}
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

                        {/* File Upload */}
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
            </div>
        </section>
    )
}

export default CareerPage