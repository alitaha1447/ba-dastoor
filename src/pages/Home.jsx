import React, { useState } from 'react'
import { Link } from 'react-router';
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import Logo2 from "../assets/icons/logo-2.svg?react"
import CharMinarLogo from "../assets/icons/charMinarLogo.svg?react"
import bannerImg from "../assets/images/bannerImage.jpg"
import bannerImg2 from "../assets/images/bannerImage2.jpg"
import bannerImg3 from "../assets/images/bannerImage3.jpg"
import charMinar from "../assets/images/charMinar.jpg"
import backgroundLine from "../assets/images/backgroundLine.jpg"
import { FaPhoneAlt } from "react-icons/fa";

export const menuData = [
    {
        title: "Starters",
        items: [
            { name: "Chicken 65", price: "₹320" },
            { name: "Paneer Tikka", price: "₹280" },
            { name: "Veg Seekh Kebab", price: "₹260" },
            { name: "Mutton Shami Kebab", price: "₹380" },
            { name: "Fish Amritsari", price: "₹340" },
            { name: "Crispy Corn", price: "₹220" },
            { name: "Hara Bhara Kebab", price: "₹240" },
            { name: "Chicken 65", price: "₹320" },
            { name: "Paneer Tikka", price: "₹280" },
            { name: "Veg Seekh Kebab", price: "₹260" },
            { name: "Mutton Shami Kebab", price: "₹380" },
            { name: "Fish Amritsari", price: "₹340" },
            { name: "Crispy Corn", price: "₹220" },
            { name: "Hara Bhara Kebab", price: "₹240" },
        ],
    },
    {
        title: "Main Course",
        items: [
            { name: "Hyderabadi Chicken Biryani", price: "₹420" },
            { name: "Mutton Biryani", price: "₹520" },
            { name: "Paneer Butter Masala", price: "₹360" },
            { name: "Dal Makhani", price: "₹300" },
            { name: "Chicken Korma", price: "₹400" },
            { name: "Bagara Baingan", price: "₹320" },
            { name: "Rumali Roti", price: "₹40" },
        ],
    },
    {
        title: "Desserts",
        items: [
            { name: "Double Ka Meetha", price: "₹180" },
            { name: "Qubani Ka Meetha", price: "₹190" },
            { name: "Gulab Jamun", price: "₹150" },
            { name: "Phirni", price: "₹160" },
            { name: "Kesar Kulfi", price: "₹170" },
            { name: "Shahi Tukda", price: "₹180" },
            { name: "Ice Cream", price: "₹140" },
        ],
    },
    {
        title: "Desserts",
        items: [
            { name: "Double Ka Meetha", price: "₹180" },
            { name: "Qubani Ka Meetha", price: "₹190" },
            { name: "Gulab Jamun", price: "₹150" },
            { name: "Phirni", price: "₹160" },
            { name: "Kesar Kulfi", price: "₹170" },
            { name: "Shahi Tukda", price: "₹180" },
            { name: "Ice Cream", price: "₹140" },
        ],
    },
    {
        title: "Desserts",
        items: [
            { name: "Double Ka Meetha", price: "₹180" },
            { name: "Qubani Ka Meetha", price: "₹190" },
            { name: "Gulab Jamun", price: "₹150" },
            { name: "Phirni", price: "₹160" },
            { name: "Kesar Kulfi", price: "₹170" },
            { name: "Shahi Tukda", price: "₹180" },
            { name: "Ice Cream", price: "₹140" },
        ],
    },
    {
        title: "Desserts",
        items: [
            { name: "Double Ka Meetha", price: "₹180" },
            { name: "Qubani Ka Meetha", price: "₹190" },
            { name: "Gulab Jamun", price: "₹150" },
            { name: "Phirni", price: "₹160" },
            { name: "Kesar Kulfi", price: "₹170" },
            { name: "Shahi Tukda", price: "₹180" },
            { name: "Ice Cream", price: "₹140" },
        ],
    },
];

