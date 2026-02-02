import api from "../axios";

export const fetchGalleryImg = async ({ pageParam = 1 }) => {
    const res = await api.get(
        `/api/newGalleryImg/new-get-galleryImg?page=${pageParam}`
    );
    return res.data;
};