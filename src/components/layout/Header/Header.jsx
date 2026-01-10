import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router';
import Logo from "../../../assets/icons/Ba-Dastoor_Logo.svg?react"
import { FaPhoneAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [openBranches, setOpenBranches] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [branches, setBranches] = useState([])
    const [totalReviewCount, setTotalReviewCount] = useState(null)
    const [avgRating, setAvgRating] = useState(null)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const navLinks = [
        { label: "Home", path: "/", type: "route" },
        { label: "About Us", path: "/about", type: "route" },
        { label: "Menu", path: "menu", type: "scroll" },
        { label: "Gallery", path: "/gallery", type: "route" },
        { label: "Catering Enquiry", path: "/catering-enquiry", type: "route" },
        { label: "Career", path: "/career", type: "route" }, // ✅ ADDED
    ];

    useEffect(() => {
        const fetchBranches = async () => {
            const res = await axios.get('http://localhost:3000/api/branches/get-branches');
            setBranches(res?.data?.data)
        }
        fetchBranches()
    }, [])

    useEffect(() => {
        const fetchReview = async () => {
            const res = await axios("https://featurable.com/api/v1/widgets/11b960ce-b735-4b9a-9cb1-808b4a28c17c");
            setAvgRating(res?.data?.averageRating)
            setTotalReviewCount(res?.data?.totalReviewCount)
        }
        fetchReview()
    }, []);

    const handleMenuClick = (e) => {
        e.preventDefault();

        if (location.pathname === "/") {
            // If already on homepage, scroll smoothly to menu section
            const menuSection = document.getElementById("menu");
            if (menuSection) {
                menuSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        } else {
            // If on another page, navigate to home with scroll state
            navigate("/", {
                state: { scrollTo: "menu" },
                // This ensures the browser doesn't try to scroll immediately
                replace: true
            });
        }
        setOpen(false); // close mobile menu if open
        setOpenBranches(false); // close branches dropdown if open
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-[999999999] transition-all duration-300 ${scrolled ? '' : ''}`}>
            {/* <nav className={`relative max-w-full  ${scrolled ? 'mx-0 px-4 sm:px-6 lg:px-0' : 'mx-6 mt-3 sm:mt-4 lg:mt-6 px-4 sm:px-6 lg:px-0'}`}> */}
            <nav className={`w-full`}>
                {/* <div className={` p-3 transition-all duration-300 ${scrolled ? ' bg-[#271414fa]' : 'rounded-lg bg-[#271414c4]'}`}> */}
                <div className={` py-4 transition-all duration-300 ${scrolled ? 'px-4 bg-[#0f0802db]' : 'bg-[#0f0802a9] px-4'}`}>
                    <div className="h-12 flex items-center justify-between">
                        <div className="flex shrink-0">
                            <Logo className={`h-16 w-auto ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                        </div>
                        <ul className="hidden lg:flex items-center gap-16 text-white text-base font-normal font-san">
                            {/* {navLinks.map((item) => (
                                <li key={item.path}>
                                    {
                                        item.type === "route" ? (
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `transition hover:text-orange-400 ${isActive ? "text-orange-400" : ""
                                                    }`
                                                }
                                            >
                                                {item.label}
                                            </NavLink>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="transition hover:text-orange-400"
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    }

                                </li>
                            ))} */}
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    {item.label === "Menu" ? (
                                        <button
                                            onClick={handleMenuClick}
                                            className="transition hover:text-orange-400"
                                        >
                                            Menu
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `transition hover:text-orange-400 ${isActive ? "text-orange-400" : ""
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    )}
                                </li>
                            ))}

                        </ul>

                        <button
                            // onMouseEnter={() => setOpenBranches(!openBranches)}
                            onClick={() => setOpenBranches(!openBranches)}
                            className="hidden lg:flex items-center gap-2 px-6 py-2.5 cursor-pointer
                          rounded-lg border border-white text-white text-sm hover:border-amber-400">
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
                <div className={`lg:hidden px-4 pb-4`}>
                    <div className={`bg-[#0f0802db] mt-2 rounded-lg
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
                <div className="mt-3 py-0 px-6 w-full text-white bg-[#0f0802db] rounded-lg shadow-xl border border-white/10 max-h-[480px] overflow-y-auto scrollbar-brown">
                    <div className='my-4 flex justify-end'>
                        {/* <X /> */}
                        <RxCross2 style={{ cursor: 'pointer' }} size={20} onClick={() => setOpenBranches(!openBranches)} />

                    </div>
                    {/* Title & Meta */}
                    {
                        branches.length > 0 ? (
                            branches.map((branch, index) => {
                                return (
                                    <div key={branch?._id} className="">
                                        <div >
                                            <div className='flex items-start justify-between'>
                                                <div>
                                                    <h1 className="text-xl font-semibold">
                                                        {branch?.branchName}                                 </h1>
                                                    <p className="text-sm text-white/80 mt-1">
                                                        ⭐ {avgRating?.toFixed(1)} · {totalReviewCount} Google reviews · Restaurant · <span className='text-green-400'>Open</span>
                                                    </p>
                                                    <p className='text-sm text-white/80 mt-1'>{branch?.address}</p>
                                                </div>
                                                <div className='flex items-center gap-2 border border-white p-3 rounded-lg'>
                                                    <span><FaPhoneAlt /></span>
                                                    <p>{branch?.contact}</p>
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
                                                            src={branch?.images[0]?.url}
                                                            alt="Ba-Dastoor Interior"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Right: Two stacked images */}
                                                    <div className="w-[35%] h-full flex flex-col gap-2">
                                                        <div className="flex-1 overflow-hidden rounded-md">
                                                            <img
                                                                src={branch?.images[1]?.url}
                                                                alt="Dish 1"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        <div className="flex-1 overflow-hidden rounded-md">
                                                            <img
                                                                src={branch?.images[2]?.url}
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
                                                <div className="h-[100%] bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                                    <div
                                                        className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: branch?.embedUrl
                                                        }}
                                                    />


                                                </div>
                                            </div>
                                        </div>
                                        {/* ===== Divider (NOT after last branch) ===== */}
                                        {index !== branches.length - 1 && (
                                            <div className="w-[80%] mx-auto my-6 h-px bg-gray-200/60" />
                                        )}
                                    </div>
                                )
                            })
                        ) : (<div><span>No Branches</span></div>)}
                </div>
            </div >
        </header >
    )
}

export default Header