import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Ba-Dastoor_Logo.svg?react";
import formBg2 from "../assets/images/formBg2.jpeg";
import contactUs from "../assets/images/contactUs.jpg";
import { toast } from "react-toastify";
import api from "../api/axios";

const ContactUs = () => {
  const [isLoading, setisLoading] = useState(false);

  const initialState = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  const resetForm = () => {
    setFormData(initialState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const toastId = toast.loading("Processing...", {
      style: {
        backgroundColor: "#1f2937", // slate-800 (universal)
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });

    try {
      const payload = {
        enquiryType: "contact", // 🔑 mandatory
        ...formData,
      };

      const res = await api.post(`/api/enquirys/create-enquiry`, payload);
      // console.log(res)
      // alert("Your enquiry has been submitted successfully!");
      toast.update(toastId, {
        render: "Your Contact enquiry has been submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      resetForm();
    } catch (error) {
      console.log(error);
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
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="relative hidden lg:block h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactUs}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
            loading="eager"
          />
        </div>
      </div>
      <div className="relative block lg:hidden h-[180px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactUs}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700
    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
            loading="eager"
          />
        </div>
      </div>
      <section className="w-full py-8 px-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-7"
          style={{ backgroundImage: `url(${formBg2})` }}
        />

        {/* <div className="absolute inset-0 bg-black/45" /> */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start z-50">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col justify-center h-full text-center">
            <h3 className="text-[#8B4513] text-3xl md:text-4xl font-serif mb-4">
              Contact Us
            </h3>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-serif">
              At Ba-Dastoor, we believe in the art of fine hospitality and
              meaningful connections. We’re here to assist you with any
              questions, requests, or feedback and look forward to creating an
              exceptional experience for you.
            </p>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-[#66615f] rounded-2xl px-6 py-10 sm:px-10 shadow-lg z-50">
            {/* Background Image */}
            {/* <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                  backgroundImage: `url(${})`,
                              }}
                          /> */}
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Logo className="h-30 w-auto text-white" />
            </div>

            {/* Title */}
            <div className="flex justify-center mb-8">
              <span className="bg-[#3e3e3e] text-[#FFD900] px-4 py-2 rounded-md text-xs tracking-widest">
                For Contact Us
              </span>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                className="catering-input"
                placeholder="Enter your Name"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                required
                onChange={handleChange}
                className="catering-input"
                placeholder="Mobile Number"
              />

              <input
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
                className="catering-input"
                placeholder="Email"
              />
              <input
                name="message"
                value={formData.message}
                required
                onChange={handleChange}
                className="catering-input"
                placeholder="Message"
              />

              <div className=" col-span-full flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`border-2 text-sm text-white border-white hover:bg-white hover:text-black transition px-8 py-2 rounded-full inline-flex items-center gap-2
              ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
          `}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : (
                    "Request a Call Back"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
