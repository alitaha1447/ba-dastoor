import React, { useState, useEffect } from "react";
import Logo from "../../assets/icons/Ba-Dastoor_Logo.svg?react";
import { X, Upload, User, Plus } from "lucide-react";
import axios from "axios";
import api from "../../api/axios";
import { toast } from "react-toastify";

const JobApplication = ({ closeModal, isModalOpen, selectedJob = null }) => {
  if (!isModalOpen) return null;
  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    message: "",
  });

  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        position: selectedJob.jobTitle ?? "",
      }));
    }
  }, [selectedJob]);

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const toastId = toast.loading("Submitting...", {
      style: {
        backgroundColor: "#1f2937", // slate-800 (universal)
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
    try {
      const payload = {
        enquiryType: "career",
        ...formData,
      };
      console.log(payload);
      const res = await api.post("/api/enquirys/create-enquiry", payload);
      toast.update(toastId, {
        render: "Your enquiry has been submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        position: "",
        experience: "",
        message: "",
      });
      closeModal();
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
    <div className="fixed inset-0 bg-[#5f493a]/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative  bg-[#52453f] rounded-2xl w-full max-w-2xl max-h-[70vh] overflow-y-auto scrollbar-thin-custom">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center     transition    z-10  "
        >
          <X color="#f1e6db" className="w-5 h-5" />
        </button>

        <div className="bg-[] py-6 lg:py-14 px-4">
          {/* <div className="bg-[#52453f] py-14 px-4"> */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Logo className="h-16 sm:h-20 md:h-24 w-auto" />
            </div>

            <h3 className="text-[#FFD700] text-base sm:text-xl md:text-2xl tracking-widest mb-4 sm:mb-8">
              JOIN THE BA-DASTOOR TEAM
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="career-input"
                placeholder="Enter your Name"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="career-input"
                placeholder="Mobile Number"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="career-input"
                placeholder="Email"
              />
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="career-input"
                placeholder="Position Applied For"
              />
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="career-input"
                placeholder="Years of Experience"
              />

              <textarea
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="career-textarea sm:col-span-2"
                placeholder="Additional Information"
                rows="3"
              />
              <div className="sm:col-span-2 flex justify-center mt-4 sm:mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`career-btn ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Submit...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
