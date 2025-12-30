import React, { useEffect, useState } from 'react'
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react"
import careerpageBG from "../assets/images/careerpageBG.jpg"

const CareerPage = () => {
    const [showForm, setShowForm] = useState(false)
    const [selectedPosition, setSelectedPosition] = useState(null)

    const [openPositions, setOpenPositions] = useState([
        {
            id: 1,
            title: "Executive Chef",
            department: "Kitchen",
            location: "Bhopal",
            type: "Full-time",
            experience: "8+ years",
            description: "Lead our culinary team in creating authentic Indian cuisine with modern presentation. Responsible for menu development, kitchen operations, and maintaining quality standards.",
            icon: "👨‍🍳",
            salary: "₹12-18 LPA",
            requirements: ["Culinary degree or equivalent", "Proven leadership in fine dining", "Menu innovation skills"],
            schedule: "Flexible, including weekends"
        },
        {
            id: 2,
            title: "Sous Chef",
            department: "Kitchen",
            location: "Bhopal",
            type: "Full-time",
            experience: "5+ years",
            description: "Assist Executive Chef in kitchen management, food preparation, staff training, and maintaining consistency in food quality and presentation.",
            icon: "👩‍🍳",
            salary: "₹8-12 LPA",
            requirements: ["Extensive knowledge of Indian cuisine", "Team management experience", "Quality control expertise"],
            schedule: "Evening shifts, weekends required"
        },
        {
            id: 3,
            title: "Restaurant Manager",
            department: "Operations",
            location: "Bhopal",
            type: "Full-time",
            experience: "6+ years",
            description: "Oversee daily restaurant operations, manage front-of-house staff, ensure exceptional guest service, and drive profitability.",
            icon: "💼",
            salary: "₹10-14 LPA",
            requirements: ["Hospitality management degree", "Fine dining experience", "Staff training expertise"],
            schedule: "Flexible shifts"
        },
        {
            id: 4,
            title: "Service Captain",
            department: "Front of House",
            location: "Bhopal",
            type: "Full-time",
            experience: "3+ years",
            description: "Lead service team on the floor, ensure impeccable guest service, manage reservations, and handle guest relations.",
            icon: "🎖️",
            salary: "₹6-9 LPA",
            requirements: ["Fine dining service experience", "Wine and beverage knowledge", "Multilingual preferred"],
            schedule: "Evening shifts, weekends"
        },
        // {
        //     id: 5,
        //     title: "Head Bartender/Mixologist",
        //     department: "Beverage",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "4+ years",
        //     description: "Create signature cocktails, manage bar operations, curate beverage menu, and train bar staff in mixology techniques.",
        //     icon: "🍸",
        //     salary: "₹7-10 LPA",
        //     requirements: ["Mixology certification", "Creative cocktail development", "Inventory management"],
        //     schedule: "Evening shifts, weekends"
        // },
        // {
        //     id: 6,
        //     title: "Pastry Chef",
        //     department: "Kitchen",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "4+ years",
        //     description: "Create exquisite Indian desserts, pastries, and baked goods. Develop dessert menu and maintain pastry section standards.",
        //     icon: "🍰",
        //     salary: "₹8-11 LPA",
        //     requirements: ["Pastry arts training", "Indian dessert expertise", "Creative presentation skills"],
        //     schedule: "Day shifts"
        // },
        // {
        //     id: 7,
        //     title: "Sommelier",
        //     department: "Beverage",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "5+ years",
        //     description: "Curate wine selection, recommend food pairings, manage wine cellar, and conduct staff training on wine service.",
        //     icon: "🍷",
        //     salary: "₹9-13 LPA",
        //     requirements: ["Sommelier certification", "Extensive wine knowledge", "Food pairing expertise"],
        //     schedule: "Evening shifts, weekends"
        // },
        // {
        //     id: 8,
        //     title: "Host/Hostess",
        //     department: "Front of House",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "1+ years",
        //     description: "Welcome guests, manage reservations seating, handle phone inquiries, and create positive first impressions.",
        //     icon: "👋",
        //     salary: "₹3-5 LPA",
        //     requirements: ["Excellent communication", "Multitasking ability", "Positive attitude"],
        //     schedule: "Flexible shifts, weekends"
        // },
        // {
        //     id: 9,
        //     title: "Commis Chef",
        //     department: "Kitchen",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "1+ years",
        //     description: "Assist chefs in food preparation, maintain kitchen cleanliness, and learn culinary techniques in a professional kitchen.",
        //     icon: "🔪",
        //     salary: "₹3-5 LPA",
        //     requirements: ["Culinary training", "Willingness to learn", "Team player"],
        //     schedule: "Flexible shifts"
        // },
        // {
        //     id: 10,
        //     title: "Steward Supervisor",
        //     department: "Kitchen",
        //     location: "Mumbai Central",
        //     type: "Full-time",
        //     experience: "2+ years",
        //     description: "Manage kitchen stewarding team, ensure proper cleaning and sanitation, and maintain kitchen equipment.",
        //     icon: "🧼",
        //     salary: "₹4-6 LPA",
        //     requirements: ["Kitchen sanitation knowledge", "Supervisory experience", "Attention to detail"],
        //     schedule: "Evening shifts"
        // },
        // {
        //     id: 11,
        //     title: "Catering Manager",
        //     department: "Events",
        //     location: "Hybrid",
        //     type: "Full-time",
        //     experience: "4+ years",
        //     description: "Manage off-site catering events, coordinate with clients, plan menus, and oversee event execution.",
        //     icon: "🎉",
        //     salary: "₹9-12 LPA",
        //     requirements: ["Event management experience", "Client relations", "Menu planning"],
        //     schedule: "Flexible, event-based"
        // },
        // {
        //     id: 12,
        //     title: "Banquet Captain",
        //     department: "Events",
        //     location: "On-site",
        //     type: "Full-time",
        //     experience: "3+ years",
        //     description: "Lead banquet service team, coordinate event setups, and ensure flawless execution of large events.",
        //     icon: "🥂",
        //     salary: "₹6-8 LPA",
        //     requirements: ["Banquet service experience", "Team leadership", "Event coordination"],
        //     schedule: "Event-based, weekends"
        // }
    ])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePositionClick = (position) => {
        setSelectedPosition(position)
        setShowForm(true)
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
                            <div className="inline-block mb-6">
                                <span className="text-5xl">🍽️</span>
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
                        <div
                            // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
                        >
                            {
                                openPositions.map((position) => (
                                    <div
                                        key={position.id}
                                        className="group bg-white rounded-xl shadow-md overflow-hidden
      hover:shadow-lg transition-all duration-300
      transform hover:-translate-y-1 border border-[#f0e6d6]"
                                    >
                                        <div className="pt-6 pb-4 px-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center font-serif">
                                                {position.title}
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
                                                className="w-full bg-gradient-to-r from-[#8B4513] to-[#D2691E]
          text-white font-medium py-2 px-3 rounded-md
          hover:from-[#A0522D] hover:to-[#CD853F]
          transition-all duration-200"
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