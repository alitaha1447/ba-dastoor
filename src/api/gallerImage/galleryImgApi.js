import axios from "axios";

export const fetchGalleryImg = async ({ pageParam = 1 }) => {
    const res = await axios.get(
        `https://ba-dastoor-backend.onrender.com/api/newGalleryImg/new-get-galleryImg?page=${pageParam}`
    );
    return res.data;
};