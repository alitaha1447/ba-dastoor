import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";



export default function GoogleReviewsCarousel({ reviewCounts, reviews }) {
    const [index, setIndex] = useState(0);

    const visibleCards = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    };

    const [cards, setCards] = useState(visibleCards());

    useEffect(() => {
        const handleResize = () => setCards(visibleCards());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, [index, cards]);

    const next = () => {
        setIndex((prev) =>
            prev + cards >= reviews.length ? 0 : prev + cards
        );
    };

    const prev = () => {
        setIndex((prev) =>
            prev - cards < 0 ? reviews.length - cards : prev - cards
        );
    };
    console.log(reviewCounts)
    return (
        <section className="py-20 bg-[#fffefa]">
            <div className="flex items-center justify-center gap-2 mb-8">
                <FcGoogle size={40} />
                <span className="text-black text-xl font-Roboto font-bold">GOOGLE REVIEWS</span>
            </div>
            <h2 className="text-3xl font-serif text-center mb-10 text-[#512800]">
                What Our Customers Say
            </h2>
            <p className="mb-10 text-xl text-center text-gray-400 leading-relaxed font-Roboto font-medium">
                Over{" "}
                <span className="font-bold text-gray-500">
                    {reviewCounts?.reviewsCount}+  Google reviews
                </span>{" "}
                and a{" "}
                <span className="inline-flex items-center gap-1 font-bold text-gray-500">
                    {reviewCounts?.rating} rating,
                    <FaStar className="text-yellow-400" />
                </span>{" "}
                Don’t just take our word for it, see what our happy customers have to say!
            </p>

            <div className="max-w-6xl mx-auto px-4 relative">


                {/* Carousel */}
                <div className="overflow-hidden">
                    <div
                        className=" flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(index * 100) / cards}%)`,
                        }}
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className=" w-full sm:w-1/2 lg:w-1/3 px-3 flex-shrink-0"
                            >
                                <div className="bg-white rounded-2xl p-6 h-full border border-[#f1e6d3] shadow-sm hover:shadow-md transition">
                                    {/* Reviewer */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={review.author.avatarUrl}
                                            alt={review.author.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-[#512800]">
                                                {review.author.name}
                                            </p>
                                            <div className="flex text-yellow-500 text-sm">
                                                {Array.from({ length: review.rating.value }).map(
                                                    (_, i) => (
                                                        <span key={i}>★</span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
                                        {review.text}
                                    </p>

                                    {/* Date */}
                                    <p className="mt-4 text-xs text-gray-400">
                                        {new Date(review.publishedAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center text-[#512800] hover:bg-[#512800] hover:text-white transition"
                >
                    ‹
                </button>

                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center text-[#512800] hover:bg-[#512800] hover:text-white transition"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
