import React from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";


const CateringEnquiry = () => {
    return (
        <section className="bg-[#eeeeee] h-screen py-14 px-4">
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
                        {[
                            {
                                name: "Badastoor (Kohefiza)",
                                address:
                                    "Address: A-12, Main Rd, Housing Board Colony, Bhopal, Madhya Pradesh 462001",
                            },
                            {
                                name: "Badastoor (Maple High Street)",
                                address:
                                    "Address: Shop No - 9A Ground Floor, Maple High Street, Narmadapuram Rd, Chinar Fortune City, Bhopal, Madhya Pradesh 462026",
                            },
                            {
                                name: "Badastoor (Ashoka Garden)",
                                address:
                                    "Plot No. 9, 80 Feet Rd, Dairy Colony, Ashoka Garden, Bhopal, Madhya Pradesh 462023",
                            },
                        ].map((branch, index, arr) => (
                            <div
                                key={branch.name}
                                className={`pb-2 ${index !== arr.length - 1 ? "border-b border-[#E6DED4]" : ""
                                    }`}
                            >
                                <p className="">{branch.name}</p>
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
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input className="catering-input" placeholder="Enter your Name" />
                        <input className="catering-input" placeholder="Mobile Number" />

                        <input
                            className="catering-input"
                            placeholder="Email (Optional)"
                        />
                        <input
                            className="catering-input"
                            placeholder="Event Type"
                        />

                        <input
                            className="catering-input"
                            placeholder="Event Date"
                        />
                        <input
                            className="catering-input"
                            placeholder="Number of Guests"
                        />

                        <div className="sm:col-span-2 flex justify-center mt-4">
                            <button className="catering-btn">
                                Request a Call Back
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default CateringEnquiry;
