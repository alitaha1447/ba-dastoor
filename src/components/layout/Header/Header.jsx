import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router";
import Logo from "../../../assets/icons/Ba-Dastoor_Logo.svg?react";
import { FaPhoneAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {
  Plus,
  X,
  Home,
  Compass,
  Heart,
  User,
  Camera,
  MessageCircle,
  MapPin,
} from "lucide-react";

import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openBranches, setOpenBranches] = useState(false);
  const [openMapBranchId, setOpenMapBranchId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [branches, setBranches] = useState([]);
  const [totalReviewCount, setTotalReviewCount] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [zoomMedia, setZoomMedia] = useState(null); // 🔥 SINGLE MODAL STATE

  const branchRef = useRef(null);

  const iconMap = {
    Home: Home,
    "About Us": User,
    Menu: Compass,
    Gallery: Camera,
    "Catering Enquiry": MessageCircle,
    Career: Heart,
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { label: "Home", path: "/", type: "route" },
    { label: "About Us", path: "/about", type: "route" },
    { label: "Menu", path: "menu", type: "scroll" },
    { label: "Gallery", path: "/gallery", type: "route" },
    { label: "Catering", path: "/catering-enquiry", type: "route" },
    { label: "Franchise", path: "/franchise", type: "route" },
    { label: "Career", path: "/career", type: "route" }, // ✅ ADDED
  ];

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await axios.get(
        "https://ba-dastoor-backend.onrender.com/api/branches/get-branches"
      );
      setBranches(res?.data?.data);
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios(
        "https://featurable.com/api/v1/widgets/11b960ce-b735-4b9a-9cb1-808b4a28c17c"
      );
      setAvgRating(res?.data?.averageRating);
      setTotalReviewCount(res?.data?.totalReviewCount);
    };
    fetchReview();
  }, []);

  const handleMenuClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // If already on homepage, scroll smoothly to menu section
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // If on another page, navigate to home with scroll state
      navigate("/", {
        state: { scrollTo: "menu" },
        // This ensures the browser doesn't try to scroll immediately
        replace: true,
      });
    }
    setOpen(false); // close mobile menu if open
    setOpenBranches(false); // close branches dropdown if open
  };

  const handleActionClick = (id) => {
    setActiveItem(id);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // Already on home → just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home, then scroll to top
      navigate("/", { replace: false });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }

    // Optional: close menus
    setOpenBranches(false);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       openBranches &&
  //       branchRef.current &&
  //       !branchRef.current.contains(event.target)
  //     ) {
  //       setOpenBranches(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  // }, [openBranches]);

  /* ------------------ ZOOM MODAL ------------------ */
  const ZoomModal = ({ media, onClose }) => {
    console.log("media --> ", media?.url);
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };

      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [onClose]);

    if (!media) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          {/* 🔥 MEDIA WRAPPER */}
          <div className="relative inline-block">
            {/* ❌ CLOSE BUTTON INSIDE MEDIA */}
            <button
              onClick={onClose}
              className="
                              absolute
                              top-2
                              right-2
                              z-20
                              w-9
                              h-9
                              rounded-full
                              bg-black/70
                              text-white
                              flex
                              items-center
                              justify-center
                              hover:bg-black
                              transition
                          "
            >
              ✕
            </button>

            <img
              src={media.url}
              alt="Zoomed"
              className="
                                  block
                                  max-w-full
                                  max-h-[60vh]
                                  w-auto
                                  h-auto
                                  object-contain
                                  rounded-lg
                                  animate-zoomIn
                              "
            />

            {/* {media.type === "image" ? (
              <img
                src={media.url}
                alt="Zoomed"
                className="
                                  block
                                  max-w-full
                                  max-h-[60vh]
                                  w-auto
                                  h-auto
                                  object-contain
                                  rounded-lg
                                  animate-zoomIn
                              "
              />
            ) : (
              <video
                src={media.url}
                controls
                autoPlay
                className="
                                  block
                                  max-w-full
                                  max-h-[60vh]
                                  w-auto
                                  h-auto
                                  object-contain
                                  rounded-lg
                                  bg-black
                              "
              />
            )} */}
          </div>
        </div>
      </div>
    );
  };

  const handleClick = (url) => {
    console.log("clicked");
    console.log(url);
    setZoomMedia({ url: url });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999999999] transition-all duration-300 ${
        scrolled ? "" : ""
      }`}
    >
      <nav className={`w-full`}>
        <div
          className={` py-4 transition-all duration-300 ${
            scrolled ? "px-4 bg-[#0f0802db]" : "bg-[#0f0802a9] px-4"
          }`}
        >
          <div className="h-12 flex items-center justify-between">
            <div className="flex shrink-0">
              <Logo
                onClick={handleLogoClick}
                className={`h-16 w-auto cursor-pointer`}
              />
            </div>
            <ul className="hidden lg:flex items-center gap-16 text-white text-base font-normal font-san cursor-pointer">
              {navLinks.map((item) => (
                <li key={item.path}>
                  {item.label === "Menu" ? (
                    <button
                      onClick={handleMenuClick}
                      className="transition hover:text-[#e7b038] cursor-pointer"
                    >
                      Menu
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `transition hover:text-[#e7b038] ${
                          isActive ? "text-[#e7b038]" : ""
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
              onClick={() => setOpenBranches(!openBranches)}
              className="flex items-center gap-2 px-6 py-2.5 cursor-pointer
                          rounded-lg border border-white text-white text-sm hover:border-amber-400"
            >
              <span>Our Branches</span>
              <span className="text-xs">▾</span>
            </button>
          </div>
        </div>
      </nav>

      {/* FLOATING ACTION BUTTON (FAB) - MOBILE ONLY */}
      <div className="lg:hidden fixed bottom-20 right-10 z-[999999]">
        {/* Menu Items */}
        <div
          className={`absolute bottom-20 right-0 flex flex-col items-end gap-3        transition-all duration-300
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        >
          {navLinks.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <button
                key={item.label}
                onClick={(e) => {
                  if (item.type === "scroll") {
                    handleMenuClick(e);
                  } else {
                    navigate(item.path);
                    setActiveItem(item.label);
                  }
                  setIsOpen(false);
                }}
                style={{ transitionDelay: `${index * 60}ms` }}
                className={`w-32 flex items-center gap-3 px-4 py-2 rounded-full
                text-sm font-medium shadow-lg 
                ${
                  activeItem === item.label
                    ? "bg-black text-[#efef81]"
                    : "bg-[#0f0802db] text-white hover:bg-brown-500 hover:text-[#fff09c]"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {Icon && <Icon size={18} />}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAB Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
        ${isOpen ? "rotate-45 bg-[#0f0802db]" : "bg-[#0f0802a9]"}`}
        >
          <Plus size={26} className="text-white" />
        </button>
      </div>

      {/* ================= BRANCH DROPDOWN (DESKTOP) ================= */}
      <div
        ref={branchRef}
        className={`hidden lg:block absolute left-0 right-0 top-full
         max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 transform transition-all duration-300 ease-out
         ${
           openBranches
             ? "translate-y-0 opacity-100 pointer-events-auto"
             : "-translate-y-6 opacity-0 pointer-events-none"
         }`}
      >
        <div className="mt-3 py-0 px-6 w-full text-white bg-[#0f0802db] rounded-lg shadow-xl border border-white/10 max-h-[480px] overflow-y-auto scrollbar-brown">
          <div className="my-4 flex justify-end">
            <RxCross2
              style={{ cursor: "pointer" }}
              size={20}
              onClick={() => setOpenBranches(!openBranches)}
            />
          </div>
          {branches.length > 0 ? (
            branches.map((branch, index) => {
              return (
                <div key={branch?._id} className="">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-xl font-semibold">
                          {branch?.branchName}{" "}
                        </h1>
                        <p className="text-sm text-white/80 mt-1">
                          ⭐ {avgRating?.toFixed(1)} · {totalReviewCount} Google
                          reviews · Restaurant ·{" "}
                          <span className="text-green-400">Open</span>
                        </p>
                        <p className="text-sm text-white/80 mt-1">
                          {branch?.address}
                        </p>
                      </div>
                      {/* <div
                        className="flex items-center gap-2 border border-white p-3 rounded-lg"
                      >
                        <span>
                          <FaPhoneAlt />
                        </span>
                        <p>{branch?.contact}</p>
                      </div> */}
                      <a
                        href="tel:+919981341447"
                        className="flex items-center gap-2 border border-white p-3 rounded-lg
             cursor-pointer hover:bg-white/10 transition"
                      >
                        <FaPhoneAlt />
                        <p>+91 99813 41447</p>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-stretch w-full h-[240px]">
                    <div className="w-full md:w-[60%] p-4">
                      <div className="h-[220px] rounded-lg overflow-hidden flex gap-2">
                        <div
                          onClick={() => handleClick(branch?.images[0]?.url)}
                          className="w-[65%] h-full overflow-hidden rounded-md cursor-pointer"
                        >
                          <img
                            src={branch?.images[0]?.url}
                            alt="Ba-Dastoor Interior"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="w-[35%] h-full flex flex-col gap-2">
                          <div
                            onClick={() => handleClick(branch?.images[1]?.url)}
                            className="flex-1 overflow-hidden rounded-md"
                          >
                            <img
                              src={branch?.images[1]?.url}
                              alt="Dish 1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            onClick={() => handleClick(branch?.images[2]?.url)}
                            className="flex-1 overflow-hidden rounded-md"
                          >
                            <img
                              src={branch?.images[2]?.url}
                              alt="Dish 2"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center">
                      <div className="h-[80%] w-[1px] bg-white/30" />
                    </div>
                    <div className="w-full md:w-[40%] p-4">
                      <div className="h-[100%] bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                        <div
                          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                          dangerouslySetInnerHTML={{
                            __html: branch?.embedUrl,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ===== Divider (NOT after last branch) ===== */}
                  {index !== branches.length - 1 && (
                    <div className="w-[80%] mx-auto my-6 h-px bg-white/30" />
                  )}
                </div>
              );
            })
          ) : (
            <div>
              <span>No Branches</span>
            </div>
          )}
        </div>
      </div>
      {/* ================= BRANCH DROPDOWN (MOBILE) ================= */}
      <div
        ref={branchRef}
        className={`block lg:hidden absolute left-0 right-0 top-full
         max-w-full mx-auto px-4 sm:px-6 lg:px-0 transform transition-all duration-300 ease-out
         ${
           openBranches
             ? "translate-y-0 opacity-100 pointer-events-auto"
             : "-translate-y-6 opacity-0 pointer-events-none"
         }`}
      >
        <div className=" mt-3 py-2 px-6 w-full text-white bg-[#0f0802db] rounded-lg shadow-xl border max-h-[580px] overflow-y-auto scrollbar-brown">
          <div className="my-4 flex justify-end">
            <RxCross2
              style={{ cursor: "pointer" }}
              size={20}
              onClick={() => setOpenBranches(!openBranches)}
            />
          </div>
          {branches.length > 0 ? (
            branches.map((branch, index) => {
              return (
                <div key={branch?._id}>
                  <div className="flex flex-col w-full ">
                    {/* <div className="w-full p-4">
                      <div className="h-[100px] bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                        <div
                          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                          dangerouslySetInnerHTML={{
                            __html: branch?.embedUrl,
                          }}
                        />
                      </div>
                    </div> */}
                    <div className="flex flex-col gap-2">
                      <div className="flex-1">
                        <div>
                          <h1 className="text-sm font-semibold">
                            {branch?.branchName}{" "}
                          </h1>
                          <p className="text-xs text-white/80 mt-1">
                            ⭐ {avgRating?.toFixed(1)} · {totalReviewCount}{" "}
                            Google reviews · Restaurant ·{" "}
                            <span className="text-green-400">Open</span>
                          </p>
                          <p className="text-xs text-white/80 mt-1">
                            {branch?.address}
                          </p>
                        </div>
                        {/* <div className="flex flex-row justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>
                              <FaPhoneAlt />
                            </span>
                            <p>{branch?.contact}</p>
                          </div>
                          <MapPin />
                        </div> */}
                      </div>
                      {/* ===== Right Side: Small Google-style Image Strip ===== */}
                      <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-2 w-max">
                          {branch?.images?.map((img, i) => (
                            <img
                              onClick={() => handleClick(img?.url)}
                              key={i}
                              src={img?.url}
                              alt={`branch-${i}`}
                              className="w-[88px] h-[88px] object-cover rounded-lg flex-shrink-0 border border-white/10"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <span>
                          <FaPhoneAlt />
                        </span>
                        <p>{branch?.contact}</p>
                      </div>

                      <span className="flex flex-row items-center gap-2">
                        Location
                        <MapPin
                          style={{ cursor: "pointer" }}
                          className={`transition-transform duration-300 ${
                            openMapBranchId === branch._id
                              ? "rotate-180 text-[#C9A24D]"
                              : ""
                          }`}
                          size={20}
                          onClick={() =>
                            setOpenMapBranchId(
                              openMapBranchId === branch._id ? null : branch._id
                            )
                          }
                        />
                      </span>
                    </div>
                    {/* {openMap && (
                      <div className="w-full p-4">
                        <div className="h-[100px] bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                          <div
                            className={`w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 `}
                            dangerouslySetInnerHTML={{
                              __html: branch?.embedUrl,
                            }}
                          />
                        </div>
                      </div>
                    )} */}
                    <div
                      className={`
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
    ${
      openMapBranchId === branch._id
        ? "max-h-[160px] opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-2"
    }
  `}
                    >
                      <div className="w-full p-4">
                        <div className="h-[100px] bg-gray-400 rounded-lg overflow-hidden">
                          <div
                            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                            dangerouslySetInnerHTML={{
                              __html: branch?.embedUrl,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {index !== branches.length - 1 && (
                    <div className="w-[80%] mx-auto my-6 h-px bg-white/30" />
                  )}
                </div>
              );
            })
          ) : (
            <div>
              <span>No Branches</span>
            </div>
          )}
        </div>
      </div>
      {zoomMedia && (
        <ZoomModal media={zoomMedia} onClose={() => setZoomMedia(null)} />
      )}
    </header>
  );
};

export default Header;
