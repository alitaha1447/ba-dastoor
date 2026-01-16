import axios from "axios";

export const fetchGalleryImg = async (page = 1) => {
    const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/newGalleryImg/new-get-galleryImg?page=${page}`
    );
    return {
        data: res.data.data,            // gallery items
        currentPage: pageParam,         // 👈 MUST TRACK THIS
        totalPages: res.data.totalPages // 👈 MUST HAVE THIS
    };
};