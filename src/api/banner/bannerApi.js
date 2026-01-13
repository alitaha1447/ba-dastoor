import axios from "axios";

export const fetchDesktopBanners = async (page) => {
    const res = await axios.get(`https://ba-dastoor-backend.onrender.com/api/banners/get-desktopBanner?page=${page}`);
    return res.data.data || [];

}

export const fetchMobileBanners = async (page) => {
    const res = await axios.get(`https://ba-dastoor-backend.onrender.com/api/banners/mobile/get-mobileBanner?page=${page}`);
    return res.data.data || [];
}