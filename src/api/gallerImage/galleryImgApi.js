import api from "../axios";

export const fetchGalleryImg = async ({ pageParam = 1, signal }) => {
    const res = await api.get(
        `/api/newGalleryImg/new-get-galleryImg?page=${pageParam}`, { signal }
    );
    return res.data;
};