import React, { useState } from 'react'
import { NavLink } from 'react-router';
import Logo from "../../../assets/icons/Ba-Dastoor_Logo.svg?react"
import { FaPhoneAlt } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openBranches, setOpenBranches] = useState(false);



    const navLinks = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Menu", path: "/menu" },
        { label: "Gallery", path: "/gallery" },
        // { label: "Catering Services", path: "/catering" },
        { label: "Catering Enquiry", path: "/catering-enquiry" },
        { label: "Career", path: "/career" }, // ✅ ADDED
    ];


    return (
        <header className="fixed top-0 left-0 w-full z-[999999999]">
            <nav className="relative max-w-7xl mx-auto mt-3 sm:mt-4 lg:mt-6 px-4 sm:px-6 lg:px-0">
                <div className="bg-[#271414c4] rounded-lg p-3">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex shrink-0">
                            <Logo className="h-16 w-auto" />
                        </div>
                        {/* Desktop Nav */}
                        <ul className="hidden lg:flex items-center gap-16 text-white text-sm">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `transition hover:text-orange-400 ${isActive ? "text-orange-400" : ""
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop Branch Button */}
                        <button
                            onClick={() => setOpenBranches(!openBranches)}
                            className="hidden lg:flex items-center gap-2 px-5 py-2.5 
                          rounded-lg border border-orange-600 text-white text-sm">
                            <span>Our Branches</span>
                            <span className="text-xs">▾</span>
                        </button>

                        {/* Mobile menu button */}
                        <button
                            className={`lg:hidden text-2xl text-white`}
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            {open ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </nav>
            {/* Mobile menu */}
            {open && (
                <div className={`lg:hidden px-4 sm:px-6 pb-4`}>
                    <div className={`bg-[#271414c4] mt-6 rounded-lg
             ${open ? "animate-slideDown" : "animate-slideUp"}    `}
                    >
                        <div className="p-6">
                            <ul className="space-y-4 mb-8">
                                {navLinks.map((item) => (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `transition hover:text-orange-400 ${isActive ? "text-orange-400" : "text-white"
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            )}



            {/* Branches Dropdown */}
            <div className={`hidden lg:block absolute left-0 right-0 top-full
         max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 transform transition-all duration-300 ease-out
         ${openBranches ? "translate-y-0 opacity-100 pointer-events-auto"
                    : "-translate-y-6 opacity-0 pointer-events-none"}`}>
                <div className="mt-3 p-6 w-full text-white bg-[#241616e5] rounded-lg shadow-xl border border-white/10 max-h-[450px] overflow-y-auto scrollbar-brown">
                    {/* Title & Meta */}
                    <div className="">
                        <div >
                            <div className='flex items-start justify-between'>
                                <div>

                                    <h1 className="text-xl font-semibold">
                                        Ba-Dastoor - Family Resturant| Best Biryani Place In Bhopal (Maple High Street)                                        </h1>
                                    <p className="text-sm text-white/80 mt-1">
                                        ⭐ 4.2 · 1,061 Google reviews · Restaurant · <span className='text-green-400'>Open</span>
                                    </p>
                                    <p className='text-sm text-white/80 mt-1'>Address: A-12, Main Rd, Housing Board Colony, Bhopal, Madhya Pradesh 462001</p>
                                </div>
                                <div className='flex items-center gap-2 border border-white p-3 rounded-lg'>
                                    <span><FaPhoneAlt /></span>
                                    <p>  062638 63799</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch w-full h-[240px]">

                            {/* Box 1 – Larger */}
                            <div className="w-full md:w-[60%] p-4">
                                <div className="h-[220px] rounded-lg overflow-hidden flex gap-2">

                                    {/* Left: Big Image */}
                                    <div className="w-[65%] h-full overflow-hidden rounded-md">
                                        <img
                                            src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                            alt="Ba-Dastoor Interior"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Right: Two stacked images */}
                                    <div className="w-[35%] h-full flex flex-col gap-2">
                                        <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 1"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 2"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* Vertical Divider (MD+) */}
                            <div className="hidden md:flex items-center">
                                <div className="h-[80%] w-[1.5px] bg-white/30" />
                            </div>

                            {/* Box 2 – Slightly Smaller */}
                            <div className="w-full md:w-[40%] p-4">
                                <div className="h-full bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                    <iframe
                                        title="Ba-Dastoor Location"
                                        src="https://www.google.com/maps?q=Kohefiza+Bhopal&output=embed"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*  */}
                    <div className="w-[80%] mx-auto my-6 h-px bg-gray-200/60" />
                    {/*  */}
                    <div className="">
                        <div >
                            <div className='flex items-start justify-between'>
                                <div>

                                    <h1 className="text-xl font-semibold">
                                        Ba-Dastoor - Family Resturant| Best Biryani Place In Bhopal (Maple High Street)                                        </h1>
                                    <p className="text-sm text-white/80 mt-1">
                                        ⭐ 4.2 · 1,061 Google reviews · Restaurant · <span className='text-green-400'>Open</span>
                                    </p>
                                    <p className='text-sm text-white/80 mt-1'>Address: A-12, Main Rd, Housing Board Colony, Bhopal, Madhya Pradesh 462001</p>
                                </div>
                                <div className='flex items-center gap-2 border border-white p-3 rounded-lg'>
                                    <span><FaPhoneAlt /></span>
                                    <p>  062638 63799</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch w-full h-[240px]">

                            {/* Box 1 – Larger */}
                            <div className="w-full md:w-[60%] p-4">
                                <div className="h-[220px] rounded-lg overflow-hidden flex gap-2">

                                    {/* Left: Big Image */}
                                    <div className="w-[65%] h-full overflow-hidden rounded-md">
                                        <img
                                            src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                            alt="Ba-Dastoor Interior"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Right: Two stacked images */}
                                    <div className="w-[35%] h-full flex flex-col gap-2">
                                        <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 1"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 2"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* Vertical Divider (MD+) */}
                            <div className="hidden md:flex items-center">
                                <div className="h-[80%] w-[1.5px] bg-white/30" />
                            </div>

                            {/* Box 2 – Slightly Smaller */}
                            <div className="w-full md:w-[40%] p-4">
                                <div className="h-full bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                    <iframe
                                        title="Ba-Dastoor Location"
                                        src="https://www.google.com/maps?q=Kohefiza+Bhopal&output=embed"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Header