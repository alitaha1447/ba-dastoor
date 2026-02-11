import api from "../axios";

export const fetchGalleryVideo = async ({ pageParam = 1, signal }) => {
    const res = await api.get(
        `/api/newGalleryVideo/new-get-galleryVideoByPage?page=${pageParam}`, { signal }
    );
    return res.data;
};