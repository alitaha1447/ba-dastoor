import api from "../axios";

export const fetchDesktopBanners = async (page) => {
    const res = await api.get(`/api/banners/get-desktopBanner?page=${page}`);
    return res.data.data || [];

}

export const fetchMobileBanners = async (page) => {
    const res = await api.get(`/api/banners/mobile/get-mobileBanner?page=${page}`);
    return res.data.data || [];
}