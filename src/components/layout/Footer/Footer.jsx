import React, { useEffect, useState } from "react";
import Logo from "../../../assets/icons/Ba-Dastoor_Logo.svg?react";
import bannerImg3 from "../../../assets/images/bannerImage3.jpg";
import api from "../../../api/axios";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchSocialLinks = async () => {
    try {
      const res = await api.get(`/api/socialLinks/get-socialLinks`);
      // console.log(res)
      setSocialLinks(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);
  // console.log(socialLinks)
  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 px-2 md:grid-cols-3 gap-6 text-sm">
          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-white">
              <li
                onClick={goHome}
                className="hover:text-white transition cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/about")}
                className="hover:text-white transition cursor-pointer"
              >
                About Us
              </li>
              <li
                onClick={() => navigate("/gallery")}
                className="hover:text-white transition cursor-pointer"
              >
                Gallery
              </li>
              <li
                onClick={() => navigate("/franchise")}
                className="hover:text-white transition cursor-pointer"
              >
                Franchise
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-[#CFC8BD]">
              <li className="hover:text-white transition cursor-pointer">
                Menu
              </li>
              <li
                onClick={() => navigate("/catering-enquiry")}
                className="hover:text-white transition cursor-pointer"
              >
                Catering Services
              </li>
              <li
                onClick={() => navigate("/career")}
                className="hover:text-white transition cursor-pointer"
              >
                Career
              </li>
              {/* <li className="hover:text-white transition cursor-pointer">Contact Us</li> */}
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
            {/* <div className="flex items-center gap-2 mb-3">
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
                        </p> */}
            {/* Social Media Icons */}
            {/* Social Media Icons */}
            <div className="mt-6">
              <h5 className="text-white text-xs font-semibold tracking-widest mb-3 uppercase">
                Follow Us
              </h5>

              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex flex-row space-x-4">
                    <a
                      href={link?.instagram?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/20 text-white 
                       hover:bg-[#E6A24A] hover:text-[#2B2218] 
                       transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={16} />
                    </a>

                    <a
                      href={link?.linkedin?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/20 text-white 
             hover:bg-[#E6A24A] hover:text-[#2B2218] 
             transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn size={16} />
                    </a>

                    <a
                      href={link?.instagram?.url}
                      className="p-2 rounded-full border border-white/20 text-white 
                       hover:bg-[#E6A24A] hover:text-[#2B2218] 
                       transition-all duration-300 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <FaTwitter size={16} />
                    </a>

                    <a
                      href={link?.facebook?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/20 text-white 
                       hover:bg-[#E6A24A] hover:text-[#2B2218] 
                       transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FaFacebookF size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#CFC8BD]/20 mt-12 pt-5 text-center text-xs text-[#d79f23]">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#e7b038] font-semibold">Ba-Dastoor.</span> All
          Rights Reserved. Designed & Developed by{" "}
          <span className="text-[#e7b038] font-semibold">
            <a
              href="https://eaglecloudsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Eagle Cloud Solutions Pvt. Ltd.
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
