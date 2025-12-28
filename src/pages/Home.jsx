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
import GoogleReviewWidget from '../components/googleReview/GoogleReviewWidget';

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
    const [open, setOpen] = useState(false);
    const [openBranches, setOpenBranches] = useState(false);

    return (
        <>
            {/* <header className="fixed top-0 left-0 w-full z-[999999999]">
                <nav className="relative max-w-7xl mx-auto mt-3 sm:mt-4 lg:mt-6 px-4 sm:px-6 lg:px-0">
                    <div className="bg-[#271414c4] rounded-lg p-3">
                        <div className="h-16 flex items-center justify-between">

                            <div className="flex shrink-0">
                                <Logo className="h-16 w-auto" />
                            </div>
                            <ul className="hidden lg:flex items-center gap-16 text-white text-sm">
                                {["Home", "About us", "Menu", "Gallery", "Catering services"].map(
                                    (item) => (
                                        <li
                                            key={item}
                                            className="cursor-pointer hover:text-orange-400 transition"                                        >
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                            <button
                                onClick={() => setOpenBranches(!openBranches)}
                                className="hidden lg:flex items-center gap-2 px-5 py-2.5 
                   rounded-lg border border-orange-600 text-white text-sm">
                                <span>Our Branches</span>
                                <span className="text-xs">▾</span>
                            </button>

                            <button
                                className={`lg:hidden text-2xl text-white`}
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                {open ? "✖" : "☰"}
                            </button>
                        </div>
                    </div>
                </nav>
                {open && (
                    <div className={`lg:hidden px-4 sm:px-6 pb-4`}>
                        <div className={`bg-[#271414c4] mt-6 rounded-lg
      ${open ? "animate-slideDown" : "animate-slideUp"}    `}
                        >
                            <div className="p-6">
                                <ul className="space-y-4 mb-8">
                                    {["Home", "About us", "Menu", "Gallery", "Catering services"].map(
                                        (item) => (
                                            <li key={item}>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="w-full text-left text-white text-lg py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                )}



                <div className={`hidden lg:block absolute left-0 right-0 top-full
  max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 transform transition-all duration-300 ease-out
  ${openBranches ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "-translate-y-6 opacity-0 pointer-events-none"}`}>
                    <div className="mt-3 p-6 w-full text-white bg-[#241616e5] rounded-lg shadow-xl border border-white/10 max-h-[450px] overflow-y-auto scrollbar-brown">
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

                                <div className="w-full md:w-[60%] p-4">
                                    <div className="h-[220px] rounded-lg overflow-hidden flex gap-2">

                                        <div className="w-[65%] h-full overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Ba-Dastoor Interior"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

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


                                <div className="hidden md:flex items-center">
                                    <div className="h-[80%] w-[1.5px] bg-white/30" />
                                </div>

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


                        <div className="w-[80%] mx-auto my-6 h-px bg-gray-200/60" />

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

                                <div className="w-full md:w-[60%] p-4">
                                    <div className="h-[220px] rounded-lg overflow-hidden flex gap-2">

                                        <div className="w-[65%] h-full overflow-hidden rounded-md">
                                            <img
                                                src="https://lh3.googleusercontent.com/p/AF1QipNrmqnGFBcNOff_8n4wSBOmh-yywfgzH0Apd1Ox=s680-w680-h510-rw"
                                                alt="Ba-Dastoor Interior"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
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
                                <div className="hidden md:flex items-center">
                                    <div className="h-[80%] w-[1.5px] bg-white/30" />
                                </div>
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
            </header> */}


            <div className="relative w-full h-96 lg:h-screen overflow-hidden">
                {/* Banner Image */}
                {/* <img
                    src={bannerImg}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                /> */}
                <div
                    className="absolute h-full  bg-cover w-full bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${bannerImg})` }}
                />
                {/* <div className="absolute inset-0 bg-black/40" /> */}



                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-black/30" /> */}

                {/* Content */}
                <div className="relative h-full flex items-end justify-center pb-20 px-4">
                    <Link
                        to="/contact"
                        className="bg-[#FFD900] text-[#4D3F31] px-6 sm:px-8 py-3
                 text-base sm:text-lg font-bold rounded-md text-center"
                    >
                        <p>Call for Reservation</p>
                        <p>8269245564</p>
                    </Link>
                </div>
            </div>



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
                <div
                    className="hidden lg:block absolute inset-0 bg-no-repeat bg-center"
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
                            <div
                                key={index}
                                className="h-[420px] flex flex-col scrollbar-brown"
                            >
                                {/* Card Header - Fixed height */}
                                <div className="px-8 pt-8 pb-4 border-b border-[#E6DED4] flex-shrink-0">
                                    <h3 className="text-xl font-serif font-semibold text-[#f39100]">
                                        {section.title}
                                    </h3>
                                </div>

                                {/* Scrollable Dish List - This should scroll */}
                                <div className="flex-1 overflow-y-auto px-8 py-6">
                                    <ul className="space-y-4">
                                        {section.items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="flex flex-col gap-1 pb-3 border-b border-[#E6DED4]/60 last:border-none"
                                            >
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
            <section className="py-20 bg-[#fffefa]">
                <h2 className="text-3xl font-serif text-center mb-10 text-[#512800]">
                    What Our Customers Say
                </h2>
                <div className="max-w-6xl mx-auto px-4">
                    <GoogleReviewWidget />
                </div>
            </section>
            {/* Footer Section */}
            {/* <footer className="relative w-full px-6 py-6 sm:px-0">
                
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bannerImg3})`,
                    }}
                />

                <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />


                <div className="relative max-w-7xl mx-auto">
                    <div className="flex justify-center mb-14">
                        <Logo className="h-20 w-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">

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

                        <div>
                            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
                                Newsletter
                            </h4>

                            <p className="text-[#CFC8BD] mb-3 text-sm leading-snug">
                                Stay updated with our latest offers and news
                            </p>

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

                    <div className="border-t border-[#CFC8BD]/20 mt-12 pt-5 text-center text-xs text-[#CFC8BD]/60">
                        © {new Date().getFullYear()} Ba-Dastoor. All rights reserved.
                    </div>
                </div>
            </footer> */}

        </>
    )
}

export default Home