const Home = () => {
    const [openBranches, setOpenBranches] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[999999999]">
                <nav className="max-w-7xl mx-auto p-2 bg-[#271414c4] m-2 rounded-lg">
                    <div className="h-15 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex shrink-0">
                            <Logo className="h-20 w-auto" />
                        </div>

                        {/* Desktop Nav */}
                        <ul className="hidden lg:flex items-center gap-16 text-white text-sm">
                            {["Home", "About us", "Menu", "Gallery", "Catering services"].map(
                                (item) => (
                                    <li key={item} className="cursor-pointer"                                    >
                                        {item}
                                    </li>
                                )
                            )}

                        </ul>

                        {/* Desktop Branch Button */}
                        {/* <div className="hidden lg:block">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 text-white text-sm">
                                Our Branches
                                <span className="text-xs">▾</span>
                            </button>
                        </div> */}

                        <button
                            onClick={() => setOpenBranches(!openBranches)}
                            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg border border-orange-600 text-white text-sm cursor-pointer"
                        >
                            <span>Our Branches</span>
                            <span className="text-xs">▾</span>
                        </button>



                        {/* Mobile Menu Button */}
                        {/* <button
                            className="lg:hidden text-gray-900"
                            onClick={() => setOpen(!open)}
                        >
                            ☰
                        </button> */}
                    </div>

                    {/* Mobile Menu */}
                    {/* {open && (
                        <div className="lg:hidden pb-4">
                            <ul className="flex flex-col gap-4 text-gray-900 text-sm font-medium">
                                {["Home", "About us", "Menu", "Gallery", "Catering services"].map(
                                    (item) => (
                                        <li
                                            key={item}
                                            className="cursor-pointer hover:text-orange-600 transition"
                                        >
                                            {item}
                                        </li>
                                    )
                                )}

                                <button className="mt-2 self-start px-4 py-2 rounded-full border border-gray-800 text-gray-900 text-sm">
                                    Our Branches ▾
                                </button>
                            </ul>
                        </div>
                    )} */}
                </nav>
                {/* Branches Dropdown */}
                {/* Branches Dropdown */}
                <div
                    className={`
    hidden lg:block
    max-w-7xl mx-auto
    transform transition-all duration-300 ease-out
    ${openBranches
                            ? "translate-y-0 opacity-100 pointer-events-auto"
                            : "-translate-y-6 opacity-0 pointer-events-none"}
  `}
                >
                    {/* <div className="mt-3 p-4 w-full text-white bg-[#271414c4] rounded-lg shadow-xl border border-white/10">
                        <h1>Ba-Dastoor - Authentic Royal Hyderabadi Cuisine (Kohe-Fiza)</h1>
                        <p>4.2
                            1,061 Google reviews
                            ‧
                            Restaurant
                            ‧
                            Open</p>
                        <div className='flex flex-row gap-2'>
                            <div>box1</div>
                            <div>box2</div>
                        </div>
                    </div> */}
                    <div className="mt-3 p-6 w-full text-white bg-[#271414c4] rounded-lg shadow-xl border border-white/10 max-h-[400px] overflow-y-auto">
                        {/* Title & Meta */}
                        <div >
                            <div className="mb-5">
                                <div className='flex items-start justify-between'>
                                    <div>

                                        <h1 className="text-xl font-semibold">
                                            Ba-Dastoor – Authentic Royal Hyderabadi Cuisine (Kohe-Fiza)
                                        </h1>
                                        <p className="text-sm text-white/80 mt-1">
                                            ⭐ 4.2 · 1,061 Google reviews · Restaurant · <span className='text-green-400'>Open</span>
                                        </p>
                                        <p className='text-sm text-white/80 mt-1'>Address: A-12, Main Rd, Housing Board Colony, Bhopal, Madhya Pradesh 462001</p>
                                    </div>
                                    <div className='flex items-center gap-2 border border-white p-3 rounded-lg'>
                                        <span><FaPhoneAlt /></span>
                                        <p> 082692 45564</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Box 1 – Image */}
                                {/* <div className="overflow-hidden rounded-lg">
                                <div className='border '>

                                </div>
                                <img
                                    src={'https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw'}   // replace with actual image
                                    alt="Ba-Dastoor Restaurant"
                                    className="w-full h-[220px] object-cover rounded-lg"
                                />
                            </div> */}

                                <div className="col-span-2 overflow-hidden rounded-lg border border-white/10">
                                    <div className="grid grid-cols-3 gap-2 h-[220px]">

                                        {/* Left: Big Image */}
                                        <div className="col-span-2 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Ba-Dastoor Interior"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Right: Two images in column */}
                                        <div className="flex flex-col gap-2 h-full">
                                            <div className=''>
                                                <img
                                                    src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                    alt="Dish 1"
                                                    className="w-full h-[100px] object-cover"
                                                />
                                            </div>
                                            <div className=''>
                                                <img
                                                    src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                    alt="Dish 1"
                                                    className="w-full h-[100px] object-cover"
                                                />
                                            </div>
                                            {/* <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 1"
                                                className="w-full h-[100px] object-cover"
                                            />
                                        </div> */}

                                            {/* <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipMQmXssqqUF2e-5801haEiWFHR40BJp1Ry-Otuf=s680-w680-h510-rw"
                                                alt="Dish 2"
                                                className="w-full h-full object-cover"
                                            />
                                        </div> */}
                                        </div>

                                    </div>
                                </div>

                                {/* <div className='flex flex-row border-b'></div> */}

                                {/* vertical line */}
                                {/* <div className="h-full border-l border-gray-300"></div> */}

                                {/* Box 2 – Google Map */}
                                <div className=" w-[full] h-[220px] rounded-lg overflow-hidden">
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
                        {/*  */}
                        <div className='w-[80%] mx-auto mt-4 mb-4 border-b border-b-gray-200' />
                        {/*  */}
                        <div>
                            <div className="mb-5">
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

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Box 1 – Image */}
                                {/* <div className="overflow-hidden rounded-lg">
                                <div className='border '>

                                </div>
                                <img
                                    src={'https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw'}   // replace with actual image
                                    alt="Ba-Dastoor Restaurant"
                                    className="w-full h-[220px] object-cover rounded-lg"
                                />
                            </div> */}

                                <div className="col-span-2 overflow-hidden rounded-lg border border-white/10">
                                    <div className="grid grid-cols-3 gap-2 h-[220px]">

                                        {/* Left: Big Image */}
                                        <div className="col-span-2 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Ba-Dastoor Interior"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Right: Two images in column */}
                                        <div className="flex flex-col gap-2 h-full">
                                            <div className=''>
                                                <img
                                                    src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                    alt="Dish 1"
                                                    className="w-full h-[100px] object-cover"
                                                />
                                            </div>
                                            <div className=''>
                                                <img
                                                    src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                    alt="Dish 1"
                                                    className="w-full h-[100px] object-cover"
                                                />
                                            </div>
                                            {/* <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Dish 1"
                                                className="w-full h-[100px] object-cover"
                                            />
                                        </div> */}

                                            {/* <div className="flex-1 overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipMQmXssqqUF2e-5801haEiWFHR40BJp1Ry-Otuf=s680-w680-h510-rw"
                                                alt="Dish 2"
                                                className="w-full h-full object-cover"
                                            />
                                        </div> */}
                                        </div>

                                    </div>
                                </div>

                                {/* <div className='flex flex-row border-b'></div> */}

                                {/* vertical line */}
                                {/* <div className="h-full border-l border-gray-300"></div> */}

                                {/* Box 2 – Google Map */}
                                <div className=" w-[full] h-[220px] rounded-lg overflow-hidden">
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

            </header>

            {/* <ul className="grid grid-cols-3 gap-6 p-6 text-white text-sm">
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Bhopal
                            </li>
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Hyderabad
                            </li>
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Indore
                            </li>
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Pune
                            </li>
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Bengaluru
                            </li>
                            <li className="cursor-pointer hover:text-orange-500 transition">
                                Coming Soon
                            </li>
                        </ul> */}

            {/*  */}
            {/* <div className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-center bg-no-repeat image-zoom"
                    style={{
                        backgroundImage: `url(${bannerImg})`,
                        backgroundSize: "cover",
                    }}
                ></div>

                <div className="relative flex items-center justify-center min-h-screen px-4 animate-slideUp">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                            <Link
                                href="contact.html"
                                className="bg-[#FFD900] text-white px-6 sm:px-8 md:px-[30px] py-2 sm:py-3 text-base sm:text-lg font-bold rounded-full no-underline inline-block transition duration-300 shadow-[0px_4px_10px_rgba(0,0,0,0.2)]"
                            >
                                <p>Call for Reservation</p>
                                <p>8269245564</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="relative min-h-screen overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover image-zoom"
                    style={{
                        backgroundImage: `url(${bannerImg})`,
                    }}
                />

                {/* Optional dark overlay for readability */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content wrapper */}
                <div className="relative min-h-screen px-4">
                    {/* Bottom Call Button */}
                    <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                        <Link
                            to="/contact"
                            className="bg-[#FFD900] text-[#4D3F31] px-6 sm:px-8 py-3 text-base sm:text-lg font-bold rounded-md text-center"
                        >
                            <p className="">Call for Reservation</p>
                            <p className="">8269245564</p>
                        </Link>
                    </div>
                </div>

            </div>

            {/* Section-2 */}
            {/* <section className='w-full bg-[#F3F1F2] h-screen'>
                <div className='max-w-5xl mx-auto bg-amber-200'>
                    <div>
                        <Logo2 className="h-40 w-auto" />
                    </div>
                    <div>
                        <h1>Hyderabad’s Legacy, Served in Bhopal</h1>
                        <p>BA-Dastoor brings the authentic taste of Hyderabad to your table with time-honored recipes, royal dum cooking, and perfectly balanced spices. Rooted in tradition and served with warm hospitality, every dish reflects rich flavor, heritage, and passion — making every meal a true Hyderabadi experience.</p>
                    </div>
                    <div className='w-full bg-amber-100 h-50'>
                        taha
                    </div>
                </div>
            </section> */}
            {/* Section-2 */}
            <section className="w-full bg-[#F3F1F2] py-6 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <Logo2 className="h-32 w-auto" />
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-[#2E2A27] mb-6"
                    >
                        Hyderabad’s Legacy, Served in Bhopal
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[#5A5551] mb-16">
                        BA-Dastoor brings the authentic taste of Hyderabad to your table with
                        time-honored recipes, royal dum cooking, and perfectly balanced spices.
                        Rooted in tradition and served with warm hospitality, every dish reflects
                        rich flavor, heritage, and passion — making every meal a true Hyderabadi
                        experience.
                    </p>

                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                        <img
                            src={bannerImg2}   // replace with your image import
                            alt="Ba-Dastoor Heritage"
                            className="w-full object-fill"
                        />
                    </div>

                </div>
            </section>


            {/* Section-3 */}
            <section className="relative w-full h-[300px] sm:h-[350px] overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${bannerImg3})`,
                    }}
                />

                {/* Overlay for readability */}
                {/* <div className="absolute inset-0 bg-black/40" /> */}

                {/* Centered Content */}
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center max-w-4xl mx-auto">

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                      text-white mb-4">
                            Hand Crafted Menu
                        </h1>

                        {/* Description */}
                        <p className="max-w-3xl mx-auto 
                    text-sm sm:text-base md:text-lg lg:text-xl 
                     text-white/90">
                            Indulge in a culinary journey where every meal is a masterpiece,
                            meticulously crafted by our expert chefs. Experience authentic flavors,
                            exceptional taste, and a personalized dining experience that caters to
                            your every need.
                        </p>

                    </div>
                </div>
            </section>
            {/* Section-3 */}


            {/* Dish Section */}
            <section className="relative w-full bg-[#fffefa] py-20">

                {/* Background Image */}
                {/* Background Image (LG screens only) */}
                <div
                    className="hidden lg:block  absolute inset-0 bg-no-repeat bg-center "
                    style={{
                        backgroundImage: `url(${charMinar})`,
                        backgroundSize: "min(80vw, 600px)",
                    }}
                />


                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-6">

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {menuData.map((section, index) => (
                            <div key={index} className="h-[420px] flex flex-col"                            >
                                {/* Card Header */}
                                <div className="px-8 pt-8 pb-4 border-b border-[#E6DED4]">
                                    <h3 className="text-xl font-serif font-semibold text-[#f39100]">
                                        {section.title}
                                    </h3>
                                </div>

                                {/* Scrollable Dish List */}
                                <div className="px-8 py-6 flex-1 overflow-y-auto">
                                    <ul className="space-y-4">
                                        {section.items.map((item, idx) => (
                                            <li key={idx} className="flex flex-col gap-1 pb-3 border-b border-[#E6DED4]/60 last:border-none">

                                                {/* Name + Price */}
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[#512800] text-sm md:text-base font-medium">
                                                        {item.name}
                                                    </span>

                                                    <span className="text-[#512800] font-semibold text-sm whitespace-nowrap">
                                                        {item.price} / 69
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-xs md:text-sm text-[#7A5A3A] leading-snug max-w-[90%]">
                                                    Crispy, spicy fried chicken tossed in a tangy, aromatic South Indian-style seasoning.
                                                </p>

                                            </li>

                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Review Section */}
            {/* <section className='relative w-full'>
                <div
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${backgroundLine})`,
                    }}
                />

                <div>
                    <h2>What our Customer Say</h2>
                </div>
            </section> */}
            <section className="text-center text-white  py-[50px]">
                <h2 className="text-3xl text-[#000000] font-bold uppercase tracking-4">
                    Memorandum of Understanding
                </h2>
                <p className="text-[#00000080] text-lg mb-[30px]">
                    Partnering with top institutions for excellence
                </p>
                <div className="relative w-full  rounded-md overflow-hidden  p-[20px]">
                    <div className="flex flex-nowrap w-fit justify-items-center animate-scroll gap-6">
                        {/* {Array.from({ length: 14 }).map((_, index) => (
                            <div
                                key={index}
                                className="text-center w-40 sm:w-44 md:w-48 lg:w-56 border border-[#ddd] rounded-[20px] p-4 shadow-[2px_2px_8px_rgba(0,0,0,0.1)]   bg-[rgba(236,215,244,0.34)]"
                            >
                                <img
                                    src={caraousel1}
                                    alt="avatar"
                                    className="w-[90px] h-[90px] rounded-full object-cover block mx-auto border-[3px] border-[#1893e4]"
                                />
                                <h5 className="text-[#2C3E50] font-semibold text-base mt-2.5">
                                    Aditya
                                </h5>
                                <p className="text-[#555555] text-sm font-medium">
                                    is at{" "}
                                    <strong className="text-[#FA541C] font-semibold">
                                        (EagleEye Digitals)
                                    </strong>
                                </p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </section>
            {/* Footer Section */}
            <footer className="relative w-full px-6 py-6 sm:px-0">
                {/* Optional subtle overlay / texture */}
                {/* <div className="absolute inset-0 bg-black/30" /> */}
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bannerImg3})`,
                    }}
                />

                {/* Subtle overlay (FIXED) */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />


                <div className="relative max-w-7xl mx-auto">
                    {/* Top Logo */}
                    <div className="flex justify-center mb-14">
                        <Logo className="h-20 w-auto" />
                    </div>

                    {/* Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5 text-white">
                                <li className="hover:text-white transition cursor-pointer">Home</li>
                                <li className="hover:text-white transition cursor-pointer">About Us</li>
                                <li className="hover:text-white transition cursor-pointer">Enquiry</li>
                                <li className="hover:text-white transition cursor-pointer">Franchise</li>
                            </ul>
                        </div>

                        {/* Our Services */}
                        <div>
                            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
                                Our Services
                            </h4>
                            <ul className="space-y-2.5 text-[#CFC8BD]">
                                <li className="hover:text-white transition cursor-pointer">Menu</li>
                                <li className="hover:text-white transition cursor-pointer">Catering Services</li>
                                <li className="hover:text-white transition cursor-pointer">Career</li>
                                <li className="hover:text-white transition cursor-pointer">Contact Us</li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
                                Newsletter
                            </h4>

                            <p className="text-[#CFC8BD] mb-3 text-sm leading-snug">
                                Stay updated with our latest offers and news
                            </p>

                            {/* Input */}
                            <div className="flex items-center gap-2 mb-3">
                                <input
                                    type="email"
                                    placeholder="Enter your e-mail"
                                    className="flex-1 bg-transparent border-b border-[#CFC8BD]/40 
                   text-sm py-1.5 outline-none placeholder:text-[#CFC8BD]/60
                   focus:border-white transition"
                                />
                                <button className="bg-[#E6A24A] text-[#2B2218] text-xs px-4 py-2 rounded-md font-semibold hover:bg-[#f1b25c] transition">
                                    Subscribe
                                </button>
                            </div>

                            <p className="text-xs text-[#CFC8BD]/70 leading-relaxed">
                                By subscribing, you agree to our Privacy Policy and consent to receive
                                updates from our company.
                            </p>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[#CFC8BD]/20 mt-12 pt-5 text-center text-xs text-[#CFC8BD]/60">
                        © {new Date().getFullYear()} Ba-Dastoor. All rights reserved.
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Home